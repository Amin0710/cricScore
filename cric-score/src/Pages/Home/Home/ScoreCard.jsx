/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./ScoreCard.css";
import ScoreChangePopUp from "./ScoreChangePopUp";
import ByeLegBye from "./ByeLegBye";
import ReactDOM from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import ScoreboardModal from "./ScoreboardModal";
import RunOutModal from "./RunOutModal";
import OutModal from "./OutModal";
import { createRoot } from "react-dom";

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
	const [selectedOverForChange, setSelectedOverForChange] = useState(0);
	const [changeType, setChangeType] = useState("change");
	const [byeChange, setByeChange] = useState("0");
	const [runoutBye, setRunoutBye] = useState("0");
	const [isScoreboardOpen, setisScoreboardOpen] = useState(false);
	const [isRunoutModalOpen, setIsRunoutModalOpen] = useState(false);
	const [isOutModalOpen, setIsOutModalOpen] = useState(false);
	const [activeNewBatsmanSide, setActiveNewBatsmanSide] = useState("");
	const [dismissalAwardedTo, setDismissalAwardedTo] = useState("");
	const [selectedBallIndex, setSelectedBallIndex] = useState(null);
	const [targetDetails, setTargetDetails] = useState({});

	let screenWidth = window.innerWidth;

	const firstAllOutRef = useRef(true);
	const allOutRef = useRef(false);

	// Check for allOut and stop new over
	useEffect(() => {
		if (score.wickets === 10 && !allOutRef.current) {
			const updatedOvers = [...oversHistory];
			if (!firstAllOutRef.current && updatedOvers.length > 0) {
				updatedOvers.pop();
			}
			setOversHistory(updatedOvers);
			allOutRef.current = true; // Mark the action as taken
			firstAllOutRef.current = false;
		}
	}, [score.wickets, oversHistory]);

	const handleRuns = (
		run,
		wide = false,
		noBall = false,
		wicket = 0,
		bye = false,
		newBatsmanSide = ""
	) => {
		console.log(score.wickets);
		if (score.wickets > 9) {
			handleEndInnings();
		} else {
			if (score.balls === 0) {
				setBallScores([]);
				setBallWicket([]);
				setBallWide([]);
				setBallNO([]);
			}
			setSelectedBallIndex(null);
			// Push current score to history before updating
			setScoreHistory((prevHistory) => [...prevHistory, score]);
			let ballDescription = [];

			const isRanout = wicket > 1;
			wicket = wicket ? 1 : 0;

			if (wicket) ballDescription.push("Out");
			if (isRanout && newBatsmanSide === "keeperSide")
				ballDescription.push("Rk");
			if (isRanout && newBatsmanSide === "bowlerSide")
				ballDescription.push("Rb");
			if (noBall) ballDescription.push("N");
			if (wide) ballDescription.push("Wd");
			if (bye) ballDescription.push("B");
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
				let newRuns = extraball
					? prevScore.runs + run + 1
					: prevScore.runs + run;
				let additionalBalls = 0;
				if (newBalls >= 6) {
					additionalBalls = 1;
					newBalls = 0;
				}
				if (prevScore.wickets + wicket === 10) {
					Swal.fire({
						icon: "error",
						title: "Oops... All out",
						text: "Press End of Innings",
					});
				}
				return {
					overs: prevScore.overs + additionalBalls,
					balls: newBalls,
					runs: newRuns,
					wickets: prevScore.wickets + wicket,
				};
			});

			// Check for end of over outside of setScore
			if (score.balls === 5 && !extraball) {
				const updatedOvers = [
					...oversHistory,
					[...ballScores, ballDescription.join("+")],
				];
				setOversHistory(updatedOvers);
				allOutRef.current = false; // Reset the ref when a new over starts
			}
		}
	};

	const renderButtons = () => {
		return (
			<>
				<div className="grid grid-cols-3 gap-2 mt-5">
					<button className="btn btn-info" onClick={() => handleRuns(0)}>
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
						className="btn btn-warning"
						onClick={() => handleRuns(0, true)}>
						Wide
					</button>
					<button className="btn btn-warning" onClick={handleNoBall}>
						No Ball
					</button>
					<button className="btn btn-warning" onClick={handleBye}>
						Bye / <br />
						Leg-bye
					</button>
					<button className="btn btn-error" onClick={handleOut}>
						Wicket
					</button>
					<button
						className="btn btn-error "
						onClick={() => handleRuns(0, true, false, 1)}>
						Wide + Stumping
					</button>
					<button className="btn btn-error" onClick={handleRunout}>
						Run Out
					</button>
				</div>
			</>
		);
	};

	const handleNoBall = () => {
		const textElement = ReactDOMServer.renderToString(
			<span className="text-red-500">Do not include Bye runs</span>
		);

		Swal.fire({
			title: "Did the batsman score any runs off the no ball?(0-6)",
			html: textElement,
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
		}).then((result) => {
			if (result.isConfirmed) {
				const runsOffNoBall = isNaN(Number(result.value))
					? 0
					: Number(result.value);

				handleRuns(runsOffNoBall, false, true);
			}
		});
	};

	const handleBye = () => {
		const byeLegByeHtml = ReactDOMServer.renderToString(<ByeLegBye />);

		Swal.fire({
			title: "Bye / Leg-Bye",
			html: byeLegByeHtml,
			confirmButtonText: "Confirm",
			preConfirm: () => {
				// Retrieve the selected values from the dropdowns
				const byeRunsDropdown = document.getElementById("byeRunsDropdown").value; // prettier-ignore
				const byeWideNoDropdown =document.getElementById("byeWideNoDropdown").value; // prettier-ignore

				return {
					runsSelected: parseInt(byeRunsDropdown, 10),
					wideNoSelected: byeWideNoDropdown,
				};
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const { runsSelected, wideNoSelected } = result.value;

				if (wideNoSelected === "wide") handleRuns(runsSelected, true, false, 0, true); // prettier-ignore
				if (wideNoSelected === "noball") handleRuns(runsSelected, false, true, 0, true); // prettier-ignore

				if (wideNoSelected != "noball" && wideNoSelected != "wide")
					handleRuns(runsSelected, false, false, 0, true);
			}
		});
	};

	const handleOut = () => {
		setIsOutModalOpen(true);
	};
	function handleRunoutByeChange(event) {
		setRunoutBye(event.target.value);
	}
	const handleConfirmWicket = () => {
		if (!dismissalAwardedTo) {
			Swal.fire(
				"Error",
				"Please select to whom the dismissal was awarded.",
				"error"
			);
			return;
		} else if (dismissalAwardedTo != "none") {
			handleRuns(0, false, false, 1);
		}
		setIsOutModalOpen(false);
		setDismissalAwardedTo("");
	};

	const handleRunout = () => {
		setIsRunoutModalOpen(true);
	};

	const showScoreboard = () => {
		setSelectedBallIndex(null);
		setSelectedOverForChange("");
		setisScoreboardOpen(true);
	};

	function extractRunsFromBall(ballToChange) {
		const ballHasRuns =
			/^[0-6]$/.test(ballToChange) || /.+[0-6]$/.test(ballToChange);
		return ballHasRuns ? parseInt(ballToChange.match(/([0-6])$/)?.[1], 10) : 0;
	}
	function extractWicketFromBall(ballToChange) {
		return ballToChange.includes("Out") ? 1 : 0;
	}

	const handleChangeScoreClick = () => {
		const over = document.getElementById("changeOverInput").value;
		const ball = document.getElementById("changeBallInput").value;

		if (!over || !ball) {
			Swal.fire("Error", "Please enter both over and ball numbers.", "error");
			return;
		}

		// const ValidBallsCount = oversHistory[over -1]
		// 	? oversHistory[over -1 ].filter((item) => !item.includes("N") && !item.includes("Wd") ).length
		// 	: 0;

		const ballToChange = ball != 0 ? oversHistory[over - 1][ball - 1] : "";

		const ballToChangeIsExtra =
			ballToChange.includes("Wd") || ballToChange.includes("N");
		const ballToChangeIsWicket = extractWicketFromBall(ballToChange);
		const runsFromBallToChange = extractRunsFromBall(ballToChange);

		// Display the scoring options in a new popup
		if (ball != 0) {
			// Create a DOM container for the React component
			const swalContent = document.createElement("div");

			// Use createRoot for rendering
			const root = ReactDOM.createRoot(swalContent);

			const handleInputChange = (event, type) => {
				if (type === "changeType") {
					setChangeType(event.target.value);
				} else if (type === "bye") {
					setByeChange(event.target.value);
				}

				// Force re-render of the ScoreChangePopUp component inside the Swal modal
				root.render(
					<ScoreChangePopUp
						ballToChangeIsExtra={ballToChangeIsExtra}
						over={over}
						ball={ball}
						bye={type === "bye" ? event.target.value : byeChange}
						changeType={type === "changeType" ? event.target.value : changeType}
						handleTypeChange={handleTypeChange}
						handleByeChange={handleByeChange}
					/>
				);
				Swal.update({
					html: swalContent,
				});
			};

			const handleTypeChange = (event) => {
				handleInputChange(event, "changeType");
			};

			const handleByeChange = (event) => {
				handleInputChange(event, "bye");
			};

			root.render(
				<ScoreChangePopUp
					ballToChangeIsExtra={ballToChangeIsExtra}
					over={over}
					ball={ball}
					bye={byeChange}
					changeType={changeType}
					handleTypeChange={handleTypeChange}
					handleByeChange={handleByeChange}
				/>
			);
			Swal.fire({
				title: "Select Score",
				html: swalContent,
				confirmButtonText: "Confirm",
				preConfirm: () => {
					// Retrieve the selected values from the dropdowns
					const changeTypeValue = document.getElementById("changeType").value; // prettier-ignore
					const runsDropdownValue =document.getElementById("runsDropdown").value; // prettier-ignore
					const wideNoDropdownValue =document.getElementById("wideNoDropdown").value; // prettier-ignore
					const wicketDropdownValue =document.getElementById("wicketDropdown").value; // prettier-ignore
					const changeByeDropdownValue =document.getElementById("changeByeDropdown").value; // prettier-ignore

					return {
						changeTypeSelected: changeTypeValue,
						runsSelected: parseInt(runsDropdownValue, 10),
						wideNoSelected: wideNoDropdownValue,
						wicketSelected: parseInt(wicketDropdownValue, 10),
						byeSelected: changeByeDropdownValue,
					};
				},
			}).then((result) => {
				if (result.isConfirmed) {
					const {
						changeTypeSelected,
						runsSelected,
						wideNoSelected,
						wicketSelected,
						byeSelected,
					} = result.value;
					// Construct the new score string based on the selected values
					let newScore = [];
					if (wicketSelected) newScore.push("Out");
					if (wicketSelected > 1) newScore.push("R");
					if (wideNoSelected === "noball") newScore.push("N");
					if (wideNoSelected === "wide") newScore.push("Wd");
					if (byeSelected === "bye") newScore.push("B");
					if (
						runsSelected === 0 &&
						!wicketSelected &&
						wideNoSelected !== "noball" &&
						wideNoSelected !== "wide"
					)
						newScore.push("0");
					if (runsSelected > 0) newScore.push(runsSelected.toString());

					const changedBall = newScore.join("+");
					let runsAfterChange = extractRunsFromBall(changedBall);
					let newWicketAfterChange = extractWicketFromBall(changedBall);

					if (changeTypeSelected === "change") {
						newWicketAfterChange = newWicketAfterChange - ballToChangeIsWicket; // prettier-ignore
						runsAfterChange = runsAfterChange - runsFromBallToChange;

						// Replace the score in oversHistory
						oversHistory[over - 1][ball - 1] = changedBall;
					}

					if (changeTypeSelected === "add") {
						// Insert the new ball at the specified location in the current over in oversHistory
						oversHistory[over - 1].splice(ball - 1, 0, changedBall);
						runsAfterChange += 1; // only wide No can be added later
					}

					if (changeTypeSelected === "delete") {
						// Remove the ball from the current over in oversHistory
						oversHistory[over - 1].splice(ball - 1, 1);

						// Adjust the score values based on the ball that's being deleted
						newWicketAfterChange = -ballToChangeIsWicket;
						runsAfterChange = -runsFromBallToChange - 1; // only wide No can be deleted later
					}

					setScore((prevScore) => {
						return {
							...prevScore,
							runs: prevScore.runs + runsAfterChange,
							wickets: prevScore.wickets + newWicketAfterChange,
						};
					});
					setOversHistory([...oversHistory]); // Update the state to reflect the addition in the scoreboard

					setSelectedOverForChange("");
					document.getElementById("changeBallInput").value = "";
					setChangeType("change");
					setByeChange("0");
				}
			});
		}
	};

	const handleConfirmRunout = () => {
		if (!activeNewBatsmanSide) {
			Swal.fire(
				"Error",
				"Please select which side did the new batsman arrive on.",
				"error"
			);
			return;
		} else {
			const runoutRunsDropdown = document.getElementById("runoutRunsDropdown").value; // prettier-ignore
			const runoutWideNoDropdown =document.getElementById("runoutWideNoDropdown").value; // prettier-ignore
			const runoutByeDropdown =document.getElementById("runoutByeDropdown").value; // prettier-ignore

			const runsSelected = parseInt(runoutRunsDropdown, 10);
			const wideNoSelected = runoutWideNoDropdown;
			const byeSelected = runoutByeDropdown === "bye";

			if (wideNoSelected === "wide") handleRuns(runsSelected, true, false, 2, byeSelected,activeNewBatsmanSide); // prettier-ignore
			if (wideNoSelected === "noball") handleRuns(runsSelected, false, true, 2, byeSelected,activeNewBatsmanSide); // prettier-ignore

			if (wideNoSelected != "noball" && wideNoSelected != "wide")
				handleRuns(runsSelected, false, false, 2, byeSelected,activeNewBatsmanSide); // prettier-ignore

			setRunoutBye("0");
			setIsRunoutModalOpen(false);
			setActiveNewBatsmanSide("");
		}
	};

	const handleUndo = () => {
		setSelectedBallIndex(null);
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

	const handleTargetMode = () => {
		screenWidth = window.innerWidth;
		const swalContentTarget = (
			<div className="max-w-full">
				<table className="min-w-full border-collapse">
					<thead>
						<tr>
							<th className="border p-1">Runs</th>
							<th className="border p-1">Overs</th>
							<th className="border p-1">Wickets</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border p-1">
								<input
									id="targetRun"
									type="number"
									className="bg-gray-200 p-1 m-1 rounded"
									min="1"
									max="1000"
								/>
							</td>
							<td className="border p-1">
								<input
									id="targetOvers"
									type="number"
									className="bg-gray-200 p-1 m-1 rounded"
									min="1"
									max="50"
								/>
							</td>
							<td className="border p-1">
								<input
									id="targetWickets"
									type="number"
									className="bg-gray-200 p-1 m-1 rounded"
									min="1"
									max="10"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);

		const swalContent = document.createElement("div");

		// Use createRoot for rendering
		const root = createRoot(swalContent);

		root.render(swalContentTarget);

		Swal.fire({
			title: "What is the target?",
			html: swalContent,
			confirmButtonText: "Confirm",
			preConfirm: () => {
				// Retrieve the selected values from the dropdowns
				const targetRun = document.getElementById("targetRun").value; // prettier-ignore
				const targetOvers =document.getElementById("targetOvers").value; // prettier-ignore
				const targetWickets =document.getElementById("targetWickets").value; // prettier-ignore

				if (!targetRun || !targetOvers || !targetWickets) {
					Swal.fire("Error", "Please enter all fields.", "error");
					return;
				}

				return {
					targetRun: parseInt(targetRun, 10),
					targetOvers: parseInt(targetOvers, 10),
					targetWickets: parseInt(targetWickets, 10),
				};
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const { targetRun, targetOvers, targetWickets } = result.value;
				setTargetDetails({ targetRun, targetOvers, targetWickets });
			}
		});
	};

	const handleEndInnings = () => {
		screenWidth = window.innerWidth;
		const swalContentTarget = (
			<div className="max-w-full">
				<h1 className="mb-5">
					Do you want to put a target for the next Innings?
				</h1>
				<table className="min-w-full border-collapse">
					<thead>
						<tr>
							<th className="border p-1">Runs</th>
							<th className="border p-1">Overs</th>
							<th className="border p-1">Wickets</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border p-1">
								<input
									id="targetRun"
									className="bg-white p-1 m-1 rounded w-full"
									value={score.runs + 1}
									readOnly
								/>
							</td>
							<td className="border p-1">
								<input
									id="targetOvers"
									type="number"
									className="bg-gray-200 p-1 m-1 rounded"
									min="1"
									max="50"
								/>
							</td>
							<td className="border p-1">
								<input
									id="targetWickets"
									type="number"
									className="bg-gray-200 p-1 m-1 rounded"
									min="1"
									max="10"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);

		const swalContent = document.createElement("div");

		// Use createRoot for rendering
		const root = createRoot(swalContent);

		root.render(swalContentTarget);

		Swal.fire({
			title: "End of The Innings",
			html: swalContent,
			confirmButtonText: "Confirm",
			preConfirm: () => {
				// Retrieve the selected values from the dropdowns
				const targetRun = document.getElementById("targetRun").value; // prettier-ignore
				const targetOvers =document.getElementById("targetOvers").value; // prettier-ignore
				const targetWickets =document.getElementById("targetWickets").value; // prettier-ignore

				return {
					targetRun: parseInt(targetRun, 10),
					targetOvers: parseInt(targetOvers, 10),
					targetWickets: parseInt(targetWickets, 10),
				};
			},
		}).then((result) => {
			if (result.isConfirmed) {
				const { targetRun, targetOvers, targetWickets } = result.value;
				if (targetRun && targetOvers && targetWickets) {
					setTargetDetails({ targetRun, targetOvers, targetWickets });
				} else {
					setTargetDetails({});
				}
				setScore({
					overs: 0,
					balls: 0,
					runs: 0,
					wickets: 0,
				});
				setBallScores([]);
				setBallWicket([]);
				setBallWide([]);
				setBallNO([]);
				setOversHistory([]);
				setBallWicket([]);
				setBallWide([]);
				setBallNO([]);
				setScoreHistory([]);
			}
		});
	};

	const getFontSizeClass = (text) => {
		const length = text.length;

		if (length <= 1) return "text-5xl";
		if (length <= 2) return "text-3xl md:text-5xl";
		if (length <= 3) return "text-xl md:text-3xl";
		if (length <= 5) return "text-md md:text-xl";
		return "text-xs md:text-sm";
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
		<div>
			<div className="container mx-auto text-center">
				<div className="p-1 flex flex-col md:flex-row justify-around item-top">
					<div style={{ flexBasis: "70%", flexGrow: 1, flexShrink: 0 }}>
						<div className="relative">
							<div className="flex justify-center">
								<h1
									className={`absolute top-0 md:top-5 max-h-20 text-white text-justify px-2 rounded-md ${
										selectedBallIndex !== null ? "bg-neutral" : ""
									}`}>
									{targetDetails.targetRun &&
										targetDetails.targetOvers &&
										targetDetails.targetWickets && (
											<>
												<span className="text-xl text-info font-bold">
													{targetDetails.targetRun - score.runs}
												</span>{" "}
												runs {screenWidth >= 355 ? "needed" : ""} in{" "}
												<span className="text-xl text-info font-bold">
													{targetDetails.targetOvers * 6 -
														score.overs * 6 -
														score.balls}
												</span>{" "}
												balls with{" "}
												<span className="text-xl text-red-700 font-bold">
													{targetDetails.targetWickets - score.wickets}
												</span>{" "}
												{screenWidth >= 355 ? "wickets" : "Wks"}.
											</>
										)}
								</h1>
							</div>
							<span className="text-[30vw] md:text-[20vw] lg:text-[15vw]">
								{score.runs}/{score.wickets}
							</span>
							<span className="text-[10vw] md:text-[7vw] lg:text-[5vw]">
								{score.overs}.{score.balls}
							</span>
							<div className="flex justify-center">
								<h1
									className={`absolute bottom-0 md:bottom-5 max-h-10 text-black text-justify px-2 rounded-md ${
										selectedBallIndex !== null ? "bg-info " : ""
									}`}
									onClick={() => {
										setSelectedBallIndex(null);
									}}>
									{selectedBallIndex !== null && ballScores[selectedBallIndex]}
								</h1>
							</div>
						</div>

						<div className="flex items-center justify-around flex-wrap">
							{Array(
								6 +
									ballScores.filter(
										(score) => score.includes("N") || score.includes("Wd")
									).length
							)
								.fill(null)
								.map((_, ballIndex) => {
									const score = ballScores[ballIndex];
									if (score != null) {
										return (
											<button
												key={ballIndex}
												className={`w-[60px] h-[60px] md:w-[80px] md:h-[80px] border-2 border-gray-600 rounded-full overflow-hidden ${getButtonClass(
													ballIndex,
													score
												)} ${getFontSizeClass(ballScores[ballIndex])}`}
												onClick={() => {
													if (selectedBallIndex === ballIndex) {
														setSelectedBallIndex(null); // Toggle off if already selected
													} else {
														setSelectedBallIndex(ballIndex);
													}
												}}>
												{ballScores[ballIndex]}
											</button>
										);
									} else {
										// Render placeholder
										return (
											<button
												key={ballIndex}
												className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] border-2 border-gray-600 rounded-full"></button>
										);
									}
								})}
						</div>
					</div>
					<div style={{ flexBasis: "30%", flexGrow: 1, flexShrink: 0 }}>
						{renderButtons()}
						<div className="grid grid-cols-2 gap-2 mt-10">
							<button
								className="btn btn-outline btn-info"
								onClick={showScoreboard}>
								Scoreboard
							</button>
							<button
								className="btn btn-outline btn-error"
								onClick={handleUndo}>
								Undo
							</button>
						</div>
						<div className="grid grid-cols-2 gap-2 mt-5">
							<button
								className="btn btn-neutral text-white"
								onClick={handleEndInnings}>
								End of the innings
							</button>
							<button
								className="btn btn-neutral text-white"
								onClick={handleTargetMode}>
								Target Mode
							</button>
						</div>
					</div>
				</div>
			</div>

			<OutModal
				isOpen={isOutModalOpen}
				onRequestClose={() => setIsOutModalOpen(false)}
				handleConfirmWicket={handleConfirmWicket}
				dismissalAwardedTo={dismissalAwardedTo}
				setDismissalAwardedTo={setDismissalAwardedTo}></OutModal>

			<RunOutModal
				isOpen={isRunoutModalOpen}
				onRequestClose={() => setIsRunoutModalOpen(false)}
				runoutBye={runoutBye}
				handleRunoutByeChange={handleRunoutByeChange}
				handleConfirmRunout={handleConfirmRunout}
				activeNewBatsmanSide={activeNewBatsmanSide}
				setActiveNewBatsmanSide={setActiveNewBatsmanSide}></RunOutModal>

			<ScoreboardModal
				isOpen={isScoreboardOpen}
				onRequestClose={() => setisScoreboardOpen(false)}
				oversHistory={oversHistory}
				handleChangeScoreClick={handleChangeScoreClick}
				setSelectedOverForChange={setSelectedOverForChange}
				selectedOverForChange={selectedOverForChange}></ScoreboardModal>
		</div>
	);
};

export default ScoreCard;
