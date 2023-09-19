// eslint-disable-next-line no-unused-vars
import React from "react";
import useTitle from "../../Shared/Hooks/useTitle";

const FAQ = () => {
	useTitle("FAQ");

	return (
		<div className="flex  justify-center my-10">
			<div className="container bg-gray-200 rounded p-5">
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						Hello, thank you for coming in today. My name is Mr.x and I will be
						interviewing you for the developer position.
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						Hi, it&apos;s nice to meet you. I&apos;m Ms. Job Hunter.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						Let&apos;s directly go to the questions.
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						Sure.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-primary">
						What is an access token and refresh token? How do they work and
						where should we store them on the client-side?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-info">
						An access token is a short-lived credential that grants a client
						application limited access to a user&apos;s protected resources. A
						refresh token is a long-lived credential that can be used to obtain
						new access tokens without requiring the user to re-authenticate.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-secondary">
						Compare SQL and NoSQL databases?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-accent">
						SQL databases use structured query language to store and retrieve
						data. SQL databases are typically good for storing structured
						data.NoSQL databases are typically good for storing unstructured
						data, such as social media posts or sensor data.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-success">
						What is express js? What is Nest JS ?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-warning">
						Express.js is a minimal and flexible Node.js web application
						framework that provides a robust set of features for building web
						applications.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-error">
						What is MongoDB aggregate and how does it work?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-primary">
						MongoDB aggregate is a pipeline-based aggregation framework that
						allows you to perform complex operations on your data.
					</div>
				</div>

				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						you handled it really well.
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						Thank you.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						Do you have any questions for me?
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						No. I&apos;m really looking forward to learning more about the
						company and the position.
					</div>
				</div>
				<div className="chat chat-start" data-aos="zoom-in-right">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						I&apos;m glad to hear that. Thank you for your time today.
						We&apos;ll be in touch soon.
					</div>
				</div>
				<div className="chat chat-end" data-aos="zoom-in-left">
					<div className="chat-bubble whitespace-normal w-2/5 chat-bubble-black">
						Thank you for your time as well. I appreciate the opportunity.
					</div>
				</div>
			</div>
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
