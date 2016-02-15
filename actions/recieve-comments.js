import {RECIEVE_COMMENTS} from '../actions/action-types';

export default (comments) => ({
    type: RECIEVE_COMMENTS,
    comments
});
