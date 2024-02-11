import { useState } from 'react';
import './TextField.scss';

function TextField({ inline = true, name, placeholder = '', value }: { inline?: boolean; name: string; placeholder?: string; value?: string }) {
	const [inputValue, setInputValue] = useState(value ?? '');

	function onInput(value: string) {
		setInputValue(value);
	}

	return inline ? (
		// @ts-ignore
		<input name={name} className="text-field" placeholder={placeholder} value={inputValue} onInput={(e) => onInput(e.target.value)} />
	) : (
		// @ts-ignore
		<textarea name={name} className="text-field" placeholder={placeholder} value={inputValue} onInput={(e) => onInput(e.target.value)} />
	);
}

export default TextField;
