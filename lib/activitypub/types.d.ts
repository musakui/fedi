import type {
	CoreObject,
	ActorTypes,
	AnyCollection,
	OrderedCollection,
	ExtendedObjectTypes,
	ExtendedActivityTypes,
} from '../activitystreams/types'

/** @see https://w3c-ccg.github.io/security-vocab/#Key */
export interface SecurityKey {
	id?: string | URL

	/** @see https://w3c-ccg.github.io/security-vocab/#owner */
	owner?: string | URL

	/** @see https://w3c-ccg.github.io/security-vocab/#publicKeyPem */
	publicKeyPem: string
}

type AnyCollectionRef<T extends string> = string | URL | AnyCollection<T>
type ActivityEndpoint = string | URL | OrderedCollection<ExtendedActivityTypes>

/** @see https://www.w3.org/TR/activitypub/#actor-objects */
export interface ActivityPubActor extends CoreObject<ActorTypes> {
	/** @see https://www.w3.org/TR/activitypub/#preferredUsername */
	preferredUsername?: string

	/** @see https://www.w3.org/TR/activitypub/#inbox */
	inbox: ActivityEndpoint

	/** @see https://www.w3.org/TR/activitypub/#outbox */
	outbox: ActivityEndpoint

	/** @see https://www.w3.org/TR/activitypub/#following */
	following?: AnyCollectionRef<ActorTypes>

	/** @see https://www.w3.org/TR/activitypub/#followers */
	followers?: AnyCollectionRef<ActorTypes>

	/** @see https://www.w3.org/TR/activitypub/#liked */
	liked?: AnyCollectionRef<ExtendedObjectTypes>

	/** @see https://www.w3.org/TR/activitypub/#endpoints */
	endpoints?: {
		[key: string]: string | URL | undefined

		/** @see https://www.w3.org/TR/activitypub/#shared-inbox-delivery */
		sharedInbox?: string | URL
	}

	/** @see https://www.w3.org/TR/activitypub/#authorization */
	publicKey?: SecurityKey
}
