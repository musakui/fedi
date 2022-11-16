type NodeInfoProtocols = 'activitypub' | 'diaspora' | 'xmpp'

/**
 * @link https://github.com/jhass/nodeinfo/blob/main/schemas/2.1/schema.json
 */
export interface NodeInfo {
	version: '1.0' | '1.1' | '2.0' | '2.1'
	software: {
		name: string
		version: string
		homepage?: string
		repository?: string
	}
	protocols: NodeInfoProtocols[]
	services: {
		inbound: string[]
		outbound: string[]
	}
	openRegistrations: boolean
	usage: {
		users: {
			total?: number
			activeMonth?: number
			activeHalfYear?: number
		}
		localPosts?: number
		localComments?: number
	}
	metadata: Record<string, any>
}

export interface WebFingerLink {
	rel: string
	type?: string
	href?: string
	titles?: Record<string, string>
	properties?: Record<string, string | null>
}

/**
 * @link https://www.rfc-editor.org/rfc/rfc7033
 */
export interface WebFinger {
	subject: string
	aliases?: string[]
	properties?: Record<string, string | null>
	links?: WebFingerLink[]
}
