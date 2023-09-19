import { useState } from "react";
import Swal from "sweetalert2";
import "./ScoreCard.css";

const ScoreCard = () => {
	const [score, setScore] = useState({
		overs: 0,
		balls: 0,
		runs: 0,
		wickets: 0,
	});

	// Initialize score history state
	const [scoreHistory, setScoreHistory] = useState([]);
	const [oversHistory, setOversHistory] = useState([]);
	// const [legalBalls, setLegalBalls] = useState(0);
	const [ballScores, setBallScores] = useState([]);
	const [ballWicket, setBallWicket] = useState([]);
	const [ballWide, setBallWide] = useState([]);
	const [ballNO, setBallNO] = useState([]);

	const handleRuns = (run, wide = false, noBall = false, wicket = 0) => {
		// Push current score to history before updating
		setScoreHistory((prevHistory) => [...prevHistory, score]);
		setBallScores((prevScores) => [...prevScores, run]);

		if (wicket) {
			setBallWicket((prevWickets) => [...prevWickets, true]);
		} else {
			setBallWicket((prevWickets) => [...prevWickets, false]);
		}
		if (wide) {
			setBallWide((ballWides) => [...ballWides, true]);
		} else {
			setBallWide((ballWides) => [...ballWides, false]);
		}
		if (noBall) {
			setBallNO((ballNOs) => [...ballNOs, true]);
		} else {
			setBallNO((ballNOs) => [...ballNOs, false]);
		}

		const extraball = wide || noBall;

		if (!wide && !noBall) {
			// setLegalBalls((prevLegalBalls) => prevLegalBalls + 1);
		}

		setScore((prevScore) => {
			let newBalls = extraball ? prevScore.balls : prevScore.balls + 1;
			let additionalBalls = 0;
			if (newBalls >= 6) {
				additionalBalls = 1;
				newBalls = 0;
				// setLegalBalls(0);
			}
			if (prevScore.wickets + wicket >= 10) {
				Swal.fire({
					icon: "error",
					title: "Oops... All out",
					text: "End of Innings",
				});
				return {
					overs: prevScore.overs,
					balls: prevScore.balls,
					runs: prevScore.runs,
					wickets: prevScore.wickets,
				};
			}
			return {
				overs: prevScore.overs + additionalBalls,
				balls: newBalls,
				runs: prevScore.runs + run,
				wickets: prevScore.wickets + wicket,
			};
		});
		// Check for end of over outside of setScore
		if (score.balls === 5 && !extraball) {
			setOversHistory((prevOvers) => [...prevOvers, [...ballScores, run]]);
			setBallScores([]);
			setBallWicket([]);
			setBallWide([]);
			setBallNO([]);
		}
	};

	const handleUndo = () => {
		Swal.fire({
			title: "Are you sure you want to undo?",
			showConfirmButton: false,
			showDenyButton: true,
			showCancelButton: true,
			denyButtonText: `Undo`,
		}).then((result) => {
			if (result.isDenied) {
				// Pop the last score from history and set it as the current score
				if (scoreHistory.length > 0) {
					const lastScore = scoreHistory.pop();
					setScore(lastScore);
					setScoreHistory([...scoreHistory]);
				}
			}
		});
	};

	const handleRunout = () => {
		Swal.fire({
			title: "New batsman in is the keeper side?",
			showDenyButton: true,
			confirmButtonText: "Yes, Keeper side",
			denyButtonText: `No, Bowler side`,
		}).then(() => {
			Swal.fire({
				title: "Is that a No Ball?",
				showDenyButton: true,
				confirmButtonText: "Vaild Ball",
				denyButtonText: `No Ball`,
			}).then((result) => {
				Swal.fire({
					title: "Did they successfully complete any run?",
					input: "text",
					confirmButtonText: "Done",
				}).then((res) => {
					const runCompletedBeforeRunOut = isNaN(Number(res.value))
						? 0
						: Number(res.value);
					if (result.isConfirmed) {
						handleRuns(0 + runCompletedBeforeRunOut, false, false, 1);
					} else if (result.isDenied) {
						handleRuns(1 + runCompletedBeforeRunOut, false, true, 1);
					}
				});
			});
		});
	};

	return (
		<div className="container mx-auto text-center">
			<div className="p-5 flex flex-col sm:flex-row justify-around items-center">
				<div className="mb-3">
					<span className="text-[30vw] lg:text-[15vw]">
						{score.runs}/{score.wickets}
					</span>
					<span className="text-[10vw] lg:text-[5vw]">
						{score.overs}.{score.balls}
					</span>
				</div>

				<div>
					<div className="flex items-center justify-around flex-wrap text-xl">
						{ballScores.map((score, ballIndex) => {
							const index = ballIndex;
							return (
								<button
									key={ballIndex}
									className={`w-10 h-10 border-2 border-gray-600 rounded-full focus:outline-none ${
										(ballWide[index] || ballNO[index]) && ballWicket[index]
											? "text-white half-warning-half-error"
											: ballWicket[index]
											? "text-white bg-error"
											: ballWide[index] || ballNO[index]
											? "text-white bg-warning"
											: score > 3
											? "text-white bg-success"
											: "bg-white"
									}`}>
									{ballWicket[index]
										? "Out"
										: ballWide[index]
										? "Wd"
										: score === 0
										? "."
										: score}
								</button>
							);
						})}
					</div>

					<div className="grid grid-cols-3 gap-2 mt-5">
						<button
							className="btn btn-info text-2xl"
							onClick={() => handleRuns(0)}>
							Dot
						</button>
						<button
							className="btn btn-info text-3xl"
							onClick={() => handleRuns(1)}>
							1
						</button>
						<button
							className="btn btn-info text-3xl"
							onClick={() => handleRuns(2)}>
							2
						</button>
						<button
							className="btn btn-info text-3xl"
							onClick={() => handleRuns(3)}>
							3
						</button>
						<button
							className="btn btn-success text-3xl"
							onClick={() => handleRuns(4)}>
							4
						</button>
						<button
							className="btn btn-success text-3xl"
							onClick={() => handleRuns(6)}>
							6
						</button>
						<button
							className="btn btn-warning text-2xl"
							onClick={() => handleRuns(1, true)}>
							Wide
						</button>
						<button
							className="btn btn-warning"
							onClick={() => handleRuns(1, false, true)}>
							No Ball
						</button>
						<button
							className="btn btn-error text-2xl"
							onClick={() => handleRuns(0, false, false, 1)}>
							Wicket
						</button>
					</div>
					<div className="grid grid-cols-2 gap-2 mt-5">
						<button
							className="btn btn-error "
							onClick={() => handleRuns(0, true, false, 1)}>
							Wide + Stumping
						</button>
						<button className="btn btn-error text-2xl" onClick={handleRunout}>
							Run Out
						</button>
					</div>
					<div className="grid grid-cols-2 gap-2 mt-10">
						<button className="btn btn-outline btn-info">Scoreboard</button>
						<button className="btn btn-outline btn-error" onClick={handleUndo}>
							Undo
						</button>
					</div>
				</div>
			</div>
			<div>
				{oversHistory.map((overScores, overIndex) => (
					<div key={overIndex}>
						<h3>Over {overIndex + 1}</h3>
						<div className="flex items-center justify-around flex-wrap text-xl">
							{overScores.map((score, ballIndex) => (
								<span key={ballIndex}>{score}</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ScoreCard;
