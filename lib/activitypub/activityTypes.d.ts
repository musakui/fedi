import type {
	CoreActivity,
	QuestionActivity,
	ExtendedActivityTypes,
} from '../activitystreams/types'

/** @see https://www.w3.org/TR/activitypub/#create-activity-inbox */
export interface CreateActivity extends CoreActivity<'Create'> {
}

/** @see https://www.w3.org/TR/activitypub/#update-activity-inbox */
export interface UpdateActivity extends CoreActivity<'Update'> {
}

/** @see https://www.w3.org/TR/activitypub/#delete-activity-inbox */
export interface DeleteActivity extends CoreActivity<'Delete'> {
}

/** @see https://www.w3.org/TR/activitypub/#follow-activity-inbox */
export interface FollowActivity extends CoreActivity<'Follow'> {
}

/** @see https://www.w3.org/TR/activitypub/#accept-activity-inbox */
export interface AcceptActivity extends CoreActivity<'Accept'> {
}

/** @see https://www.w3.org/TR/activitypub/#reject-activity-inbox */
export interface RejectActivity extends CoreActivity<'Reject'> {
}

/** @see https://www.w3.org/TR/activitypub/#add-activity-inbox */
export interface AddActivity extends CoreActivity<'Add'> {
}

/** @see https://www.w3.org/TR/activitypub/#remove-activity-inbox */
export interface RemoveActivity extends CoreActivity<'Remove'> {
}

/** @see https://www.w3.org/TR/activitypub/#like-activity-inbox */
export interface LikeActivity extends CoreActivity<'Like'> {
}

/** @see https://www.w3.org/TR/activitypub/#announce-activity-inbox */
export interface AnnounceActivity extends CoreActivity<'Announce'> {
}

/** @see https://www.w3.org/TR/activitypub/#block-activity-inbox */
export interface BlockActivity extends CoreActivity<'Block'> {
}

/** @see https://www.w3.org/TR/activitypub/#undo-activity-inbox */
export interface UndoActivity extends CoreActivity<'Undo'> {
	/** Activity to Undo */
	object?: string | URL | CoreActivity<ExtendedActivityTypes>
}

export type ActivityPubActivity = AnnounceActivity
	| AddActivity
	| RemoveActivity
	| CreateActivity
	| UpdateActivity
	| DeleteActivity
	| FollowActivity
	| AcceptActivity
	| RejectActivity
	| BlockActivity
	| LikeActivity
	| UndoActivity
	| QuestionActivity
