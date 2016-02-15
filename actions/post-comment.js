// import { FETCH_COMMENTS } from '../actions/action-types';
import requestPostComment from './request-post-comment';
import recievePostComment from './recieve-post-comment';
import addComment from './add-comment';
import fetchFail from './fetch-fail';
import { commentsURL } from '../endpoints';

//addComment
export default ({author, text}) => (dispatch, getState) => {
    dispatch(requestPostComment());
    return fetch(commentsURL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({author, text})
        })
        .then(result => result.ok ? result : Promise.reject(result) )
        .then(result => result.json())
        .then(comment => {
            dispatch(recievePostComment(comment))
            return comment;
        })
        .then(() => dispatch(addComment()))
        .catch(error => dispatch(fetchFail(error)));
};
