import { uniqueBy } from '../utils/unique-by';


/****
* Import references to action types this reducer will be concerned with
****/
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
//Use default parameters as documentation for that shape of the Redux store.
export default (state={
    commentList:[],
    fetchingComments: false,
    errorMessage: ''
}, action) => {

    /****
    * I've found this useful to have, at least during development
    ****/
    console.log(action.type);

    /****
    * Switches are common for reducers
    * Reducers should remain small and focused on one part of the global state.
    ****/
    switch (action.type) {

        /****
        * Action types should be referenced, not literals.
        * For this reason, it is recommended to use Symbols rather than
        * Strings to remove the tempation to use literals.
        ****/
        case REQUEST_COMMENTS:

        /****
        * Always return a new state for a given action type.
        * Use the Object spread operator (`...state`) to make this easy
        * Anything that comes after it will act as an override.
        ****/
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

        /****
        * Return original state if no recognized action type.
        ****/
        default:
        return state;

    }
};
