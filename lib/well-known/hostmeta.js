import { PATH as WF_PATH } from './webfinger.js'

const DEFAULT_TEMPLATE = `${WF_PATH}?resource={uri}`

export const PATH = '.well-known/host-meta'

/**
 * @param {string | URL} domain
 * @param {string} resourceTemplate template for WebFinger resource lookup
 * @return {import('./types').JSONResourceDescriptor} host-meta JRD
 */
export const define = (domain, resourceTemplate = DEFAULT_TEMPLATE) => ({
	links: [
		{
			rel: 'lrdd',
			template: new URL(resourceTemplate, domain),
		}
	],
})
