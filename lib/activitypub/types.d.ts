import type {
	CoreLink,
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

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mention */
export interface MentionLink extends CoreLink<'Mention'> {
}

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

	/** @see https://www.w3.org/TR/activitypub/#streams-property */
	streams?: AnyCollectionRef<string>[]

	/** @see https://www.w3.org/TR/activitypub/#endpoints */
	endpoints?: {
		[key: string]: string | URL | undefined

		/** @see https://www.w3.org/TR/activitypub/#shared-inbox-delivery */
		sharedInbox?: string | URL
	}

	/** @see https://www.w3.org/TR/activitypub/#authorization */
	publicKey?: SecurityKey

	/** @see https://www.w3.org/wiki/Activity_Streams_extensions#as:alsoKnownAs_property */
	alsoKnownAs?: (string | URL)[]

	/** @see https://www.w3.org/wiki/Activity_Streams_extensions#as:manuallyApprovesFollowers */
	manuallyApprovesFollowers?: boolean

	/** @see https://docs.joinmastodon.org/spec/activitypub/#discoverable */
	discoverable?: boolean

	/** @see https://docs.joinmastodon.org/spec/activitypub/#suspended */
	suspended?: boolean

	/** @see https://docs.joinmastodon.org/spec/activitypub/#featured */
	featured?: AnyCollectionRef<ExtendedObjectTypes>

	/** @see https://docs.joinmastodon.org/spec/activitypub/#featuredTags */
	featuredTags?: AnyCollectionRef<'Hashtag'>

	/** @see https://misskey-hub.net/ns.html#iscat */
	isCat?: boolean
}

export * from './activityTypes'
export * from './objectTypes'
