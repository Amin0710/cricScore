/* eslint-disable react/prop-types */
import Modal from "react-modal";

const ScoreboardModal = ({
	isOpen,
	onRequestClose,
	oversHistory,
	handleChangeScoreClick,
	setSelectedOverForChange,
	selectedOverForChange,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			ariaHideApp={false}
			className="flex items-center justify-center"
			style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}>
			<div className="mt-5 mx-2 bg-white rounded text-black p-4 max-w-xl w-full">
				<h1 className="text-4xl text-center text-gray-800 mb-3">Scoreboard</h1>
				<div className="max-h-[60vh] overflow-y-auto">
					<table className="min-w-full border-collapse">
						<thead>
							<tr>
								<th className="border p-2  w-1/4">Over</th>
								<th className="border p-2  w-3/4">Score</th>
							</tr>
						</thead>
						<tbody>
							{oversHistory.map((overScores, overIndex) => {
								const bgColorClass =
									overIndex % 2 === 0 ? "bg-gray-300" : "bg-white";
								return (
									<tr key={overIndex} className={`${bgColorClass}`}>
										<td className="border p-2  w-1/4">Over {overIndex + 1}</td>
										<td className="border p-2  w-3/4">
											{overScores.join(" - ")}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="mt-5 text-white flex justify-between">
					<div className="max-w-[70%]">
						<select
							id="changeOverInput"
							className="border p-2 mr-2 max-w-[70%]"
							value={selectedOverForChange || ""}
							onChange={(e) =>
								setSelectedOverForChange(Number(e.target.value))
							}>
							<option value="" disabled>
								Select an Over
							</option>
							{Array.from({ length: oversHistory.length || 0 }, (_, index) => (
								<option key={index} value={index + 1}>
									{index + 1}
								</option>
							))}
						</select>
						<select id="changeBallInput" className="border p-2 mr-2 ">
							{selectedOverForChange &&
								Array.from(
									{
										length: oversHistory[selectedOverForChange - 1].length || 1,
									},
									(_, index) => (
										<option key={index} value={index + 1}>
											{index + 1}
										</option>
									)
								)}
						</select>
					</div>

					<button
						style={{ height: "41px" }}
						className="btn text-white bg-[#655CC9] border-0 rounded px-2"
						onClick={handleChangeScoreClick}>
						Change Score
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ScoreboardModal;
