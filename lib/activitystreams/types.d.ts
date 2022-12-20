import { Collection, OrderedCollection } from './coreTypes'

export type AnyCollection<T extends string> = OrderedCollection<T> | Collection<T>

export {
	CoreLink,
	CoreObject,
	Collection,
	CollectionPage,
	OrderedCollection,
	OrderedCollectionPage,
	CoreActivity,
	CoreIntransitiveActivity,
} from './coreTypes'

export {
	LinkTypes,
	ActorTypes,
	ExtendedObjectTypes,
	ExtendedActivityTypes,
	TransitiveActivityTypes,
	IntransitiveActivityTypes,
	Question,
	Place,
	Profile,
	Tombstone,
	Relationship,
} from './extendedTypes'
