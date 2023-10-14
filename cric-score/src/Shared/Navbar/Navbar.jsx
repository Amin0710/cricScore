import { Link } from "react-router-dom";
import menu from "../../assets/menu.png";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
	const [isMenuClose, setIsMenuClose] = useState(true);

	const isMobile = window.innerWidth < 768;

	const toggleMenu = () => {
		setIsMenuClose((prevState) => !prevState);
	};

	const menuRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				!isMenuClose &&
				menuRef.current &&
				!menuRef.current.contains(event.target)
			) {
				setIsMenuClose(true);
			}
		};

		if (!isMenuClose) {
			document.addEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isMenuClose]);

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

				<div ref={menuRef} className="sm:hidden absolute top-0 right-0 p-1">
					<img src={menu} alt="" className="w-10 h-10" onClick={toggleMenu} />
				</div>

				<div
					className={`${
						isMobile
							? "absolute top-10 right-0 bg-[#661AE6] p-2 z-10"
							: "flex align-middle justify-center"
					} ${isMobile && isMenuClose ? " hidden" : " rounded"}`}>
					<ul
						className={`${isMobile ? "" : "menu menu-horizontal px-1"} ${
							isMobile && !isMenuClose ? "" : "hidden"
						}`}>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/faq">FAQ</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
