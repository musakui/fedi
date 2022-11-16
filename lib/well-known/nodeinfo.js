/**
 * @param {Partial<import('./types').NodeInfo>} ni Partial NodeInfo
 * @return {import('./types').NodeInfo} NodeInfo
 */
export const define = (ni) => ({
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
