export const LINK_TYPES = /** @type {const} */ ([
	'Link',
	'Mention',
])

export const ACTOR_TYPES = /** @type {const} */ ([
	'Application',
	'Group',
	'Organization',
	'Person',
	'Service',
])

export const OBJECT_TYPES = /** @type {const} */ ([
	'Article',
	'Audio',
	'Document',
	'Event',
	'Image',
	'Video',
	'Page',
	'Note',
	'Place',
	'Profile',
	'Relationship',
	'Tombstone',
])

export const INTRANSITIVE_ACTIVITY_TYPES = /** @type {const} */ ([
	'Arrive',
	'Travel',
	'Question',
])

export const TRANSITIVE_ACTIVITY_TYPES = /** @type {const} */ ([
	'Accept',
	'Add',
	'Announce',
	'Block',
	'Create',
	'Delete',
	'Dislike',
	'Flag',
	'Follow',
	'Ignore',
	'Join',
	'Leave',
	'Like',
	'Reject',
	'Remove',
	'Undo',
	'Update',
])

export const TENTATIVE_ACTIVITY_TYPES = /** @type {const} */ ([
	'TentativeReject',
	'TentativeAccept',
])

export const ACTIVITY_TYPES = /** @type {const} */ ([
	...INTRANSITIVE_ACTIVITY_TYPES,
	...TRANSITIVE_ACTIVITY_TYPES,
	...TENTATIVE_ACTIVITY_TYPES,
])
