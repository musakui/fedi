export const INVALID_FIELD = 'INVALID_FIELD'
export const INVALID_HEADER = 'INVALID_HEADER'
export const VERIFICATION_FAILED = 'VERIFICATION_FAILED'
export const KEY_RETRIEVAL_FAILED = 'KEY_RETRIEVAL_FAILED'

export class HTTPSignaturesError extends Error {

	/**
	 * @param {string} code
	 * @param {string} message
	 */
	constructor(code, message) {
		super(message)

		/**
		 * Error Code
		 * @type {string}
		 */
		this.code = code
	}
}
