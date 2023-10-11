// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useTitle from "../../Shared/Hooks/useTitle";

const FAQ = () => {
	useTitle("FAQ");

	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div className="flex justify-center">
			<div className="container bg-gray-200 rounded p-5">
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						Q: How do I record a run scored from the batsman&apos;s bat?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						{`A: To record a run scored off the batsman's bat, simply place the
						corresponding number on the scoring sheet. Use "dot" for no run, "1"
						for a single, "2" for a double, "3" for a triple, "4" for a
						boundary, and "6" for a six.`}
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						Q: How do I put 5 runs?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						A: Scoring 5 runs is not very common in cricket, and it is not a
						standard scoring option. However, in the future, there might be a
						provision to record such events, but currently, it is not part of
						the standard scoring system.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						Q: What about extra runs?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						{`A: Extra runs can be recorded as follows:`}
						<br />
						{` For a wide delivery,simply mark it as "wide."`}
						<br />
						{`For a no-ball, you need to indicate it as a "no ball" on the scoring sheet. 
						In the pop-up screen, choose how many runs were scored off the no ball and then confirm.`}
						<br />
						<span className="bg-warning">
							{`For byes and leg byes, press the "leg bye" button and then choose how many runs
						were scored from a bye or leg bye. Additionally, you need to specify
						if the ball was a no ball or a wide ball from which the runs were
						scored off byes.`}
						</span>
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						Q: What should I do if there is a bye/leg-bye and a Wide/NO-Ball in
						the same delivery?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						{`A: In such a situation, always go from`}{" "}
						<span className="bg-error">right to left </span>
						{`when recording
						the events. Use the "BYE" button for the bye and select the "wide"
						option inside the popup, which you'll find there. The same principle applies if there
						is a no-ball along with a bye and wide, but be sure not to put the
						bye run inside the no-ball button.`}
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						Q: What should we do if there is a wicket?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						<span className="bg-error">
							A: If there is a wicket you must click one of the bottom three red
							buttons.
						</span>
						{` When a wicket falls, there are three different buttons for
						recording wickets. If you press the regular "wicket" button, a
						pop-up will appear with three options. You must choose one of these
						options. The middle button is specifically for a run-out, which is
						pretty straightforward, indicating that the batsman is out.`}
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						Q: Why are there different buttons for different types of
						dismissals?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						A: Different buttons for dismissals exist because run-outs can be a
						bit complex at times. When recording a run-out, you need to specify
						additional details, such as{" "}
						<span className="bg-warning">
							which side the new batsman arrived on, whether there were any bye
							runs or regular runs involved in the play. You also need to
							indicate whether the run-out occurred during a wide delivery or a
							no-ball.
						</span>{" "}
						This level of detail ensures accurate recording of the dismissal.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						{`Q: What is the use of the "End of Innings" and "Target Mode" button?`}
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						When you press this button, you can input the total number of runs
						required and the number of wickets and over in hand by the next
						batting team.
						<span className="bg-warning">
							The system will then auto-calculate the required run rate and the
							number of balls left to achieve the target.
						</span>{" "}
						This feature is particularly useful in limited-overs cricket,to help
						both teams understand their target and the pace required to win the
						game.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						{`Q: What does the "Undo" button do?`}
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						{`A: The "Undo" button allows you to step back one action, providing a
						quick way to correct an immediate mistake.`}
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-black">
						Q: How does the scoreboard function?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-full md:w-2/5 chat-bubble-info">
						A: The scoreboard button displays comprehensive match information,
						including{" "}
						<span className="bg-warning">
							over details and events during the game.
						</span>{" "}
						It also offers a
						<span className="bg-error">
							{`"Change" option where you can input the over and the ball you wish
						to change.`}
						</span>
						You can then update the score of that particular ball, whether
						it&lsquo;s a wicket or a run.{" "}
						{`However, it's important to note that
						you can only replace a `}
						<span className="bg-warning">
							valid ball with another valid ball or an extra ball (e.g., wide or
							no-ball) with another extra ball.
						</span>{" "}
						There must always be six valid balls in an over, even after making
						changes. This feature is particularly useful in limited-overs
						cricket,to help both teams understand their target and the pace
						required to win the game.
					</div>
				</div>
			</div>
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
