export const PATH = '.well-known/webfinger'
export const CONTENT_TYPE = 'application/jrd+json'

export const AVATAR = 'http://webfinger.net/rel/avatar'
export const PROFILE_PAGE = 'http://webfinger.net/rel/profile-page'

/**
 * @param {string} user subject username
 * @param {string} host domain
 */
export const subject = (user, host) => `acct:${user}@${host}`

/**
 * @param {string} rel relation type
 * @param {string} type media type
 * @param {string} href target URI
 * @return {import('./types').WebFingerLink}
 */
export const link = (rel, type, href) => ({ rel, type, href })

/**
 * @param {import('./types').WebFinger} wf
 */
export const define = (wf) => wf
