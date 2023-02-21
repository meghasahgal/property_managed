import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const Chat = () => {
	// use state to store all messages received so we can display them
	const [messages, setMessages] = useState([]);
	//use state for controlled form input
	const [chatInput, setChatInput] = useState("");
	// get user info
	const user = useSelector((state) => state.session.user);

	//open socket connection w/ useeffect
	useEffect(() => {
		socket = io();
		//listen for chat events
		socket.on("chat", (chat) => {
			//add new chat into our messages array
			setMessages((messages) => [...messages, chat]);
		});

		//when component unmounts, disconnect
		return(() => {
			socket.disconnect();
		});
	}, []);

	// function to updateChatInput with the useState
	const updateChatInput = (e) => {
		setChatInput(e.target.value);
	};

	//function to send chats
	const sendChat = (e) => {
		e.preventDefault();
		//emit a message
		socket.emit("chat", { user: user.username, msg: chatInput });
		//clear the input field after the message is sent
		setChatInput("");
	};

	return (
		user && (
			<div>
				<div>
					{messages.map((message, i) => (
						<div key={i}>{`${message.user}: ${message.msg}`}</div>
					))}
				</div>
				<form onSubmit={sendChat}>
					<input value={chatInput} onChange={updateChatInput} />
					<button type="submit">Send</button>
				</form>
			</div>
		)
	);
};

export default Chat;
