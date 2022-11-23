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
	const created = algorithm === HS2019
		? Math.floor(new Date() / 1000)
		: null
	return {
		created,
		expires: (created && valid) ? (created + valid) : null,
	}
}

/** @type {string} */
export let keyId = null

export let algorithm = 'rsa-sha256'

/**
 * create signature string
 * @param {Partial<Request>} req request
 * @param {string[]} [signHeaders] other headers to sign
 */
export const createString = (req, signHeaders = ['host']) => {
	const info = getSigInfo()
	const toSign = [
		TARGET,
		info?.created ? CREATED : '',
		info?.expires ? EXPIRES : '',
		req.headers?.date ? 'date' : '',
		req.headers?.digest ? 'digest' : '',
		...signHeaders.map((i) => i.toLowerCase()),
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

	return [
		{ headers: toSign.join(' '), ...info },
		toSign.map((h) => `${h}: ${head.get(h)}`).join('\n'),
	]
}

/**
 * construct Signature header
 * @param {object} fields header fields
 * @param {string} fields.signature signature
 */
export const getHeader = (fields) => Object.entries({
	algorithm,
	keyId,
	...fields
}).map(([k, v]) => {
	if (!v) return null
	return numericFields.has(k)
		? `${k}=${v}`
		: `${k}="${v}"`
}).filter((i) => i).join(',')

/**
 * parse headers from request
 * @param {Partial<Request> & { path?: string }} req
 */
export const parse = (req) => {
	if (!req.headers) throw new HTTPSignaturesError(INVALID_HEADER, 'no headers on request')
	if (!req.headers.signature) throw new HTTPSignaturesError(INVALID_HEADER, 'missing signature header')

	const now = new Date()

	if (req.headers.date) {
		const hd = new Date(req.headers.date)
		if (isNaN(hd)) throw new HTTPSignaturesError(INVALID_HEADER, `invalid date header: ${req.headers.date}`)
		const dt = Math.abs(now - hd)
		if (dt > 1e5) throw new HTTPSignaturesError(INVALID_HEADER, `date too far: ${dt}`)
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

/**
 * @param {string} algo signature algorithm to use
 */
export const useAlgorithm = (algo) => {
	algorithm = algo
}

/**
 * @param {string} id keyId
 */
export const useKeyId = (id) => {
	keyId = id
}
