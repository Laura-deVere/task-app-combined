import { useRef, useEffect } from "react";

const useDebounce = () => {
	const timeout = useRef<any>(null);

	const debouncedCallback =
		(func: Function, delay: number) =>
		(...args: any) => {
			clearTimeout(timeout.current);
			timeout.current = setTimeout(() => func(...args), delay);
		};

	useEffect(() => {
		return () => {
			clearTimeout(timeout.current);
		};
	}, []);

	return { debouncedCallback };
};

export default useDebounce;
