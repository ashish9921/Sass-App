import { Route, Routes } from 'react-router-dom';

import Suggestions from './routes/Suggestions';
import Roadmap from './routes/Roadmap';
import FeedbackDetails from './routes/FeedbackDetails';
import FeedbackType from './routes/Feedback';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Suggestions />} />
			<Route path="/roadmap" element={<Roadmap />} />
			<Route path="/details/:id" element={<FeedbackDetails />} />
			<Route path="/feedback" element={<FeedbackType />} />
			<Route path="/feedback/:id" element={<FeedbackType />} />
		</Routes>
	);
}

export default App;
