import { uniqueBy } from '../utils';

import {
    ADD_COMMENT,
    REQUEST_COMMENTS,
    RECIEVE_COMMENTS,
    REQUEST_POST_COMMENT,
    RECIEVE_POST_COMMENT,
    FETCH_FAILED,
    UPDATE_LOCATION
} from '../actions/action-types';


//commentsReducer
export default (state={
    commentList:[],
    fetchingComments: false,
    errorMessage: ''
}, action) => {
    console.log(action.type);
    switch (action.type) {

        case REQUEST_COMMENTS:
        return {
            ...state,
            fetchingComments: true,
            errorMessage: ''
        };

        case RECIEVE_COMMENTS:
        return {
            ...state,
            fetchingComments: false,
            commentList: uniqueBy('id')([ ...state.commentList, ...action.comments ]),
            errorMessage: ''
        };

        case RECIEVE_POST_COMMENT:
        return {
            ...state,
            commentList: uniqueBy('id')([...state.commentList, action.comment]),
            errorMessage: ''
        };

        case FETCH_FAILED:
        console.log('fetch failed: ', action.error);
        return {
            ...state,
            errorMessage: state.errorMessage
        };

        default:
        return state;

    }
};
