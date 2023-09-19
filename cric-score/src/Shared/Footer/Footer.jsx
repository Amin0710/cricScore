const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<div>
			<footer className="footer footer-center p-2 bg-primary text-primary-content">
				<div>
					<p>Copyright © {currentYear} - All right reserved by</p>
					<p className="font-bold">Aminano</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
