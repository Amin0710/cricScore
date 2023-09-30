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
		<Modal isOpen={isOpen} onRequestClose={onRequestClose}>
			<>
				<h1>Scoreboard</h1>
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
				<div className="mt-5 text-white">
					<input
						type="number"
						placeholder="Over"
						id="changeOverInput"
						className="border p-2 mr-2"
						min={oversHistory[selectedOverForChange] ? 1 : 0}
						max={oversHistory.length ? oversHistory.length : 0}
						value={selectedOverForChange || ""}
						onChange={(e) => setSelectedOverForChange(Number(e.target.value))}
					/>
					<input
						type="number"
						placeholder="Ball"
						id="changeBallInput"
						className="border p-2 mr-2"
						min={oversHistory[selectedOverForChange - 1] ? 1 : 0}
						max={
							oversHistory[selectedOverForChange - 1]
								? oversHistory[selectedOverForChange - 1].length
								: 0
						}
					/>
					<button className="btn btn-info" onClick={handleChangeScoreClick}>
						Change Score
					</button>
				</div>
			</>
		</Modal>
	);
};

export default ScoreboardModal;
