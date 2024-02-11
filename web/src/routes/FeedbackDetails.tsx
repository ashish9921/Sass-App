import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

import AppButton from '../components/AppButton';
import CommentBox from '../components/CommentBox';
import FeedbackCard, { Feedback } from '../components/FeedbackCard';
import TextField from '../components/Form/TextField';
import './FeedbackDetails.scss';
import AppIcon from '../components/AppIcon';

interface Comment {
	id: number;
	content: string;
	user: {
		image: string;
		name: string;
		username: string;
	};
}

interface FeedbackDetails extends Omit<Feedback, 'commentCount'> {
	comments: Comment[];
}

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function FeedbackDetails() {
	const { id } = useParams();

	const { data: feedback } = useQuery({
		queryFn: async () => {
			if (id == undefined) return;

			const { data } = await axios.get(`${apiUrl}/feedback/${id}`);
			return data as FeedbackDetails;
		},
	});

	return (
		<main id="feedback-details">
			<section className="action-bar">
				<AppIcon name="chevron" size={12} color="#4661E6" />
				<Link to="/">Go Back</Link>
				<AppButton to={`/feedback/${id}`} label="Edit Feedback" />
			</section>
			{feedback && (
				<FeedbackCard
					id={feedback.id}
					title={feedback.title}
					status={feedback.status}
					description={feedback.description}
					category={feedback.category}
					upvotes={feedback.upvotes}
					commentCount={feedback.comments?.length ?? 0}
				/>
			)}
			<section className="comments">
				<h3>{feedback ? feedback.comments?.length : 0} Comments</h3>
				{feedback &&
					feedback.comments?.map(({ id, user, content }) => (
						<CommentBox key={id} image={user.image} name={user.name} username={user.username} content={content} />
					))}
			</section>
			<section className="comment-box">
				<h3>Add Comment</h3>
				<TextField name="comment" inline={false} placeholder="Type your comment here" />
				<div>
					<span>250 Characters left</span>
					<AppButton label="Post Comment" />
				</div>
			</section>
		</main>
	);
}

export default FeedbackDetails;
