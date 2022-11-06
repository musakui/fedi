import * as core from './core.js'

let sign = null

const encoder = new TextEncoder()

const toB64 = (buf) => {
	const arr = Array.from(new Uint8Array(buf))
	return btoa(arr.reduce((s, c) => s + String.fromCharCode(c), ''))
}

const getDigest = async (data, algo = 'SHA-256') => {
	const dg = await crypto.subtle.digest(algo, encoder.encode(data))
	return `${algo}=${toB64(dg)}`
}

export const signRequest = async (req) => {
	if (!core.keyId || !sign) throw new Error('key not set')
	const [info, data] = core.createString(req)
	const signature = core.getHeader({ ...info, signature: await sign(data) })
	return {
		...req,
		headers: {
			...req.headers,
			signature,
		},
	}
}

export const sendRequest = async (req) => {
	const signed = await signRequest({
		...req,
		method: req.body ? 'POST' : 'GET',
		headers: {
			date: (new Date()).toUTCString(),
			...(req.body ? { digest: await getDigest(req.body) } : {}),
			...req.headers,
		},
	})

	const resp = await fetch(req.url, signed)
	if (!resp.ok) {
		throw new Error(`${resp.status} ${resp.statusText}`)
	}
	try {
		return await resp.json()
	} catch (err) {
		return await resp.text()
	}
}

export const useKey = (id, key) => {
	core.useKeyId(id)
	// TODO: implement browser signing
	sign = (data) => ''
}

export {
	algorithm,
	useAlgorithm,
} from './core.js'