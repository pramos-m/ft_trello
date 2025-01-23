import { useRef, useEffect } from "react";

function	useClickOutside(cb) {
	const	ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref && ref.current && !ref.current.contains(event.target)) {
			cb(event);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return ref;
}

export default useClickOutside;
