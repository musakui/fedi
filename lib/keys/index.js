const KEY_ALGO = {
	name: 'RSASSA-PKCS1-v1_5',
	hash: 'SHA-256',
	publicExponent: new Uint8Array([1, 0, 1]),
}

/**
 * Generates an RSA private key
 * @param {number} modulusLength bit length of the RSA modulus
 * @return PEM (PKCS #8) of private key
 */
export const generatePrivateKey = async (modulusLength = 2048) => {
	const { privateKey } = await crypto.subtle.generateKey({
		...KEY_ALGO,
		modulusLength,
	}, true, ['sign'])
	const arr = new Uint8Array(await crypto.subtle.exportKey('pkcs8', privateKey))
	return window.btoa(arr.reduce((c, s) => c + String.fromCharCode(s), ''))
}
