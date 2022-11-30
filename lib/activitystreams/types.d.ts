import {
	COLLECTION_TYPES,
	ACTOR_TYPES,
	OBJECT_TYPES,
	ACTIVTY_TYPES,
	INTRANSITIVE_ACTIVTY_TYPES,
} from './core.js'

export type ContextValue = string | Record<string, string>

/** @see https://www.w3.org/TR/activitystreams-core/#collections */
export type CollectionTypes = typeof COLLECTION_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#object */
export type ObjectTypes = typeof OBJECT_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#actors */
export type ActorTypes = typeof ACTOR_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#activities */
export type ActivtyTypes = typeof ACTIVTY_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#intransitiveactivities */
export type IntransitiveActivtyTypes = typeof INTRANSITIVE_ACTIVTY_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-link */
export interface Link<T = 'Link'> {
	type: T
	rel?: string | string[]
	name?: string
	href?: string
	mediaType?: string
}

export interface CoreObject<T = string> {
	type: T
	id?: string | null
	name?: string
	summary?: string
	published?: Date | string

	/** @see https://www.w3.org/TR/json-ld/#the-context */
	'@context'?: ContextValue | ContextValue[]
}

export type ObjectReference<T = string> = CoreObject<T> | string

export type ObjectReferences<T = string> = ObjectReference<T> | ObjectReference<T>[]

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-object */
export interface BaseObject<T> extends CoreObject<T> {
	to?: ObjectReferences
	cc?: ObjectReferences
	attachment?: ObjectReference[]
}

export interface BaseCollection<T = string> extends BaseObject<CollectionTypes> {
	items?: ObjectReference<T>[]
	totalItems?: number
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-collection */
export interface CollectionPageFields {
	partOf?: ObjectReference<BaseCollection>
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-orderedcollection */
export interface OrderedCollectionFields<T> {
	orderedItems?: ObjectReference<T>[]
}

export interface BaseActivity extends BaseObject<ActivtyTypes | IntransitiveActivtyTypes> {
	actor?: ObjectReferences<ActorTypes>
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-activity */
export interface Activity<T = ObjectTypes> extends BaseActivity {
	type: ActivtyTypes
	object?: ObjectReferences<T>
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-intransitiveactivity */
export interface IntransitiveActivity extends BaseActivity {
	type: IntransitiveActivtyTypes
}
