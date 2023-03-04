import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;
// add useeffect with join, message and disconnect

function Chat() {
	const [message, setMessage] = useState("");
	const user = useSelector((state) => state.session.user);
	// connect to socket
	useEffect(() => {
		socket = io();
		//listen for connect
		socket.on("connect", () => {
			//send a connection message
			socket.send(`You connected with id: ${socket.id}`);
		});

		//when component unmounts, disconnect
		return (
			() => {
				socket.disconnect();
			},
			[]
		);
	});

	return <h1>hello</h1>;

	// socket.emit sends info back to server

	// //ref material from backend:
	//	@socketio.on('join')
	// // def on_join(data):
	// //     username = data['username']
	// //     room = data['chat_id']
	// //     join_room(room)
	// //     send(username + ' has entered the room.', to=room)
	// 	const joinRoom = (e) =>{
	// 		socket.on('join', )
	// 	}

	// join room first
	//

	// const sendMessage = () => {
	// 	socket.emit("message", { message });
	// 	setMessage("");
	// };

	// 	//function to send chats
	// 	const sendChat = (e) => {
	// 		  e.preventDefault();
	//     if (message) {
	//       socket.emit("message", { message, room: chatId, uid: sessionUser.id });
	//       setMessage("");
	//     }
	//   };
	// 	};

	// 	return (
	// 		<div>
	// 			<input
	// 				type="text"
	// 				value={message}
	// 				onChange={(e) => setMessage(e.target.value)}
	// 			/>
	// 			<button onClick={sendMessage}>Send</button>
	// {/*
	// 			<input
	// 				type="text"
	// 				value={privateMessage}
	// 				onChange={(e) => setPrivateMessage(e.target.value)}
	// 			/>
	// 			<input
	// 				type="text"
	// 				value={recipientSid}
	// 				onChange={(e) => setRecipientSid(e.target.value)}
	// 			/>
	// 			<button onClick={sendPrivateMessage}>Send Message</button> */}
	// 		</div>
	// 	);
	// }

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

	// 	// function to send chats
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
}

export default Chat;
