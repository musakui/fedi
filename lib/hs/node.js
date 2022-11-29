import { createSign, createVerify, createHash } from 'crypto'
import * as core from './core.js'
import {
	HTTPSignaturesError,
	INVALID_FIELD,
	INVALID_HEADER,
	VERIFICATION_FAILED,
	KEY_RETRIEVAL_FAILED,
} from './errors.js'

/** @type {(d: string) => string} */
let sign = null

/** @type {typeof fetch} */
let myFetch = null

const B64 = 'base64'
const S256 = 'SHA-256'
const appJSON = ['', 'ld+', 'activity+'].map((c) => `application/${c}json`).join(', ')

/**
 * @param {string} data string to hash
 * @param {string} [algo] hash algorithm
 */
const getDigest = (data, algo = S256) => {
	let hasher = null
	switch (algo) {
		case S256:
			hasher = createHash('sha256')
			break
		case 'SHA-512':
			hasher = createHash('sha512')
			break
		default:
			return undefined
	}
	return `${algo}=${hasher.update(data).digest(B64)}`
}

/**
 * @param {Partial<Request>} req request to sign
 */
export const signRequest = (req) => {
	if (!sign) throw new Error('key not set')
	const [info, data] = core.createString(req)
	const signature = core.getHeader({ ...info, signature: sign(data) })
	return {
		...req,
		headers: {
			...req.headers,
			signature,
		},
	}
}

/**
 * @param {Partial<Request>} req request to send
 */
export const sendRequest = async (req) => {
	if (!myFetch) throw new Error('fetch not set')

	return await myFetch(req.url, signRequest({
		method: req.body ? 'POST' : 'GET',
		...req,
		headers: {
			date: (new Date()).toUTCString(),
			...(req.body ? { digest: getDigest(req.body) } : {}),
			...req.headers,
		},
	}))
}

/**
 * parse request
 * @param {Partial<Request>} req
 */
export const parseRequest = async (req) => {
	if (req.body && req.headers.digest) {
		const dg = req.headers.digest
		const ha = dg.split('=')[0]
		if (dg !== getDigest(req.body, ha)) throw new HTTPSignaturesError(INVALID_HEADER, `invalid digest: ${dg}`)
	}

	return core.parse(req)
}

/**
 * @param {string} id keyId
 * @param {string} accept `Accept` headers
 * @return {Promise<Partial<import('../activitypub/types').Actor>>}
 */
export const getKey = async (id, accept = appJSON) => {
	const headers = { accept }
	try {
		let resp = await myFetch(id, { headers })
		if (resp.status === 410) {
			throw new HTTPSignaturesError(KEY_RETRIEVAL_FAILED, 'Gone')
		} else if (resp.status > 400) {
			// some sites require signed GET
			resp = await sendRequest({ url: id, headers })
		}
		return await resp.json()
	} catch (err) {
		throw new HTTPSignaturesError(KEY_RETRIEVAL_FAILED, `failed to GET: ${id}`)
	}
}

/**
 * verify request signature
 * @param {Awaited<ReturnType<typeof parseRequest>>} sig
 */
export const verifySignature = async (sig) => {
	const { publicKey: pk, ...rest } = await getKey(sig.keyId)

	if (!pk || !pk.publicKeyPem) {
		throw new HTTPSignaturesError(KEY_RETRIEVAL_FAILED, `no key found: ${sig.keyId}`)
	}

	if (pk.id && pk.id !== sig.keyId) {
		throw new HTTPSignaturesError(INVALID_FIELD, `invalid keyId: ${sig.keyId} != ${pk.id}`)
	}

	const veri = createVerify(sig.algorithm).update(sig.data)
	if (veri.verify(pk.publicKeyPem, sig.signature, B64)) return rest

	throw new HTTPSignaturesError(VERIFICATION_FAILED, 'verification failed')
}

/**
 * verify request signature
 * @param {Partial<Request>} req
 */
export const verifyRequest = async (req) => {
	return await verifySignature(await parseRequest(req))
}

/**
 * @param {string} id signing keyId
 * @param {string} key signing key
 * @param {string} [algo] signing algorithm
 */
export const useKey = (id, key, algo = 'sha256') => {
	core.useKeyId(id)
	sign = (data) => createSign(algo).update(data).sign(key).toString(B64)
}

export const useFetch = (fn) => {
	myFetch = fn
}

try {
	myFetch = fetch
} catch (err) {
}

export * from './errors.js'
export * from './core.js'