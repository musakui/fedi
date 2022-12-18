import { createSign, createVerify, createHash } from 'crypto'
import * as core from './core.js'
import {
	HTTPSignaturesError,
	INVALID_FIELD,
	VERIFICATION_FAILED,
	KEY_RETRIEVAL_FAILED,
} from './errors.js'

/** @type {Signer | null} */
let mySigner = null

const B64 = 'base64'
const S256 = 'SHA-256'

/** @type {import('./types').Hasher} */
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

export class Signer extends core.CoreSigner {
	/** @param {string} data string to sign */
	sign(data) {
		return createSign(this.hashAlgorithm).update(data).sign(this.key).toString(B64)
	}
}

/**
 * send request
 */
export const sendRequest = core.sender({ getDigest })

/**
 * parse request
 */
export const parseRequest = core.parser({ getDigest })

/**
 * @param {string} id keyId
 * @param {Partial<import('./types').KeyFetchOptions>} [opts]
 * @return {Promise<Partial<import('../activitypub/types').Actor>>}
 */
export const getKey = async (id, opts) => {
	const headers = { accept: core.appJSON, ...opts?.headers }
	try {
		let resp = await core.coreFetch(id, { headers })
		if (resp.status === 410) {
			throw new HTTPSignaturesError(KEY_RETRIEVAL_FAILED, 'Gone')
		} else if (resp.status > 400) {
			// some sites require signed GET
			resp = await sendRequest({ url: id, headers }, opts?.signer || mySigner)
		}
		return await resp.json()
	} catch (err) {
		throw new HTTPSignaturesError(KEY_RETRIEVAL_FAILED, `failed to GET: ${id} (${err})`)
	}
}

/**
 * verify request signature
 * @param {Awaited<ReturnType<typeof parseRequest>>} sig
 * @param {Partial<import('./types').KeyFetchOptions>} [opts]
 */
export const verifySignature = async (sig, opts) => {
	const { publicKey: pk, ...rest } = await getKey(sig.keyId, opts)

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
 * @param {string} id signing keyId
 * @param {string} key signing key
 * @param {string} [algo] digest algorithm
 */
export const useKey = (id, key, algo = 'sha256') => {
	mySigner = new Signer(id, key, { hashAlgorithm: algo })
	return mySigner
}

export * from './errors.js'
export * from './core.js'