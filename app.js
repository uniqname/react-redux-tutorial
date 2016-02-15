import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import CommentBox from './views/comment-box.container';
import Comments from './views/comments.container';
import App from './views/app.container';
import reducer from './reducers/index';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router'

// import comments from './mocks/comments';

import fetchComments from './actions/fetch-comments';
import updateNav from './actions/update-nav';

const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)


const store = applyMiddleware(
                thunk,
                reduxRouterMiddleware
            )(createStore)(reducer);



//prime the store
store.dispatch( fetchComments('/api/comments') );

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path path="/" component={App}>
                <IndexRoute component={ CommentBox } />
                <Route path="comments/:commentID" component={ Comments } />
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#content')
);
