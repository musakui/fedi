import { createSign, createVerify, createHash } from 'crypto'
import * as core from './core.js'

/** @type {(d: string) => string} */
let sign = null

/** @type {typeof fetch} */
let myFetch = null

const B64 = 'base64'
const S256 = 'SHA-256'
const appJSON = ['', 'ld+', 'activity+'].map((c) => `application/${c}json`).join(', ')

/**
 * @param {string} data string to hash
 * @param {string} [algo] hash algorithm
 */
const getDigest = (data, algo = S256) => {
  let hasher = null
  switch (algo) {
    case S256:
      hasher = createHash('sha256')
      break
    case 'SHA-512':
      hasher = createHash('sha512')
      break
    default:
      return undefined
  }
  return `${algo}=${hasher.update(data).digest(B64)}`
}

/**
 * @param {Partial<Request>} req request to sign
 */
export const signRequest = (req) => {
  if (!sign) throw new Error('key not set')
  const [info, data] = core.createString(req)
  const signature = core.getHeader({ ...info, signature: sign(data) })
  return {
    ...req,
    headers: {
      ...req.headers,
      signature,
    },
  }
}

/**
 * @param {Partial<Request>} req request to send
 */
export const sendRequest = async (req) => {
  if (!myFetch) throw new Error('fetch not set')

  return await myFetch(req.url, signRequest({
    ...req,
    method: req.body ? 'POST' : 'GET',
    headers: {
      date: (new Date()).toUTCString(),
      ...(req.body ? { digest: getDigest(req.body) } : {}),
      ...req.headers,
    },
  }))
}

/**
 * @param {string} id keyId
 * @param {string} accept `Accept` headers
 */
export const getKey = async (id, accept = appJSON) => {
  const headers = { accept }
  try {
    const resp = await myFetch(id, { headers })
    return await resp.json()
  } catch (err) {
    // some sites require signed GET
    const resp = await sendRequest({
      url: id,
      headers,
    })
    return await resp.json()
  }
}

/**
 * verify request signature
 * @param {Partial<Request>} req
 */
export const verifyRequest = async (req) => {
  if (req.body && req.headers.digest) {
    const dg = req.headers.digest
    const ha = dg.split('=')[0]
    if (dg !== getDigest(req.body, ha)) throw new Error(`invalid digest: ${dg}`)
  }

  const sig = core.parse(req)
  const { publicKey: pk, ...rest } = await getKey(sig.keyId)

  if (!pk || !pk.publicKeyPem) {
    throw new Error(`failed to get key: ${sig.keyId}`)
  }

  if (pk.id && pk.id !== sig.keyId) {
    throw new Error(`invalid keyId: ${sig.keyId} != ${pk.id}`)
  }

  const veri = createVerify(sig.algorithm).update(sig.data)
  if (veri.verify(pk.publicKeyPem, sig.signature, B64)) return rest

  throw new Error('verification failed')
}

/**
 * @param {string} id signing keyId
 * @param {string} key signing key
 * @param {string} [algo] signing algorithm
 */
export const useKey = (id, key, algo = 'sha256') => {
  core.useKeyId(id)
  sign = (data) => createSign(algo).update(data).sign(key).toString(B64)
}

export const useFetch = (fn) => {
  myFetch = fn
}

try {
  myFetch = fetch
} catch (err) {
}

export * from './core.js'