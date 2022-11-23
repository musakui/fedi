import type {
	BaseObject,
	ActorTypes,
	ObjectReference,
	OrderedCollection,
	Collection,
} from '../types'

/** @see https://www.w3.org/TR/activitypub/#actor-objects */
export interface Actor extends BaseObject<ActorTypes> {
	preferredUsername?: string
	inbox: ObjectReference<OrderedCollection>
	outbox: ObjectReference<OrderedCollection>
	following?: ObjectReference<Collection<Actor>>
	followers?: ObjectReference<Collection<Actor>>
}
