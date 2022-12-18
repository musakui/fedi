import { bufToB64, importPrivateKey, importPublicKey } from '../keys/index.js'
import * as core from './core.js'
import {
	HTTPSignaturesError,
	INVALID_FIELD,
	VERIFICATION_FAILED,
	KEY_RETRIEVAL_FAILED,
} from './errors.js'

/** @type {Signer | null} */
let mySigner = null

const encoder = new TextEncoder()

const algorithm = 'RSASSA-PKCS1-v1_5'

/** @param {string} str */
const strToBuf = (str) => encoder.encode(str)

const getDigest = async (data, algo = 'SHA-256') => {
	const dg = await crypto.subtle.digest(algo, strToBuf(data))
	return `${algo}=${bufToB64(dg)}`
}

export class Signer extends core.CoreSigner {
	/** @param {string} data string to sign */
	async sign(data) {
		const key = await importPrivateKey(this.key)
		const buf = await crypto.subtle.sign(this.algorithm, key, strToBuf(data))
		return bufToB64(buf)
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
		let resp = await fetch(id, { headers })
		if (resp.status === 410) {
			throw new HTTPSignaturesError(KEY_RETRIEVAL_FAILED, 'Gone')
		} else if (resp.status > 400) {
			// some sites require signed GET
			resp = await sendRequest({ url: id, headers }, opts?.signer || mySigner)
		}
		return await resp.json()
	} catch (err) {
		throw new HTTPSignaturesError(KEY_RETRIEVAL_FAILED, `failed to GET: ${id}`)
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

	const keyPem = pk.publicKeyPem.split('\n').filter((l) => !l.startsWith('-----')).join('').trim()
	const key = await importPublicKey(keyPem)
	const ok = await crypto.subtle.verify(algorithm, key, strToBuf(sig.signature), strToBuf(sig.data))
	if (ok) return rest

	throw new HTTPSignaturesError(VERIFICATION_FAILED, 'verification failed')
}

/**
 * @param {string} id signing keyId
 * @param {string} key signing key
 */
export const useKey = (id, key) => {
	mySigner = new Signer(id, key, { algorithm })
}

export * from './errors.js'
export * from './core.js'
