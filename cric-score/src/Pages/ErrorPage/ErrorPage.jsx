import { Link } from "react-router-dom";
import fourOfour from "../../assets/404.jpg";
import useTitle from "../../Shared/Hooks/useTitle";

const ErrorPage = () => {
	useTitle("Error Page");
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<h1 className="text-5xl font-bold">Oops!</h1>
				<Link to="/" className="btn btn-primary my-8">
					Back to Home
				</Link>
				<h1 className="text-red-500">আন্তাজে লিখলে এমনই হবে</h1>
				<p>
					Don&apos;t put random things in the URL bar. Just click buttons and it
					will take you to places.
				</p>
				<img src={fourOfour} alt="" className="rounded pt-3" />
			</div>
		</div>
	);
};

export default ErrorPage;
