import type {
	AnyCollection,
	CoreObject,
	PlaceObject,
	TombstoneObject,
	RelationshipObject,
} from '../activitystreams/types'

/** @see https://schema.org/PropertyValue */
export interface PropertyValue {
	type: 'PropertyValue'
	name: string
	value: string
}

export interface APObject<T extends string> extends CoreObject<T> {
	/** @see https://www.w3.org/TR/activitypub/#source-property */
	source?: {
		content?: string
		mediaType?: string
	}

	/** @see https://www.w3.org/TR/activitypub/#likes */
	likes?: string | URL | AnyCollection<'Like'>

	/** @see https://www.w3.org/TR/activitypub/#shares */
	shares?: string | URL | AnyCollection<'Announce'>

	/** @see https://www.w3.org/wiki/Activity_Streams_extensions#as:sensitive */
	sensitive?: boolean
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-article */
export interface ArticleObject extends APObject<'Article'> {
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-note */
export interface NoteObject extends APObject<'Note'> {
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-event */
export interface EventObject extends APObject<'Event'> {
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-document */
export interface DocumentObject<T extends string = 'Document'> extends APObject<T> {
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-page */
export interface PageObject extends DocumentObject<'Page'> {
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-image */
export interface ImageObject extends DocumentObject<'Image'> {
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-video */
export interface VideoObject extends DocumentObject<'Video'> {
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-audio */
export interface AudioObject extends DocumentObject<'Audio'> {
}

/** @see https://www.w3.org/wiki/Activity_Streams_extensions#as:Hashtag_type */
export interface HashtagObject extends APObject<'Hashtag'> {
}

/** @see https://docs.joinmastodon.org/spec/activitypub/#emoji */
export interface EmojiObject extends APObject<'Emoji'> {
}

export type ActivityPubObject = TombstoneObject
	| RelationshipObject
	| ArticleObject
	| NoteObject
	| PageObject
	| ImageObject
	| VideoObject
	| AudioObject
	| DocumentObject
	| PlaceObject
	| EventObject
	| EmojiObject
	| HashtagObject
