import { Link } from 'react-router-dom';
import './ActionBar.scss';
import AppButton from './AppButton';
import AppIcon from './AppIcon';

function ActionBar({ page, suggestionCount }: { page: 'suggestion' | 'roadmap'; suggestionCount?: number }) {
	return (
		<div className="action-bar">
			{page === 'suggestion' ? (
				<>
					<AppIcon name="bulb" size={28} color="white" />
					<h1>{suggestionCount} Suggestions</h1>
					<span>Sort by : Most Upvotes</span>
				</>
			) : (
				<div>
					<AppIcon name="chevron" size={12} color="white" />
					<Link to="/">Go Back</Link>
					<h2>Roadmap</h2>
				</div>
			)}
			<AppButton icon="plus" to="/feedback" type="primary" label="Add Feedback" />
		</div>
	);
}

export default ActionBar;
