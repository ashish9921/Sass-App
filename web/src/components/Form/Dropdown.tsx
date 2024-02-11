import './Dropdown.scss';

function Dropdown({ name }: { name: string }) {
	return (
		<select name={name} className="dropdown">
			<option>Option 1</option>
			<option>Option 2</option>
		</select>
	);
}

export default Dropdown;
