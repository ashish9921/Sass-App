import './StatusIndicator.scss';

export type Status = 'planned' | 'in-progress' | 'live' | 'suggestion';

const status = {
	planned: {
		name: 'planned',
		color: '#F49F85',
	},
	'in-progress': {
		name: 'in progress',
		color: '#AD1FEA',
	},
	live: {
		name: 'live',
		color: '#62BCFA',
	},
	suggestion: {
		name: 'suggestion',
		color: 'green',
	},
};

function StatusIndicator({ type, count }: { type: Status; count?: number }) {
	return (
		<>
			<div className="status">
				<span className="indicator" style={{ backgroundColor: status[type].color }} />
				<span className="label">{status[type].name}</span>
			</div>
			{count !== undefined && <span className="count">{count}</span>}
		</>
	);
}

export default StatusIndicator;
