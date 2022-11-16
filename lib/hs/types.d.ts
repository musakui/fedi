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
