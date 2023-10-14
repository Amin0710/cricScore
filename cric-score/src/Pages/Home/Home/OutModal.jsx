/* eslint-disable react/prop-types */
import Modal from "react-modal";
const RunOutModal = ({
	isOpen,
	onRequestClose,
	handleConfirmWicket,
	dismissalAwardedTo,
	setDismissalAwardedTo,
	errorWicketAwarded,
}) => {
	const handleDismissalAwardedTo = (buttonId) => {
		setDismissalAwardedTo(buttonId);
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			ariaHideApp={false}
			className="flex items-center justify-center modal-bounce"
			style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)" } }}>
			<div className="mt-5 mx-2 bg-white rounded text-black p-4">
				<h1 className="text-4xl text-center text-gray-800 mb-3">
					Wicket Details
				</h1>
				<h1 className="text-center text-gray-800 mb-3">
					<span className="text-red-500 font-bold">Dismissal Awarded to</span>
				</h1>
				<table className="min-w-full border-collapse mt-2">
					<thead>
						<tr>
							<th className="border p-2 bg-error">Bowler and Team</th>
							<th className="border p-1 bg-error">Team Only</th>
						</tr>
					</thead>
					<tbody className="text-center">
						<tr>
							<td className="border p-2">
								<button
									id="bowlerAwarded"
									className={`px-4 py-2 ${
										dismissalAwardedTo === "bowler"
											? "bg-blue-500 text-white"
											: "bg-white text-blue-500"
									} border border-blue-500 rounded-lg focus:outline-none`}
									onClick={() => handleDismissalAwardedTo("bowler")}>
									Bowled
									<br />
									LBW
									<br />
									Caught
									<br />
									Stumped
								</button>
							</td>
							<td className="border p-2">
								<button
									id="teamAwarded"
									className={`px-4 py-2 ${
										dismissalAwardedTo === "team"
											? "bg-blue-500 text-white"
											: "bg-white text-blue-500"
									} border border-blue-500 rounded-lg focus:outline-none`}
									onClick={() => handleDismissalAwardedTo("team")}>
									Hit Wicket
									<br />
									Handled the Ball
									<br />
									Obstructing the Field
									<br />
									Hit the Ball Twice
									<br />
									Retired Out
									<br />
									Timed Out
								</button>
							</td>
						</tr>
						<tr>
							<td className="border p-2" colSpan="2">
								<button
									id="noneAwarded"
									className={`px-4 py-2 ${
										dismissalAwardedTo === "none"
											? "bg-blue-500 text-white"
											: "bg-white text-blue-500"
									} border border-blue-500 rounded-lg focus:outline-none`}
									onClick={() => handleDismissalAwardedTo("none")}>
									None: Retired Hurt
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				{errorWicketAwarded && (
					<p className="text-red-500 text-center my-2 font-bold">
						{errorWicketAwarded}
					</p>
				)}
				<div className="flex justify-center mt-5">
					<button
						style={{ height: "41px" }}
						className="btn text-white bg-[#655CC9] border-0 rounded px-2"
						onClick={handleConfirmWicket}>
						Wicket !!!
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default RunOutModal;
