
import './style.css';

export const PostCard = ({title, body ,cover ,id}) => {
    return (
        <div className="postCard">
            <img src={cover} alt={title} />
            <div className="post-contents">
                <h2 >{title}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
}