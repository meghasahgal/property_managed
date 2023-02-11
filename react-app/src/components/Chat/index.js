import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const Chat = () =>{
    // use state to store all messages received so we can display them
    const [messages, setMessages] = useState([])
    //use state for controlled form input
    const [chatInput, setChatInput] = useState('')

    //open socket connection w/ useeffect
    useEffect(()=>{
        socket = io()
        //listen for chat events
        socket.on("chat", (chat)=>{
            //add new chat into our messages array
            setMessages(messages => [...messages, chat])
        })

        //when component unmounts, disconnect
        return (()=>{
            socket.disconnect()
        })
    },[])
    

    return(
        <form onSubmit={sendChat}>
            <input
                value={chatInput}
                onChange={updateChatInput}
            />
            <button type="submit">Send</button>
        </form>
    )
}

export default Chat;
