import {
	ACTOR_TYPES,
	OBJECT_TYPES,
	ACTIVTY_TYPES,
	INTRANSITIVE_ACTIVTY_TYPES,
} from './core.js'

/** @see https://www.w3.org/ns/activitystreams#Object */
export interface BaseObject<T = string> {
	type: T
	id?: string | null
	name?: string
	summary?: string
	published?: Date | string
	attachment?: ObjectReference[]
	to?: ObjectReference | ObjectReference[]
	cc?: ObjectReference | ObjectReference[]
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

export type ActorTypes = typeof ACTOR_TYPES[number]
export type ObjectTypes = typeof OBJECT_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-activity */
export type ActivtyTypes = typeof ACTIVTY_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-intransitiveactivity */
export type IntransitiveActivtyTypes = typeof INTRANSITIVE_ACTIVTY_TYPES[number]
