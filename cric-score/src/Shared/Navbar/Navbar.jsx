// import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../Providers/AuthProvider";
import menu from "../../assets/menu.png";
import { useState } from "react";

const Navbar = () => {
	// const { user, loading } = useContext(AuthContext);

	// const handleMouseOver = () => {
	// 	const userName = document.getElementById("userName");
	// 	userName.classList.remove("invisible");
	// };

	// const handleMouseOut = () => {
	// 	const userName = document.getElementById("userName");
	// 	userName.classList.add("invisible");
	// };

	const [isMenuOpen, setIsMenuOpen] = useState(true);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	let screenWidth = window.innerWidth;

	return (
		<div className="sm:navbar flex items-center justify-center bg-[#661AE6]">
			<div className="container relative">
				<div className="flex-1">
					<div className="flex items-center">
						<Link
							to="/"
							className="btn btn-ghost normal-case text-xl sm:text-5xl">
							<h1 className="block">CricScore</h1>
						</Link>
					</div>
				</div>
				<div className="sm:hidden absolute top-0 right-0 p-1">
					<img src={menu} alt="" className="w-10 h-10" onClick={toggleMenu} />
				</div>
				<div
					className={`${
						screenWidth >= 768
							? "flex align-middle justify-center"
							: "absolute top-10 right-0 bg-[#661AE6] p-2"
					}${isMenuOpen && screenWidth < 768 ? " hidden" : " rounded z-10"}`}>
					<ul
						className={`${
							screenWidth >= 768
								? "menu menu-horizontal px-1"
								: `${isMenuOpen ? "hidden" : ""}`
						}`}>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/faq">FAQ</Link>
						</li>
						{/* <li>
							{loading ? (
								<div className="flex justify-center">
									<button
										className="bg-warning text-white px-4 py-2 rounded-md flex items-center"
										disabled>
										<span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
										<span className="hidden sm:inline">Loading...</span>
									</button>
								</div>
							) : (
								!!user || <Link to="/login">Login</Link>
							)}
						</li> */}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
{
	/* {!!user && (
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div
									className="w-10 rounded-full"
									onMouseOver={handleMouseOver}
									onMouseOut={handleMouseOut}>
									<img src={user?.photoURL || user?.displayName} />
								</div>
								<p className="mt-5 invisible" id="userName">
									{user?.displayName}
								</p>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<Link to="/my_games">My Games</Link>
								</li>
								<li>
									<Link to="/add_game">Add A Game</Link>
								</li>
								<li>
									<button onClick={logOut}>Log Out</button>
								</li>
							</ul>
						</div>
					)} */
}
