import { connect } from 'react-redux';
import Comments from '../components/comment-list';


const CommentsView = ({routeParams, ...props}) => {
    const filterByID = (id) => (comment) => comment.id === id;
    return (
        <Comments filter={ filterByID(Number(routeParams.commentID)) } { ...props } />
    );
};

const mapStateToProps = ({ comments, ...state }) => ({
    comments: comments.commentList
});

const mapDispatchToProps = (dispatch) => ({
});


//ConnectedCommentBox
export default connect(mapStateToProps, mapDispatchToProps)(CommentsView);
