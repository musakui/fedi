import {
	ObjectRef,
	ObjectRefs,
	CoreObject,
	CoreIntransitiveActivity,
} from './coreTypes'

import {
	LINK_TYPES,
	ACTOR_TYPES,
	OBJECT_TYPES,
	TRANSITIVE_ACTIVITY_TYPES,
	INTRANSITIVE_ACTIVITY_TYPES,
} from './extended.js'

type CoreRef = string | URL | CoreObject<string>

/** @see https://www.w3.org/TR/activitystreams-core/#link */
export type LinkTypes = typeof LINK_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#actors */
export type ActorTypes = typeof ACTOR_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#object */
export type ExtendedObjectTypes = typeof OBJECT_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#activities */
export type TransitiveActivityTypes = typeof TRANSITIVE_ACTIVITY_TYPES[number]

/** @see https://www.w3.org/TR/activitystreams-core/#intransitiveactivities */
export type IntransitiveActivityTypes = typeof INTRANSITIVE_ACTIVITY_TYPES[number]

export type ExtendedActivityTypes = TransitiveActivityTypes | IntransitiveActivityTypes

interface BaseQuestion extends CoreIntransitiveActivity<'Question'> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-closed */
	closed?: boolean | Date | ObjectRef<string>
}

interface SingleChoiceQuestion extends BaseQuestion {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-oneof */
	oneOf: ObjectRefs
	anyOf?: never
}

interface MultiChoiceQuestion extends BaseQuestion {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-anyof */
	anyOf: ObjectRefs
	oneOf?: never
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-question */
export type Question = SingleChoiceQuestion | MultiChoiceQuestion

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-relationship */
export interface Relationship extends CoreObject<'Relationship'> {
	relationship?: CoreRef

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-subject */
	subject?: ObjectRef<string>

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-object-term */
	object?: ObjectRefs
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-profile */
export interface Profile extends CoreObject<'Profile'> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-describes */
	describes?: CoreRef
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-place */
export interface Place extends CoreObject<'Place'> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-accuracy */
	accuracy?: Number

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-altitude */
	altitude?: Number

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-latitude */
	latitude?: Number

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-longitude */
	longitude?: Number

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-radius */
	radius?: Number

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-units */
	units?: string
}

/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tombstone */
export interface Tombstone extends CoreObject<'Tombstone'> {
	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-formertype */
	formerType?: string | string[]

	/** @see https://www.w3.org/TR/activitystreams-vocabulary/#dfn-deleted */
	deleted?: string | Date
}
