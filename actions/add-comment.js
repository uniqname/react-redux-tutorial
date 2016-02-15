import { ADD_COMMENT } from '../actions/action-types';

//addComment
export default (comment) => ({
    type: ADD_COMMENT,
    comment
});
