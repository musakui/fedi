/** @link https://www.w3.org/ns/activitystreams#Object */
export interface BaseObject<T = string> {
	type: T
	id?: string
	name?: string
	summary?: string
	published?: Date
}

export interface BaseCollection<T = BaseObject> extends BaseObject {
	totalItems: number
	items: T[]
}

/** @link https://www.w3.org/ns/activitystreams#Collection */
export interface Collection extends BaseCollection {
	type: 'Collection'
}

/** @link https://www.w3.org/ns/activitystreams#OrderedCollection */
export interface OrderedCollection extends BaseCollection {
	type: 'OrderedCollection'
}

export type ActorTypes = 'Application' | 'Group' | 'Organization' | 'Person' | 'Service'

export interface Actor extends BaseObject<ActorTypes> {
}

export type ActivtyTypes = 'Accept'
	| 'Add'
	| 'Announce'
	| 'Block'
	| 'Create'
	| 'Delete'
	| 'Dislike'
	| 'Flag'
	| 'Follow'
	| 'Ignore'
	| 'Join'
	| 'Leave'
	| 'Like'
	| 'Reject'
	| 'Remove'
	| 'Undo'
	| 'Update'

/** @link https://www.w3.org/ns/activitystreams#Activity */
export interface Activity<O = BaseObject, T = BaseObject> extends BaseObject<ActivtyTypes> {
	object: O
	target: T
}

export type IntransitiveActivtyTypes = 'Arrive' | 'Question' | 'Travel'

/** @link https://www.w3.org/ns/activitystreams#IntransitiveActivity */
export interface IntransitiveActivity<T = BaseObject> extends BaseObject<IntransitiveActivityTypes> {
	actor: Actor
	target: T
}

export type ObjectTypes = 'Article'
	| 'Audio'
	| 'Document'
	| 'Event'
	| 'Image'
	| 'Note'
	| 'Page'
	| 'Place'
	| 'Profile'
	| 'Relationship'
	| 'Tombstone'
	| 'Video'

export interface ActivityStreamsObject extends BaseObject<ObjectTypes> {
}
