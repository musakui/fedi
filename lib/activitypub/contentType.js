import { CONTEXT } from '../activitystreams/index.js'

/** @see https://www.w3.org/TR/json-ld/#application-ld-json */
export const LD_JSON = `application/ld+json`

/** @see https://www.w3.org/TR/activitypub/#retrieving-objects */
export const LD_JSON_ACTIVITYSTREAMS = `${LD_JSON}; profile="${CONTEXT}"`

/** @see https://www.w3.org/TR/activitypub/#retrieving-objects */
export const ACTIVITY_JSON = `application/activity+json`
