import Comment from './comment';

//CommentList
export default ({ comments=[], filter=()=>true}) => (
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
