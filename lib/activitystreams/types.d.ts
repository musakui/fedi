import {
	ACTOR_TYPES,
	OBJECT_TYPES,
	ACTIVTY_TYPES,
	INTRANSITIVE_ACTIVTY_TYPES,
} from './core.js'

export type ContextValue = string | Record<string, string>

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-link */
export interface Link<T = 'Link'> {
	type: T
	rel?: string | string[]
	name?: string
	href?: string
	mediaType?: string
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-object */
export interface BaseObject<T = string> {
	type: T
	id?: string | null
	name?: string
	summary?: string
	published?: Date | string
	attachment?: ObjectReference[]
	to?: ObjectReference | ObjectReference[]
	cc?: ObjectReference | ObjectReference[]
	'@context'?: ContextValue | ContextValue[]
}

export type ObjectReference<T = BaseObject> = T | string

export interface BaseCollection<T = ObjectReference> extends BaseObject {
	items?: T[]
	totalItems?: number
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-collection */
export interface Collection<T = ObjectReference> extends BaseCollection<T> {
	type: 'Collection'
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-orderedcollection */
export interface OrderedCollection<T = ObjectReference> extends BaseCollection<T> {
	type: 'OrderedCollection'
}

/*
export type ActorTypes = typeof ACTOR_TYPES[number]

export type ObjectTypes = typeof OBJECT_TYPES[number]
*/

export type ActorTypes = 'Application' | 'Group' | 'Organization' | 'Person' | 'Service'

export type ObjectTypes = 'Article' | 'Audio' | 'Document' | 'Event' | 'Image' | 'Note' | 'Page' | 'Place' | 'Profile' | 'Relationship' | 'Tombstone' | 'Video'

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-activity */
export type ActivtyTypes = 'Accept' | 'Add' | 'Announce' | 'Block' | 'Create' | 'Delete' | 'Dislike' | 'Flag' | 'Follow' | 'Ignore' | 'Join' | 'Leave' | 'Like' | 'Reject' | 'Remove' | 'Undo' | 'Update'
// export type ActivtyTypes = typeof ACTIVTY_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-intransitiveactivity */
export type IntransitiveActivtyTypes = 'Arrive' | 'Question' | 'Travel'
// export type IntransitiveActivtyTypes = typeof INTRANSITIVE_ACTIVTY_TYPES[number]
