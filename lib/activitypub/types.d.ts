import type {
	BaseObject,
	ActorTypes,
	ObjectReference,
	OrderedCollection,
	Collection,
} from '../activitystreams/types'

/** @see https://w3id.org/security/v1 */
export interface SecPublicKey {
	id?: string
	owner?: string
	publicKeyPem?: string
}

/** @see https://www.w3.org/TR/activitypub/#actor-objects */
export interface Actor extends BaseObject<ActorTypes> {
	preferredUsername?: string
	inbox: ObjectReference<OrderedCollection>
	outbox: ObjectReference<OrderedCollection>
	following?: ObjectReference<Collection<Actor>>
	followers?: ObjectReference<Collection<Actor>>
	publicKey?: SecPublicKey
}
