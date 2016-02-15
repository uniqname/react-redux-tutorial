import { connect } from 'react-redux';

import CommentBox from '../components/comment-box';

import postComment from '../actions/post-comment';
import authorChange from '../actions/author-change';
import textChange from '../actions/text-change';

const mapStateToProps = ({ commentForm, comments, errorMessage, nav, ...props }) => ({
    commentForm,
    comments,
    errorMessage,
    nav,
    props
});

const mapDispatchToProps = (dispatch) => ({
    onCommentSubmit: (author, text) =>
        dispatch(postComment({author, text})),
    onAuthorChange: (author) =>
        dispatch(authorChange(author)),
    onTextChange: (text) =>
        dispatch(textChange(text))
});

//ConnectedCommentBox
export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
