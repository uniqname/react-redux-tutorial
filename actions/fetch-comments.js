// import { FETCH_COMMENTS } from '../actions/action-types';
import requestComments from './request-comments';
import recieveComments from './recieve-comments';
import fetchFail from './fetch-fail';

//addComment
export default (url) => (dispatch, getState) => {
    dispatch(requestComments());
    return fetch(url)
        .then(result => result.ok ? result : Promise.reject(result) )
        .then(result => result.json())
        .then(comments => dispatch(recieveComments(comments)))
        .catch(error => dispatch(fetchFail(error)));
};
