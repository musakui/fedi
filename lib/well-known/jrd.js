export const CONTENT_TYPE = 'application/jrd+json'

export const XRD_CONTENT_TYPE = 'application/xrd+xml'

/**
 * @param {string} rel relation type
 * @param {string} type media type
 * @param {string} href target URI
 * @return {import('./types').JRDLink}
 */
export const defineLink = (rel, type, href) => ({ rel, type, href })

/** @param {import('./types').JRDLink} link */
const asLinkTag = (link) => `<Link ${Object.entries(link).map(([k, v]) => `${k}="${v}"`).join(' ')} />`

/**
 * @param {import('./types').JSONResourceDescriptor} jrd JSON Resource Descriptor
 */
export const toXRD = (jrd) => `<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
${jrd.links?.map(asLinkTag).join('\n') || ''}
</XRD>`
