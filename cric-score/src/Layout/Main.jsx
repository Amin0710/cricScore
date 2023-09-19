import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar></Navbar>
			<div className="flex-grow">
				<Outlet></Outlet>
			</div>
			<div className="mt-auto">
				<Footer></Footer>
			</div>
		</div>
	);
};

export default Main;
