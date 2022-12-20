import {
	COLLECTION_TYPES,
	COLLECTION_PAGE_TYPES,
	ORDERED_COLLECTION_TYPES,
	ORDERED_COLLECTION_PAGE,
} from './core.js'

/** @see https://www.w3.org/TR/activitystreams-core/#collections */
export type CollectionTypes = typeof COLLECTION_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#collections */
export type CollectionPageTypes = typeof COLLECTION_PAGE_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#collections */
export type OrderedCollectionTypes = typeof ORDERED_COLLECTION_TYPES[number]

type AllCollectionTypes = CollectionTypes | CollectionPageTypes

type CollectionPageRef = ObjectRef<CollectionPageTypes>

type OCPType = typeof ORDERED_COLLECTION_PAGE

type OneOrMany<T> = T | T[]

interface BaseEntity {
	/** @see https://www.w3.org/TR/json-ld/#the-context */
	'@context'?: OneOrMany<string | URL | Record<string, string | URL>>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-id */
	id?: string | URL | null

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name */
	name?: string
}

export type ObjectRef<T extends string> = string | URL | CoreLink | CoreObject<T>

export type ObjectRefs<T extends string = string> = OneOrMany<ObjectRef<T>>

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-link */
export interface CoreLink<T extends string = 'Link'> extends BaseEntity {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type */
	type?: OneOrMany<T>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-rel */
	rel?: OneOrMany<string>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-href */
	href?: string | URL

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-width */
	width?: number;

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-height */
	height?: number;

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype */
	mediaType?: string
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-object */
export interface CoreObject<T extends string = 'Object'> extends BaseEntity {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type */
	type?: OneOrMany<T>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-summary */
	summary?: string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-content */
	content?: string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration */
	duration?: string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-starttime */
	startTime?: Date | string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-endtime */
	endTime?: Date | string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-published */
	published?: Date | string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-updated */
	updated?: Date | string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-url */
	url?: OneOrMany<string | URL | CoreLink>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype */
	mediaType?: string

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-to */
	to?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-cc */
	cc?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-bto */
	bto?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-bcc */
	bcc?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-icon */
	icon?: ObjectRefs<'Image'>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-image */
	image?: ObjectRefs<'Image'>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-attachment */
	attachment?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tag */
	tag?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-preview */
	preview?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-audience */
	audience?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-generator */
	generator?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-attributedto */
	attributedTo?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-inreplyto */
	inReplyTo?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-replies */
	replies?: ObjectRef<CollectionTypes>
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-activity */
export interface CoreActivity<T extends string = 'Activity'> extends CoreObject<T> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-actor */
	actor?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-object-term */
	object?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-target */
	target?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-result */
	result?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-origin */
	origin?: ObjectRefs

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-instrument */
	instrument?: ObjectRefs
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-intransitiveactivity */
export interface CoreIntransitiveActivity<T extends string = 'IntransitiveActivity'> extends CoreActivity<T> {
	/** The `object` property is inappropriate for these activities. */
	object?: never
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-collection */
export interface Collection<S extends string, T extends AllCollectionTypes = 'Collection'> extends CoreObject<T> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-items */
	items?: ObjectRef<S>[]

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-totalitems */
	totalItems?: number

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-current */
	current?: CollectionPageRef

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-first */
	first?: CollectionPageRef

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-last */
	last?: CollectionPageRef
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-orderedcollection */
export interface OrderedCollection<S extends string, T extends OrderedCollectionTypes = 'OrderedCollection'> extends Collection<S, T> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-items */
	orderedItems?: ObjectRef<S>[]
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-collectionpage */
export interface CollectionPage<S extends string, T extends CollectionPageTypes = 'CollectionPage'> extends Collection<S, T> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-partof */
	partOf?: ObjectRef<CollectionTypes>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-next */
	next?: CollectionPageRef

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-prev */
	prev?: CollectionPageRef
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-orderedcollectionpage */
export interface OrderedCollectionPage<S extends string> extends CollectionPage<S, OCPType>, OrderedCollection<S, OCPType> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-startindex */
	startIndex?: number
}
