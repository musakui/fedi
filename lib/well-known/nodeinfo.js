export const PATH = '.well-known/nodeinfo'

export const SCHEMA_BASE = `http://nodeinfo.diaspora.software/ns/schema`

export const VERSIONS = /** @type {const} */ ([
	'1.0',
	'1.1',
	'2.0',
	'2.1',
])

export const PROTOCOLS = /** @type {const} */ ([
	'activitypub',
	'buddycloud',
	'dfrn',
	'diaspora',
	'libertree',
	'ostatus',
	'pumpio',
	'tent',
	'xmpp',
	'zot',
])

/**
 * @param {string | URL} href NodeInfo location
 * @param {import('./types').NodeInfoVersions} version NodeInfo version
 * @return {import('./types').JSONResourceDescriptor} NodeInfo JRD
 */
export const define = (href, version = '2.1') => ({
	links: [
		{
			rel: `${SCHEMA_BASE}/${version}`,
			href,
		},
	],
})

/**
 * @param {Partial<import('./types').NodeInfoDocument>} ni Partial NodeInfo
 * @return {import('./types').NodeInfoDocument} NodeInfo
 */
export const defineDocument = (ni = {}) => ({
	version: ni.version || '2.1',
	software: { ...ni.software },
	services: {
		inbound: ni.services?.inbound || [],
		outbound: ni.services?.outbound || [],
	},
	protocols: ni.protocols || ['activitypub'],
	openRegistrations: Boolean(ni.openRegistrations),
	usage: {
		users: { ...ni.usage?.users },
		...ni.usage,
	},
	metadata: { ...ni.metadata },
})
