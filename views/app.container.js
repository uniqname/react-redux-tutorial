import { connect } from 'react-redux';

import App from '../components/app';

import postComment from '../actions/post-comment';
import authorChange from '../actions/author-change';
import textChange from '../actions/text-change';

const mapStateToProps = ({ commentForm, comments, errorMessage, nav }) => ({
    commentForm,
    comments,
    errorMessage,
    nav
});

const mapDispatchToProps = (dispatch) => ({
    onCommentSubmit: (author, text) =>
        dispatch(postComment({author, text})),
    onAuthorChange: (author) =>
        dispatch(authorChange(author)),
    onTextChange: (text) =>
        dispatch(textChange(text))
});

//ConnectedApp
export default connect(mapStateToProps, mapDispatchToProps)(App);
