import { useState } from "react";
import Swal from "sweetalert2";
import "./ScoreCard.css";
import ReactDOMServer from "react-dom/server";

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
	const [ballScores, setBallScores] = useState([]);
	const [ballWicket, setBallWicket] = useState([]);
	const [ballWide, setBallWide] = useState([]);
	const [ballNO, setBallNO] = useState([]);

	const handleRuns = (run, wide = false, noBall = false, wicket = 0) => {
		// Push current score to history before updating
		setScoreHistory((prevHistory) => [...prevHistory, score]);
		let ballDescription = [];

		if (wicket) ballDescription.push("Out");
		if (noBall) ballDescription.push("N");
		if (wide) ballDescription.push("Wd");
		if (run === 0 && !wicket && !noBall && !wide) ballDescription.push("0");
		if (run > 0) ballDescription.push(run.toString());

		setBallScores((prevScores) => [...prevScores, ballDescription.join("+")]);

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

		setScore((prevScore) => {
			let newBalls = extraball ? prevScore.balls : prevScore.balls + 1;
			let additionalBalls = 0;
			if (newBalls >= 6) {
				additionalBalls = 1;
				newBalls = 0;
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
				runs: extraball ? prevScore.runs + run + 1 : prevScore.runs + run,
				wickets: prevScore.wickets + wicket,
			};
		});
		// Check for end of over outside of setScore
		if (score.balls === 5 && !extraball) {
			setOversHistory((prevOvers) => [
				...prevOvers,
				[...ballScores, ballDescription.join("+")],
			]);
			setBallScores([]);
			setBallWicket([]);
			setBallWide([]);
			setBallNO([]);
		}
	};

	const renderButtons = () => {
		return (
			<>
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
						onClick={() => handleRuns(0, true)}>
						Wide
					</button>
					<button className="btn btn-warning" onClick={handleNoBall}>
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
			</>
		);
	};

	const handleNoBall = () => {
		Swal.fire({
			title: "Did the batsman score any runs off the no ball?",
			input: "select",
			inputOptions: {
				0: "0",
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				6: "6",
			},
			confirmButtonText: "Done",
		}).then((res) => {
			const runsOffNoBall = Number(res.value);
			handleRuns(runsOffNoBall, false, true);
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
					input: "select",
					inputOptions: {
						0: "0",
						1: "1",
						2: "2",
						3: "3",
					},
					confirmButtonText: "Done",
				}).then((res) => {
					const runCompletedBeforeRunOut = isNaN(Number(res.value))
						? 0
						: Number(res.value);
					if (result.isConfirmed) {
						handleRuns(0 + runCompletedBeforeRunOut, false, false, 1);
					} else if (result.isDenied) {
						handleRuns(0 + runCompletedBeforeRunOut, false, true, 1);
					}
				});
			});
		});
	};

	const showScoreboard = () => {
		// Format the oversHistory to display each over's scores with alternating row colors
		const formattedOvers = (
			<>
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
			</>
		);

		// Display the formatted scores in a popup
		Swal.fire({
			title: "Scoreboard",
			html: ReactDOMServer.renderToStaticMarkup(<>{formattedOvers}</>),
			confirmButtonText: "Close",
			customClass: {
				content: "scoreboard-content",
			},
		});
	};

	const handleChangeScoreClick = () => {
		const over = document.getElementById("changeOverInput").value;
		const ball = document.getElementById("changeBallInput").value;

		if (!over || !ball) {
			Swal.fire("Error", "Please enter both over and ball numbers.", "error");
			return;
		}

		// Display the scoring options in a new popup
		Swal.fire({
			title: "Select Score",
			html: ReactDOMServer.renderToStaticMarkup(
				<div>{/* ... your scoring buttons ... */}</div>
			),
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.isConfirmed) {
				// Update the selected over's ball with the user's input
				// You'll need to implement this logic based on your application's state management
			}
		});
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
				// If the current over has not started (ballScores is empty)
				if (ballScores.length === 0 && oversHistory.length > 0) {
					// Pop the last over from oversHistory
					const lastOver = oversHistory.pop();
					setOversHistory([...oversHistory]);

					// Pop the last ball from the lastOver
					lastOver.pop();
					setBallScores(lastOver);

					// Pop the last ball's data from the state arrays
					ballWicket.pop();
					ballWide.pop();
					ballNO.pop();
					setBallWicket([...ballWicket]);
					setBallWide([...ballWide]);
					setBallNO([...ballNO]);
				} else {
					// Pop the last score from ballScores
					const newBallScores = [...ballScores];
					newBallScores.pop();
					setBallScores(newBallScores);

					// Pop the last ball's data from the state arrays
					ballWicket.pop();
					ballWide.pop();
					ballNO.pop();
					setBallWicket([...ballWicket]);
					setBallWide([...ballWide]);
					setBallNO([...ballNO]);
				}

				// Pop the last score from scoreHistory and set it as the current score
				if (scoreHistory.length > 0) {
					const lastScore = scoreHistory.pop();
					setScore(lastScore);
					setScoreHistory([...scoreHistory]);
				}
			}
		});
	};

	const getFontSizeClass = (text) => {
		const length = text.length;

		if (length <= 2) return "text-5xl";
		if (length <= 4) return "text-3xl";
		if (length <= 6) return "text-md";
		return "text-sm";
	};

	const getButtonClass = (index, score) => {
		const isRunsOnNoBall = score.match(/^N\+(\d+)$/);
		const isBoundaryOnNoBall =
			isRunsOnNoBall && parseInt(isRunsOnNoBall[1], 10) > 3;
		if ((ballWide[index] || ballNO[index]) && ballWicket[index]) {
			return "text-white half-warning-half-error";
		}
		if (ballWicket[index]) {
			return "text-white bg-error";
		}
		if (isBoundaryOnNoBall) {
			return "text-white half-warning-half-success";
		}
		if (ballWide[index] || ballNO[index]) {
			return "text-white bg-warning";
		}
		if (score > 3) {
			return "text-white bg-success";
		}
		return "bg-white";
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
					<div className="flex items-center justify-around flex-wrap">
						{ballScores.map((score, ballIndex) => {
							const index = ballIndex;
							return (
								<button
									key={ballIndex}
									className={`w-[80px] h-[80px] border-2 border-gray-600 rounded-full overflow-hidden focus:outline-none ${getButtonClass(
										index,
										score
									)} ${getFontSizeClass(ballScores[index])}`}>
									{ballScores[index]}
								</button>
							);
						})}
					</div>

					{renderButtons()}

					<div className="grid grid-cols-2 gap-2 mt-10">
						<button
							className="btn btn-outline btn-info"
							onClick={showScoreboard}>
							Scoreboard
						</button>
						<button className="btn btn-outline btn-error" onClick={handleUndo}>
							Undo
						</button>
					</div>
				</div>
			</div>
			<div className="mt-5">
				<input
					type="number"
					placeholder="Over"
					id="changeOverInput"
					className="border p-2 mr-2"
					min="0"
					max={oversHistory.length}
				/>
				<input
					type="number"
					placeholder="Ball"
					id="changeBallInput"
					className="border p-2 mr-2"
					min="1"
					max="6"
				/>
				<button className="btn btn-info" onClick={handleChangeScoreClick}>
					Change Score
				</button>
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
