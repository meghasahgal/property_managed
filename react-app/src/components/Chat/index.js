import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;


function Chat() {
	// const [message, setMessage] = useState("");
	const [privateMessage, setPrivateMessage] = useState("");
	const [recipientSid, setRecipientSid] = useState("");

	// const sendMessage = () => {
	// 	socket.emit("message", { message });
	// 	setMessage("");
	// };

	const sendPrivateMessage = () => {
		socket.emit("private_message", {
			message: privateMessage,
			recipient_sid: recipientSid,
		});
		setPrivateMessage("");
		setRecipientSid("");
	};

	return (
		<div>
			{/* <input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button> */}

			<input
				type="text"
				value={privateMessage}
				onChange={(e) => setPrivateMessage(e.target.value)}
			/>
			<input
				type="text"
				value={recipientSid}
				onChange={(e) => setRecipientSid(e.target.value)}
			/>
			<button onClick={sendPrivateMessage}>Send Private</button>
		</div>
	);
}

// const Chat = () => {
// 	// use state to store all messages received so we can display them
// 	const [messages, setMessages] = useState([]);
// 	//use state for controlled form input
// 	const [chatInput, setChatInput] = useState("");
// 	// get user info
// 	const user = useSelector((state) => state.session.user);

// 	//open socket connection w/ useeffect
// 	useEffect(() => {
// 		socket = io();
// 		//listen for chat events
// 		socket.on("chat", (chat) => {
// 			//add new chat into our messages array
// 			setMessages((messages) => [...messages, chat]);
// 		});

// 		//when component unmounts, disconnect
// 		return(() => {
// 			socket.disconnect();
// 		});
// 	}, []);

// 	// function to updateChatInput with the useState
// 	const updateChatInput = (e) => {
// 		setChatInput(e.target.value);
// 	};

	//function to send chats
// 	const sendChat = (e) => {
// 		e.preventDefault();
// 		//emit a message
// 		socket.emit("chat", { user: user.username, msg: chatInput });
// 		//clear the input field after the message is sent
// 		setChatInput("");
// 	};

// 	return (
// 		user && (
// 			<div>
// 				<div>
// 					{messages.map((message, i) => (
// 						<div key={i}>{`${message.user}: ${message.msg}`}</div>
// 					))}
// 				</div>
// 				<form onSubmit={sendChat}>
// 					<input value={chatInput} onChange={updateChatInput} />
// 					<button type="submit">Send</button>
// 				</form>
// 			</div>
// 		)
// 	);
// };

export default Chat;
