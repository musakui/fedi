import { createPublicKey } from 'crypto'

/**
 * Derives the public key from an RSA private key
 * @param {string} key private key
 */
export const fromPrivate = (key) => createPublicKey({ key }).export({ format: 'pem', type: 'spki' })

export * from './core.js'
