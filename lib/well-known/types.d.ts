import { VERSIONS, PROTOCOLS } from './nodeinfo.js'

type JRDProperties = Record<string, string | null>

export interface JRDLink {
	/** relation type */
	rel: string | URL

	/** media type */
	type?: string

	/** target URI */
	href?: string | URL

	/** language map of link titles */
	titles?: Record<string, string>

	/** additional properties */
	properties?: JRDProperties

	/**
	 * target URI template
	 * @see https://www.rfc-editor.org/rfc/rfc6415#section-3.1.1.1
	 */
	template?: string
}

/** @see https://www.rfc-editor.org/rfc/rfc6415#appendix-A */
export interface JSONResourceDescriptor {
	/** entity described by the JRD */
	subject: string

	/** link relations */
	links?: JRDLink[]

	/** alternate URIs for `subject` */
	aliases?: (string | URL)[]

	/** additional properties */
	properties?: JRDProperties
}

export type NodeInfoVersions = typeof VERSIONS[number]
export type NodeInfoProtocols = typeof PROTOCOLS[number]

/**
 * @see https://github.com/jhass/nodeinfo/blob/main/schemas/2.1/schema.json
 */
export interface NodeInfoDocument {
	version: NodeInfoVersions
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
