import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router'

import comments from './comments';
import commentForm from './comment-form';
import nav from './nav';
// import route from './routes';

export default combineReducers({
    nav,
    comments,
    commentForm,
    routing: routeReducer
});
