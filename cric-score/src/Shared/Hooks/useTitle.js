import { useEffect } from "react";

const useTitle = (title) => {
	useEffect(() => {
		document.title = `CricScore | ${title}`;
	}, [title]);
};

export default useTitle;
