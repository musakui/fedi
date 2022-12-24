import { ACTIVITY_JSON } from '../activitypub/contentType.js'

export const PATH = '.well-known/webfinger'

export const AVATAR = 'http://webfinger.net/rel/avatar'
export const PROFILE_PAGE = 'http://webfinger.net/rel/profile-page'

/**
 * @see https://www.rfc-editor.org/rfc/rfc7565
 * @param {string} user username
 * @param {string} host hostname
 */
export const acct = (user, host) => `acct:${user}@${host}`

/**
 * @see https://www.rfc-editor.org/rfc/rfc7033
 * @param {string} user username
 * @param {string} host hostname
 * @param {string} href link to profile
 * @param {Partial<import('./types').JSONResourceDescriptor>} wf additional WebFinger data
 * @return {import('./types').JSONResourceDescriptor} WebFinger JRD
 */
export const define = (user, host, href, wf = {}) => ({
	subject: acct(user, host),
	...wf,
	links: [
		{
			rel: 'self',
			type: ACTIVITY_JSON,
			href,
		},
		...(wf?.links || []),
	],
})
