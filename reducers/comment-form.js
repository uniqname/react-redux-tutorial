import { uniqueBy } from '../utils';

import {
    AUTHOR_CHANGE,
    TEXT_CHANGE,
    RECIEVE_POST_COMMENT
} from '../actions/action-types';

export default (state={
    author: '',
    text: ''
}, action) => {
    switch (action.type) {
        case AUTHOR_CHANGE:
        return {
            ...state,
            author: action.author
        };

        case TEXT_CHANGE:
        return {
            ...state,
            text: action.text
        };

        case RECIEVE_POST_COMMENT:
        return {
            ...state,
            text: ''
        }

        default:
        return state;
    }
};
