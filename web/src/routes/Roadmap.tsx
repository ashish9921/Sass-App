import axios from 'axios';
import { useQuery } from 'react-query';

import './Roadmap.scss';
import ActionBar from '../components/ActionBar';
import RoadmapCard from '../components/RoadmapCard';
import { Feedback } from '../components/FeedbackCard';
import { useState, useEffect } from 'react';

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function Roadmap() {
	const headings = [
		{
			title: 'Planned',
			details: 'Ideas prioritized for research',
			count: 0,
		},
		{
			title: 'In-Progress',
			details: 'Currently being developed',
			count: 0,
		},
		{
			title: 'Live',
			details: 'Released features',
			count: 0,
		},
	];

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

	const { data: roadmapItems } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get(`${apiUrl}/feedback`);

			return data as Feedback[];
		},
	});

	const [screenSm, setScreenSm] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 640) {
			setScreenSm(true);
		} else {
			setScreenSm(false);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	});

	return (
		<main id="roadmap">
			<ActionBar page="roadmap" />
			<div className="board">
				{headings.map(({ title, details }, index) => (
					<div key={title} className="head" style={{ gridColumnStart: index + 1 }}>
						<h2>
							{/* @ts-ignore */}
							{title} ({status[title.toLowerCase()]})
						</h2>
						{!screenSm && <span>{details}</span>}
					</div>
				))}
				{roadmapItems &&
					roadmapItems
						.filter(({ status }) => status !== 'suggestion')
						.map(({ id, status, title, description, category, upvotes, commentCount }) => (
							<RoadmapCard
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
		</main>
	);
}

export default Roadmap;
