import styles from './comments.css';
//Comment Component
export default ({author, children, id, link, ...props}) => {
    return (
    <article className={styles.comment}>
        { link
            ? <a href={link} className={styles.text}>{ children }</a>
            : <p className={styles.text}>{ children }</p>
        }
        <a className={styles.author} href={`/author/`}>{ author }</a>
    </article>
)};
