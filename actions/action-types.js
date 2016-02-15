// If 3rd party libraries provide action hooks, import them here.
import { UPDATE_LOCATION } from 'redux-simple-router';


//Export all actions an application may be concerned with
export const ADD_COMMENT = Symbol('ADD_COMMENT');
export const AUTHOR_CHANGE = Symbol('AUTHOR_CHANGE');
export const TEXT_CHANGE = Symbol('TEXT_CHANGE');
// export const FETCH_COMMENTS = Symbol('FETCH_COMMENTS');
export const REQUEST_COMMENTS = Symbol('REQUEST_COMMENTS');
export const RECIEVE_COMMENTS = Symbol('RECIEVE_COMMENTS');

export const REQUEST_POST_COMMENT = Symbol('REQUEST_POST_COMMENT');
export const RECIEVE_POST_COMMENT = Symbol('RECIEVE_POST_COMMENT');

export const FETCH_FAILED = Symbol('FETCH_FAILED');

export const UPDATE_NAV_LINKS = Symbol('ADD_NAV_LINKS');

export { UPDATE_LOCATION };
