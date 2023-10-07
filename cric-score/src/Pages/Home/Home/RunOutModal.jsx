/* eslint-disable react/prop-types */
import Modal from "react-modal";
const RunOutModal = ({
	isOpen,
	onRequestClose,
	runoutBye,
	handleRunoutByeChange,
	handleConfirmRunout,
	activeNewBatsmanSide,
	setActiveNewBatsmanSide,
}) => {
	const handleNewBatsmanSide = (buttonId) => {
		setActiveNewBatsmanSide(buttonId);
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			ariaHideApp={false}
			className="flex items-center justify-center"
			style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)" } }}>
			<div className="mt-5 mx-2 bg-white rounded text-black p-4 ">
				<h1 className="text-4xl text-center text-gray-800 mb-3">
					Runout Details
				</h1>
				<h1 className="text-center text-gray-800 mb-3">
					This is really important for record keeping, <br />
					<span className="text-red-500 font-bold">choose carefully!</span>
				</h1>
				<table className="min-w-full border-collapse mt-2">
					<thead>
						<tr>
							<th className="border p-2">
								Which side did the new batsman arrive on?
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border p-2" colSpan="3">
								<div className="flex justify-around gap-5">
									<button
										id="keeperSide"
										className={`px-4 py-2 ${
											activeNewBatsmanSide === "keeperSide"
												? "bg-blue-500 text-white"
												: "bg-white text-blue-500"
										} border border-blue-500 rounded-lg focus:outline-none`}
										onClick={() => handleNewBatsmanSide("keeperSide")}>
										Keeper side
									</button>
									<button
										id="bowlerSide"
										className={`px-4 py-2 ${
											activeNewBatsmanSide === "bowlerSide"
												? "bg-blue-500 text-white"
												: "bg-white text-blue-500"
										} border border-blue-500 rounded-lg focus:outline-none`}
										onClick={() => handleNewBatsmanSide("bowlerSide")}>
										Bowler side
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<table className="min-w-full border-collapse my-2">
					<thead>
						<tr>
							<th className="border p-1">Bye run?</th>
							<th className="border p-1">Runs before runout</th>
							<th className="border p-1">Wide/NO Ball?</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border p-1 flex">
								<select
									id="runoutByeDropdown"
									value={runoutBye}
									onChange={handleRunoutByeChange}
									className="dropdown bg-gray-200 p-1 m-1 rounded">
									<option value="0">No</option>
									<option value="bye">Yes, Bye</option>
								</select>
							</td>
							<td className="border p-1 ">
								<select
									id="runoutRunsDropdown"
									className="dropdown bg-gray-200 p-1 m-1 rounded">
									<option value="0" disabled={runoutBye === "bye"}>
										0
									</option>
									<option value="1" selected={runoutBye === "bye"}>
										1
									</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</td>
							<td className="border p-1">
								<select
									id="runoutWideNoDropdown"
									className="dropdown bg-gray-200 p-1 m-1 rounded">
									<option value="0">None</option>
									<option value="wide">Wide</option>
									<option value="noball">No Ball</option>
								</select>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="flex justify-center">
					<button
						style={{ height: "41px" }}
						className="btn text-white bg-[#655CC9] border-0 rounded px-2"
						onClick={handleConfirmRunout}>
						Change Score
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default RunOutModal;
