import * as NodeInfo from './nodeinfo.js'
import * as WebFinger from './webfinger.js'

/**
 * @param {string} domain
 */
export const generateHostMeta = (domain) => `<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
	<Link rel="lrdd" type="application/xrd+xml" template="${domain}/.well-known/webfinger?resource={uri}"/>
</XRD>`

export { define as defineNodeInfo } from './nodeinfo.js'
export { define as defineWebFinger } from './webfinger.js'

export {
	WebFinger,
	NodeInfo,
}
