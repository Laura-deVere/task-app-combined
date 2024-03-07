import { useState, useEffect } from "react";

export const useDebouncedValue = (
	initValue: any,
	value: any,
	delay: number
) => {
	const [debouncedValue, setDebouncedValue] = useState<any>(initValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
