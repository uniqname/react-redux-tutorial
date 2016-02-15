import styles from './comment-form.css';

//CommentForm
export default ({
    onCommentSubmit=()=>{},
    onAuthorChange=()=>{},
    onTextChange=()=>{},
    author,
    text,
}) => (
    <form className={styles.form}
          onSubmit={ (e) => {
              e.preventDefault();
              onCommentSubmit(e.target.elements.author.value, e.target.elements.text.value);
          }}
    >
        <input type="text"
               className={styles.author}
               name="author"
               placeholder="Your name"
               value={ author }
               onChange={ (e) =>
                   onAuthorChange(e.target.value) }

        />
        <input type="text"
               className={styles.text}
               name="text"
               placeholder="Say something..."
               value={ text }
               onChange={ (e) =>
                   onTextChange(e.target.value) }
        />
        <button className={styles.submit}>Post</button>
    </form>
);
