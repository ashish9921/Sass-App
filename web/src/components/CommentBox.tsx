import './CommentBox.scss';

interface Comment {
	image: string;
	name: string;
	username: string;
	content: string;
}

function CommentBox({ image, name, username, content }: Comment) {
	return (
		<div className="comment">
			<img src={image} alt={name} />
			<div>
				<h2>{name}</h2>
				<h4>@{username}</h4>
			</div>
			<p>{content}</p>
			<button>Reply</button>
		</div>
	);
}

export default CommentBox;
