import { Link } from 'react-router-dom';

import './FeedbackCard.scss';

import { Status } from './StatusIndicator';
import AppIntElem from './AppIntElem';
import AppIcon from './AppIcon';

export interface Feedback {
	id: number;
	title: string;
	description: string;
	category: string;
	status: Status;
	upvotes: number;
	commentCount: number;
}

function FeedbackCard({ id, title, description, category, upvotes, commentCount }: Feedback) {
	return (
		<div className="feedback">
			<AppIntElem label={upvotes} />
			<Link to={`/details/${id}`} className="content">
				<h1>{title}</h1>
				<p>{description}</p>
				<button className="category-option">{category}</button>
			</Link>
			<span className="comment-btn">
				<AppIcon name="comment" size={20} color="#CDD2EE" />
				<span>{commentCount}</span>
			</span>
		</div>
	);
}

export default FeedbackCard;
