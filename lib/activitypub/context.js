import { CONTEXT as AS_CONTEXT } from '../activitystreams/index.js'

export const SECURITY = 'https://w3id.org/security/v1'

export const ACTIVITYSTREAMS = `${AS_CONTEXT}#`

export const AS_EXTENSIONS = {
	Hashtag: 'as:Hashtag',
	movedTo: 'as:movedTo',
	quoteUrl: 'as:quoteUrl',
	sensitive: 'as:sensitive',
	manuallyApprovesFollowers: 'as:manuallyApprovesFollowers',
}

export const FEDIBIRD = {
	fedibird: 'http://fedibird.com/ns#',
	otherSetting: 'fedibird:otherSetting',
}

export const MASTODON = {
	toot: 'http://joinmastodon.org/ns#',
	Emoji: 'toot:Emoji',
	featured: 'toot:featured',
	featuredTags: 'toot:featuredTags',
	discoverable: 'toot:discoverable',
}

export const MISSKEY = {
	misskey: 'https://misskey-hub.net/ns#',
	isCat: 'misskey:isCat',
	_misskey_quote: 'misskey:_misskey_quote',
	_misskey_votes: 'misskey:_misskey_votes',
	_misskey_reaction: 'misskey:_misskey_reaction',
}

export const SCHEMA_ORG = {
	schema: 'http://schema.org#',
	value: 'schema:value',
	PropertyValue: 'schema:PropertyValue',
}

export const VCARD = {
	vcard: 'http://www.w3.org/2006/vcard/ns#',
}
