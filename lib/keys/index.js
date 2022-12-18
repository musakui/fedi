const CS = window.crypto.subtle
const SIGN = ['sign']
const VERIFY = ['verify']

const KEY_ALGO = {
	name: 'RSASSA-PKCS1-v1_5',
	hash: 'SHA-256',
	publicExponent: new Uint8Array([1, 0, 1]),
}

/**
 * @param {ArrayBuffer} buf
 */
export const bufToB64 = (buf) => {
	const arr = new Uint8Array(buf)
	return window.btoa(arr.reduce((c, s) => c + String.fromCharCode(s), ''))
}

/**
 * @param {string} str
 */
export const b64ToBuf = (str) => {
	const binStr = window.atob(str)
	const binlen = binStr.length
	const buf = new Uint8Array(binlen)
	for (let i = 0; i < binlen; i++) {
		buf[i] = binStr.charCodeAt(i)
	}
	return buf.buffer
}

/**
 * Generates an RSA private key
 * @param {number} modulusLength bit length of the RSA modulus
 * @return PEM (PKCS #8) of private key
 */
export const generatePrivateKey = async (modulusLength = 2048) => {
	const { privateKey } = await CS.generateKey({
		...KEY_ALGO,
		modulusLength,
	}, true, SIGN)
	return bufToB64(await CS.exportKey('pkcs8', privateKey))
}

/**
 * Import private key PEM
 * @param {string} pem
 */
export const importPrivateKey = (pem) => CS.importKey('pkcs8', b64ToBuf(pem), KEY_ALGO, true, SIGN)

/**
 * Import public key PEM
 * @param {string} pem
 */
export const importPublicKey = (pem) => CS.importKey('spki', b64ToBuf(pem), KEY_ALGO, true, VERIFY)

/**
 * Derives the public key from an RSA private key
 * @param {string} key
 * @return PEM (SPKI) of private key
 */
export const fromPrivate = async (key) => {
	const privateKey = await importPrivateKey(key)
	const { d, key_ops, ...jwk } = await CS.exportKey('jwk', privateKey)
	const publicKey = await CS.importKey('jwk', jwk, KEY_ALGO, true, VERIFY)
	return bufToB64(await CS.exportKey('spki', publicKey))
}

export * from './core.js'
