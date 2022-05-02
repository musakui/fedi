import { createPublicKey } from 'crypto'

const format = 'pem'

export const fromPrivate = (key) => createPublicKey({ format, key }).export({ format, type: 'spki' })
