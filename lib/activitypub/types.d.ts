import type {
	BaseObject,
	ActorTypes,
	ObjectTypes,
	ActivtyTypes,
	Collection,
	OrderedCollection,
} from '../activitystreams/types'

/** @see https://w3id.org/security/v1 */
export interface SecPublicKey {
	id: string
	owner: string
	publicKeyPem: string
}

export type AnyCollection<T> = OrderedCollection<T> | Collection<T>

export type ActorCollection = AnyCollection<ActorTypes>
export type ActivityEndpoint = OrderedCollection<ActivtyTypes>

/** @see https://www.w3.org/TR/activitypub/#actor-objects */
export interface Actor extends BaseObject<ActorTypes> {
	/**
	 * A short username which may be used to refer to the actor, with no uniqueness guarantees.
	 */
	preferredUsername?: string

	/** @see https://www.w3.org/TR/activitypub/#inbox */
	inbox: string | ActivityEndpoint

	/** @see https://www.w3.org/TR/activitypub/#outbox */
	outbox: string | ActivityEndpoint

	/** @see https://www.w3.org/TR/activitypub/#following */
	following?: string | ActorCollection

	/** @see https://www.w3.org/TR/activitypub/#followers */
	followers?: string | ActorCollection

	/** @see https://www.w3.org/TR/activitypub/#liked */
	liked?: string | AnyCollection<ObjectTypes>

	endpoints?: {
		/** @see https://www.w3.org/TR/activitypub/#shared-inbox-delivery */
		sharedInbox?: string
	}

	/** @see https://www.w3.org/TR/activitypub/#authorization */
	publicKey?: Partial<SecPublicKey>
}
