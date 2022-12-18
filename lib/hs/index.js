import * as core from './core.js'

const encoder = new TextEncoder()

const toB64 = (buf) => {
	const arr = Array.from(new Uint8Array(buf))
	return window.btoa(arr.reduce((s, c) => s + String.fromCharCode(c), ''))
}

/** @type {import('./types').Hasher} */
const getDigest = async (data, algo = 'SHA-256') => {
	const dg = await crypto.subtle.digest(algo, encoder.encode(data))
	return `${algo}=${toB64(dg)}`
}

/**
 * send request
 */
export const sendRequest = core.sender({ getDigest })

export const useKey = (id, key) => {
	// TODO: implement browser signing
}
