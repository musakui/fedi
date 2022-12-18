/**
 * @param {string} data string to hash
 * @param {string} algo hash algorithm
 */
export type Hasher = (data: string, algo?: string) => Promise<string>

export interface SignerOptions {
	algorithm: string
	hashAlgorithm: string

	/** additional headers to sign */
	headers: string[]

	/**
	 * validity of signature (seconds)
	 *
	 * used by HS2019 to calculate the `expires` field
	 */
	validity?: number
}

export interface SignatureField {
	keyId: string
	signature: string
	algorithm?: string
	/** signed headers */
	headers?: string
	/** creation timestamp */
	created?: number
	/** expiry timestamp */
	expires?: number
}

export interface KeyFetchOptions {
	/** signer instance */
	signer: Signer
	/** additional headers */
	headers: Record<string, string>
}
