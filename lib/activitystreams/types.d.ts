import {
	COLLECTION_TYPES,
	COLLECTION_PAGE_TYPES,
	ACTOR_TYPES,
	OBJECT_TYPES,
	ACTIVTY_TYPES,
	INTRANSITIVE_ACTIVTY_TYPES,
} from './core.js'

export type ContextValue = string | Record<string, string>

/** @see https://www.w3.org/TR/activitystreams-core/#collections */
export type CollectionTypes = typeof COLLECTION_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#collections */
export type CollectionPageTypes = typeof COLLECTION_PAGE_TYPES[number]

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
	type?: T
	rel?: string | string[]
	name?: string
	href?: string
	mediaType?: string
}

export interface CoreObject<T = string> {
	type?: T
	id?: string | null
	url?: string
	name?: string
	summary?: string
	published?: Date | string

	/** @see https://www.w3.org/TR/json-ld/#the-context */
	'@context'?: ContextValue | ContextValue[]
}

export type ObjectRef<T = string> = CoreObject<T> | string

export type ObjectRefs<T = string> = ObjectRef<T> | ObjectRef<T>[]

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-object */
export interface BaseObject<T> extends CoreObject<T> {
	to?: ObjectRefs
	cc?: ObjectRefs
	attachment?: ObjectRef[]
}

/** @see https://www.w3.org/TR/activitystreams-core/#collections */
export interface BaseCollection extends BaseObject<CollectionTypes | CollectionPageTypes> {
	totalItems?: number
	current?: ObjectRef<CollectionPageTypes>
	first?: ObjectRef<CollectionPageTypes>
	last?: ObjectRef<CollectionPageTypes>
}

/** @see https://www.w3.org/TR/activitystreams-core/#dfn-collectionpage */
export interface ICollectionPage {
	partOf?: ObjectRef<CollectionTypes>
	next?: ObjectRef<CollectionPageTypes>
	prev?: ObjectRef<CollectionPageTypes>
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-collection */
export interface Collection<T> extends BaseCollection {
	type?: 'Collection'
	items?: ObjectRef<T>[]
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-orderedcollection */
export interface OrderedCollection<T> extends BaseCollection {
	type?: 'OrderedCollection'
	orderedItems?: ObjectRef<T>[]
}

export interface BaseActivity extends BaseObject<ActivtyTypes | IntransitiveActivtyTypes> {
	actor?: ObjectRefs<ActorTypes>
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-activity */
export interface Activity<T = ObjectTypes> extends BaseActivity {
	type: ActivtyTypes
	object?: ObjectRefs<T>
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-intransitiveactivity */
export interface IntransitiveActivity extends BaseActivity {
	type: IntransitiveActivtyTypes
}
