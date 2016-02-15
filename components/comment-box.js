import CommentList from './comment-list';
import CommentForm from './comment-form';
import CommentBox from './comment-box';

//CommentBox
export default ({comments, commentForm, onCommentSubmit, onAuthorChange, onTextChange, nav, props }) => (
    <div className="commentBox">
        <nav links={nav} />
        <h1>Comments</h1>
        <CommentList comments={ comments.commentList }  />

        <CommentForm
            author={ commentForm.author }
            text={ commentForm.text }

            onCommentSubmit={ onCommentSubmit }

            onAuthorChange={ onAuthorChange }

            onTextChange={ onTextChange }
        />
    </div>
);
