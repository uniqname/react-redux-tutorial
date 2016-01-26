let comments = [
    {id: 1, author: "Cory Brown", text: "My 2 scents"},
    {id: 2, author: "Jared Anderson", text: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!"},
    {id: 3, author: "Matt Poulson", text: "It's just a function!"},
    {id: 4, author: "Bruce Campbell", text: "Fish in a tree? How can that be?"}
];

const Comment = (props) => (
    <div className="comment">
        <h2 className="commentAuthor">
            { props.author }
        </h2>
        { props.children }
    </div>
);

const CommentList = function (props, context) {
    return (
    <div className="commentList">
        { props.comments.map(comment => (
            <Comment author={ comment.author } key={comment.id} >
                { comment.text }
            </Comment>
        )) }
    </div>
);};

const CommentForm = (props) => (
    <form className="commentForm"
          onSubmit={ (e) => {
              e.preventDefault();
              props.onCommentSubmit();
          }}
    >
        <input type="text"
               name="author"
               placeholder="Your name"
               value={ props.author }
               onChange={ (e) =>
                   props.onAuthorChange(e.target.value) }

        />
        <input type="text"
               name="text"
               placeholder="Say something..."
               value={ props.text }
               onChange={ (e) =>
                   props.onTextChange(e.target.value) }
        />
        <button>Post</button>
    </form>
);

const { createClass, PropTypes } = React;
const CommentBox = createClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe( () => this.forceUpdate() )
    },
    componentWillUnmount() {
        this.unsubscribe();
    },
    render() {
        const { items, author, text } = this.context.store.getState();
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList comments={ items } />
                <CommentForm
                    author={ author }
                    text={ text }

                    onCommentSubmit={ () =>
                        dispatch(addComment({author, text})) }

                    onAuthorChange={ (author) =>
                        dispatch(authorChange(author)) }

                    onTextChange={ (text) =>
                        dispatch(textChange(text)) }
                />
            </div>
        );
    }
});

const actions = {
    ADD_COMMENT:    Symbol('ADD_COMMENT'),
    AUTHOR_CHANGE:  Symbol('AUTHOR_CHANGE'),
    TEXT_CHANGE:     Symbol('TEXT_CHANGE')
};

const addComment = (comment) => ({
    type: actions.ADD_COMMENT,
    comment
});

const authorChange = (author) => ({
    type: actions.AUTHOR_CHANGE,
    author
});

const textChange = (text) => ({
    type: actions.TEXT_CHANGE,
    text
});

const commentsReducer = (state={
    items:[],
    author:'',
    text: ''
}, action) => {
    switch (action.type) {
        case actions.ADD_COMMENT:
        return {
            ...state,
            items: [...state.items, {id: Math.random(), ...action.comment}]
        };

        case actions.AUTHOR_CHANGE:
        return {
            ...state,
            author: action.author
        };

        case actions.TEXT_CHANGE:
        return {
            ...state,
            text: action.text
        };

        default:
        return state;

    }
};

const { createStore } = Redux;
const store = createStore(commentsReducer);
const { getState, dispatch } = store;
comments.map(comment => dispatch( addComment(comment) ));
console.log(getState());


const { Provider } = ReactRedux;
ReactDOM.render(
    <Provider store={ store }>
        <CommentBox />
    </Provider>,
    document.querySelector('#content')
);
