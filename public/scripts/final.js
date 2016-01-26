(() => {
      // To get started with this tutorial running your own code, simply remove
      // the script tag loading scripts/example.js and start writing code here.




    // api/comments
    let comments = [
        {id: 1, author: "Cory Brown", text: "My 2 scents"},
        {id: 2, author: "Jared Anderson", text: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!"},
        {id: 3, author: "Matt Poulson", text: "It's just a function!"}
    ];




    // // reducers/rootReducer.js
    const reducers = ( () => {

        const commentsReducer = ( state={
            items: [],
            isFetching: false,
            isPosting: false,
            postFailMessage: '',
            author: '',
            text: ''
        }, action) => {

            console.log(`${action.type}: `, action);
            switch (action.type) {
                case 'ADD_COMMENT':
                return {
                    ...state,
                    comments: state.items.concat({ ...action.comment })
                };

                case 'RECIEVED_COMMENTS':
                return {
                    ...state,
                    isFetching: false,
                    items: Array.from(
                        new Set([...action.comments,
                                 ...state.items]
                            .map(item => item.id)
                        )
                    ).map(item => action.comments.find(c => c.id === item))
                    .filter(items => !!items)
                };

                case 'REQUEST_COMMENTS':
                return {
                    ...state,
                    isFetching: true
                };

                case 'REQUEST_COMMENTS_FAILED':
                return {
                    ...state,
                    isFetching: false
                };

                case 'DELETE_COMMENT':
                return {
                    ...state,
                    comments: state.items
                                .filter(comment => comment.id !== action.id)
                };

                case 'AUTHOR_CHANGE':
                return {
                    ...state,
                    author: action.author
                };

                case 'TEXT_CHANGE':
                return {
                    ...state,
                    text: action.text
                };

                case 'SEND_SUBMIT':
                return {
                    ...state,
                    isPosting: true
                };

                case 'SUBMIT_SUCCESS':
                return {
                    ...state,
                    isPosting: false,
                    postFailMessage: '',
                    text: ''
                };

                case 'SUBMIT_FAIL':
                return {
                    ...state,
                    isPosting: false,
                    postFailMessage: action.err.message || action.err
                };

                default:
                return state;
            }
        };

        return { commentsReducer };

    })();

    //actionCreators.js
    const actionCreators = ( () => {

            const addComment = comment => ({
                type: 'ADD_COMMENT',
                comment: {...comment}
            });

            const requestComments = () => ({
                type: 'REQUEST_COMMENTS'
            });

            const recievedComments = comments => ({
                type: 'RECIEVED_COMMENTS',
                comments
            });

            const requestCommentsFailed = err => ({
                type: 'REQUEST_COMMENTS_FAILED',
                err
            });

            const sendSubmit = () => ({
                type: 'SEND_SUBMIT'
            });

            const submitFailed = (err) => ({
                type: 'SUBMIT_FAIL',
                err
            });

            const submitSuccess = (url) => (dispatch) => {
                dispatch(fetchComments(url));

                return dispatch({
                    type: 'SUBMIT_SUCCESS'
                });
            };

            const fetchComments = (url) => (dispatch) => {
                dispatch(requestComments());

                return fetch(url)
                    .then(resp => resp.ok ? resp : Promise.reject(resp))
                    .then(resp => resp.json())
                    .then(comments => dispatch(recievedComments(comments)))
                    .catch(err => dispatch(requestCommentsFailed(err)))
            };

            const submitComment = (url, author, text) => (dispatch) => {
                dispatch(sendSubmit());

                return fetch(url, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({author, text})
                })
                    .then(resp => resp.ok ? resp : Promise.reject(resp.json()))
                    .then(resp => resp.json())
                    .then(data => dispatch(submitSuccess(url)))
                    .catch(err => dispatch(submitFailed(err)))
            };

            const authorChange = (author) => ({
                type: 'AUTHOR_CHANGE',
                author
            });

            const textChange = (text) => ({
                type: 'TEXT_CHANGE',
                text
            });

            return { addComment,
                    fetchComments,
                    authorChange,
                    textChange,
                    submitComment };
    })();



    // components/CommentBox.js
    const CommentBox = ( () => {

            const { createClass, PropTypes } = React;
            const { fetchComments, authorChange, textChange, submitComment } = actionCreators;

            return createClass({
                contextTypes: {
                    store: PropTypes.object
                },

                pollComments(url, interval) {
                    const { store } = this.context;
                    const { dispatch } = store;

                    let id;
                    if (interval) {
                        id = setInterval(
                            () => dispatch( fetchComments(url) ),
                            interval
                        );
                        this.unPoll = () => clearInterval(id);
                    }
                    dispatch( fetchComments(url) );
                },

                componentDidMount() {
                    const { store } = this.context;

                    this.unPoll = () => {};
                    this.pollComments(this.props.url, this.props.interval);
                    this.unsubscribe = store.subscribe(() => {
                        this.forceUpdate();
                    });
                },

                componentWillUnmount() {
                    this.unPoll();
                    this.unsubscribe();
                },

                render() {
                    const { store } = this.context;
                    const { getState, dispatch } = store;
                    const state = getState();
                    return (
                        <div className="commentBox">
                            <h1>Comments</h1>
                            <CommentList comments={state.items.concat({
                                author: '',
                                text: state.text ? `(${state.author} is typing...)` : '',
                                id: -1
                            }) } />
                            <CommentForm
                                author={state.author}

                                text={state.text}

                                onAuthorChange={ (author) => dispatch(authorChange(author)) }

                                onTextChange={ (text) => dispatch(textChange(text)) }

                                onCommentSubmit={ () => dispatch(submitComment(this.props.url, state.author, state.text)) }
                            />
                        </div>
                    )
                }
            });

    })();




    // components/CommentList.js
    // import CommentsList from 'components/commentsList';
    const CommentList = (props) => (
        <div className="commentList">
            { props.comments.map(comment => (
                <Comment author={ comment.author } key={comment.id} >
                { comment.text }
                </Comment>
            )) }
        </div>
    );





    // components/CommentForm.js
    const CommentForm = (props)  => (
        <form className="commentForm"
                onSubmit={ (e) => {
                    e.preventDefault();
                    props.onCommentSubmit(props.url)
                } }
        >
            <input type="text"
                   placeholder="Your name"
                   value={props.author}
                   onChange={(e) => props.onAuthorChange(e.target.value)}
            />
            <input type="text"
                   placeholder="Say something..."
                   value={props.text}
                   onChange={(e) => {
                           return props.onTextChange(e.target.value)
                       }
                   }

            />
            <button>Post</button>
        </form>
    );





    // components/Comment.js
    const Comment = (props) => (
        <div className="comment">
            <h2 className="commentAuthor">
                { props.author }
            </h2>
            { props.children }
        </div>
    );





    // app.js
    ( () => {
        const { Provider } = ReactRedux;
        // const CommentBox = CommentBox;
        const { createStore, applyMiddleware } = Redux;
        const { commentsReducer } = reducers ;
        const thunk = ReduxThunk;
        const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

        ReactDOM.render(
            <Provider store={ createStoreWithMiddleware(commentsReducer) }>
                <CommentBox url="api/comments" interval={ 5000 }/>
            </Provider>,
            document.querySelector('#content')
        );

    })();

})();
