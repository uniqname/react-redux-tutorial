import Comment from './comment';

//CommentList
export default ({ comments=[], filter=()=>true, id=0}) => (
    <div className="comment__list">
        { comments
            .filter(filter)
            .map(({author, id, text}) => (
                <Comment author={ author } key={id} id={id} link={`/comments/${id}`}>
                    { text }
                </Comment>
            ))
        }
    </div>
);
