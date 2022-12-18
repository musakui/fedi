import {
	HTTPSignaturesError,
	INVALID_HEADER,
	INVALID_FIELD,
} from './errors.js'

const HS2019 = 'hs2019'
const CREATED = '(created)'
const EXPIRES = '(expires)'
const TARGET = '(request-target)'

const SIG_REGEX = /^([^=]+)=(?:"([^"]+)"|([\d.]+))$/

const numericFields = new Set([
	'created',
	'expires',
])

/**
 * @param {number} [valid] validity of signature (seconds)
 */
const getSigInfo = (valid) => {
	const created = Math.floor(new Date() / 1000)
	return {
		created,
		expires: valid ? (created + valid) : null,
	}
}

/** @type {typeof fetch} */
export let coreFetch = null

export const appJSON = ['', 'ld+', 'activity+'].map((c) => `application/${c}json`).join(', ')

export class CoreSigner {
	/**
	 * @param {string} keyId
	 * @param {string} key
	 * @param {Partial<import('./types').SignerOptions>} opts
	 */
	constructor(keyId, key, opts = {}) {
		/** @type {string} */
		this.key = key

		/** @type {string} */
		this.keyId = keyId

		/** @type {string} */
		this.algorithm = opts?.algorithm || 'rsa-sha256'

		/** @type {string} */
		this.hashAlgorithm = opts?.hashAlgorithm || 'sha256'

		/** @type {string[]} */
		this.headers = opts?.headers || ['host']

		/** @type {number | undefined} */
		this.validity = opts?.validity
	}

	/** @param {string} _ string to sign */
	async sign(_) {
		return ''
	}
}

/**
 * @param {Partial<Request>} req request to sign
 * @param {CoreSigner} signer signer instance
 */
export const signRequest = async (req, signer) => {
	const info = signer.algorithm === HS2019
		? getSigInfo(signer.validity)
		: null

	const toSign = [
		TARGET,
		info?.created ? CREATED : '',
		info?.expires ? EXPIRES : '',
		req.headers?.date ? 'date' : '',
		req.headers?.digest ? 'digest' : '',
		...signer.headers.map((i) => i.toLowerCase()),
	].filter((i) => i)

	const url = new URL(req.url)
	const head = new Map([
		[TARGET, `${req.method.toLowerCase()} ${url.pathname}`],
		[CREATED, info?.created],
		[EXPIRES, info?.expires],
		...Object.entries({
			host: url.host,
			...req.headers
		}).map(([k, v]) => [k.toLowerCase(), v]),
	])

	const signString = toSign.map((h) => `${h}: ${head.get(h)}`).join('\n')

	const signature = Object.entries({
		algorithm: signer.algorithm,
		keyId: signer.keyId,
		headers: toSign.join(' '),
		...info,
		signature: await signer.sign(signString),
	}).map(([k, v]) => {
		if (!v) return null
		return numericFields.has(k)
			? `${k}=${v}`
			: `${k}="${v}"`
	}).filter((i) => i).join(',')

	return {
		...req,
		headers: {
			...req.headers,
			signature,
		},
	}
}

/**
 * create request sender
 * @param {object} [opts]
 * @param {import('./types').Hasher} [opts.getDigest] hash function
 */
export const sender = (opts) => {
	/**
	 * @param {Partial<Request>} req
	 * @param {CoreSigner} signer signer instance
	 */
	return async (req, signer) => {
		const signed = await signRequest({
			method: req.body ? 'POST' : 'GET',
			...req,
			headers: {
				date: (new Date()).toUTCString(),
				...((opts?.getDigest && req.body) ? { digest: await opts.getDigest(req.body) } : null),
				...req.headers,
			},
		}, signer)

		return await coreFetch(req.url, signed)
	}
}

/**
 * create request parser
 * @param {object} [opts]
 * @param {import('./types').Hasher} [opts.getDigest] hash function
 */
export const parser = (opts) => async (/** @type {Partial<Request & { path: string }>} */ req) => {
	if (!req.headers) throw new HTTPSignaturesError(INVALID_HEADER, 'no headers on request')
	if (!req.headers.signature) throw new HTTPSignaturesError(INVALID_HEADER, 'missing signature header')

	const now = new Date()

	if (req.headers.date) {
		const hd = new Date(req.headers.date)
		if (isNaN(hd)) throw new HTTPSignaturesError(INVALID_HEADER, `invalid date header: ${req.headers.date}`)
		const dt = Math.abs(now - hd)
		if (dt > 1e5) throw new HTTPSignaturesError(INVALID_HEADER, `date too far: ${dt}`)
	}

	if (opts?.getDigest && req.body && req.headers.digest) {
		const dg = req.headers.digest
		const ha = dg.split('=')[0]
		const bd = await opts.getDigest(req.body, ha)
		if (dg !== bd) throw new HTTPSignaturesError(INVALID_HEADER, `invalid digest: ${dg}`)
	}

	/** @type {import('./types').SignatureField} */
	const sig = Object.fromEntries(req.headers.signature.split(',').map((s) => {
		const m = SIG_REGEX.exec(s.trim())
		return m ? [m[1], m[2] || parseFloat(m[3])] : ['', '']
	}))

	if (!sig.keyId || !sig.signature) {
		throw new HTTPSignaturesError(INVALID_FIELD, `invalid signature header: ${req.headers.signature}`)
	}

	if (sig.headers === '') throw new HTTPSignaturesError(INVALID_FIELD, 'empty headers field')

	if (sig.created) {
		const created = new Date(sig.created * 1000)
		if (isNaN(created)) throw new HTTPSignaturesError(INVALID_FIELD, `invalid created: ${sig.created}`)
		if (created > now) throw new HTTPSignaturesError(INVALID_FIELD, `created in future: ${created}`)
	}

	if (sig.expires) {
		const expires = new Date(sig.expires * 1000)
		if (isNaN(expires)) throw new HTTPSignaturesError(INVALID_FIELD, `invalid expires: ${sig.expires}`)
		if (expires < now) throw new HTTPSignaturesError(INVALID_FIELD, `signature expired: ${expires}`)
	}

	const algo = sig.algorithm || HS2019
	const isHs = algo === HS2019
	const head = sig.headers ? sig.headers.split(' ') : [CREATED]

	const getValue = (h) => {
		switch (h) {
			case TARGET:
				return `${req.method.toLowerCase()} ${req.path}`
			case CREATED:
				if (isHs && parseInt(sig.created)) return sig.created
				break
			case EXPIRES:
				if (isHs && parseInt(sig.expires)) return sig.expires
				break
			default:
				return req.headers[h]
		}
		throw new HTTPSignaturesError(INVALID_FIELD, `invalid field: ${h}`)
	}

	return {
		...sig,
		data: head.map((h) => `${h}: ${getValue(h)}`).join('\n'),
	}
}

export const useFetch = (fn) => {
	coreFetch = fn
}

try {
	coreFetch = fetch
} catch (err) {
}
