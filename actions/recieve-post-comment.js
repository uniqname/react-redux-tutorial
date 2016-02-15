import { RECIEVE_POST_COMMENT } from '../actions/action-types';

export default (comment) => ({
    type: RECIEVE_POST_COMMENT,
    comment
});
