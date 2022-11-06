export const PATH = '.well-known/webfinger'
export const CONTENT_TYPE = 'application/jrd+json'

export const AVATAR = 'http://webfinger.net/rel/avatar'
export const PROFILE_PAGE = 'http://webfinger.net/rel/profile-page'

/**
 * @typedef {string} URI
 */

/**
 * link relation
 * @typedef {object} LinkRelation
 * @property {string | URI} rel relation type
 * @property {string} [type] media type
 * @property {URI} [href] target URI
 */

/**
 * JSON Resource Descriptor
 * @typedef {object} WebFinger
 * @property {URI} subject
 * @property {LinkRelation[]} links
 * @property {URI[]} [aliases]
 * @property {Record<URI, string | null>} [properties]
 */

/**
 * @param {string} user subject username
 * @param {string} host domain
 */
export const subject = (user, host) => `acct:${user}@${host}`

/**
 * @param {string | URI} rel relation type
 * @param {string} type media type
 * @param {URI} href target URI
 * @returns {LinkRelation}
 */
export const link = (rel, type, href) => ({ rel, type, href })

/**
 * @param {WebFinger} wf
 */
export const create = (wf) => JSON.stringify(wf)