import { useState } from 'react';
import FeedbackCard, { Feedback } from '../components/FeedbackCard';
import ActionBar from '../components/ActionBar';

import './Suggestions.scss';
import StatusIndicator, { Status } from '../components/StatusIndicator';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import AppButton from '../components/AppButton';
import ImageNotFound from '../assets/not-found.png';

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function Suggestions() {
	const categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
	const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
	console.log(import.meta.env.VITE_API_URL)
	const { data: feedbacks } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get<Feedback[]>(`${apiUrl}/feedback?status=suggestion`);
			return data;
		},
		initialData: [],
	});
	const { data: status } = useQuery({
		queryKey: ['feedback/info'],
		queryFn: async () => {
			const { data } = await axios.get(`${apiUrl}/feedback/info`);
			return data as { suggestion: number; planned: number; 'in-progress': number; live: number };
		},
		initialData: {
			suggestion: 0,
			planned: 0,
			'in-progress': 0,
			live: 0,
		},
	});

	return (
		<main id="suggestion">
			<aside>
				<div className="title-board">
					<h2>Eqaim</h2>
					<h3>Feedback Board</h3>
				</div>
				<div className="category-board">
					{categories.map((category, index) => (
						<button key={category} className={`category-option ${index == activeCategoryIndex ? 'active' : ''}`} onClick={() => setActiveCategoryIndex(index)}>
							{category}
						</button>
					))}
				</div>
				<div className="roadmap-board">
					<h2>Roadmap</h2>
					<Link to="/roadmap">View</Link>
					{Object.entries(status!).map(([type, count]) => type !== 'suggestion' && <StatusIndicator key={type} type={type as Status} count={count} />)}
				</div>
			</aside>
			<section>
				<ActionBar page="suggestion" suggestionCount={status!.suggestion} />
				{!feedbacks || !feedbacks?.length ? (
					<div className="empty-state">
						<img src={ImageNotFound} alt="not found" />
						<h1>There is no feedback yet.</h1>
						<p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
						<AppButton label="Add Feedback" icon="plus" />
					</div>
				) : (
					<div className="feedbacks">
						{feedbacks
							.filter(({ category }) => (activeCategoryIndex == 0 ? true : categories[activeCategoryIndex].toLowerCase() === category.toLowerCase()))
							.map(({ id, title, status, description, category, upvotes, commentCount }) => (
								<FeedbackCard
									key={id}
									id={id}
									status={status}
									title={title}
									description={description}
									category={category}
									upvotes={upvotes}
									commentCount={commentCount}
								/>
							))}
					</div>
				)}
			</section>
		</main>
	);
}

export default Suggestions;
