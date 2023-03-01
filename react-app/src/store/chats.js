//Actions
const DELETE_CHAT = "chats/DELETE_CHAT";
const LOAD_CHATS = "chats/LOAD_CHAT";

const loadChats = (payload) => {
	return {
		type: LOAD_CHATS,
		payload,
	};
};

const deleteChat = (chatId) => {
	return {
		type: DELETE_CHAT,
		chatId,
	};
};

//THUNKS

// GET all chats
export const getAllChatsThunk = () => async (dispatch) => {
	const response = await fetch(`/api/chats`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadChats(data));
		// console.log(data, "THIS IS THE MESSAGES DATA")
		return data;
	}
};

// GET chats for a userId
export const getChatsByUserIdThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/chats`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadChats(data));
		return data;
	}
};

//GET specific chat by chatId
export const getChatByChatIdThunk = (chatId) => async (dispatch) => {
	const response = await fetch(`/api/chats/${chatId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadChats(data));
		return data;
	}
};

// CREATE A CHAT based on userId /<int:id>/chats'
export const createChatThunk = (data) => async (dispatch) => {
	const newChat = JSON.stringify(data);
	// //(newReview, "THIS IS THE NEW CHAT")
	const response = await fetch(`/api/users/${data.user_id}/chats`, {
	// const response = await fetch(`/api/chats`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newChat,
	});
	// //(data.user_id, "this is the user id of the chat")
	if (response.ok) {
		const data = await response.json();
		dispatch(loadChats(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


// DELETE a CHAT
export const deleteChatThunk = (chatId) => async (dispatch) => {
	const response = await fetch(`/api/chats/${chatId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteChat(chatId));
	}
};

//REDUCER
const initialState = {};
const chatReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_CHATS:
			return { ...newState, ...action.payload };
		case DELETE_CHAT:
			delete newState[action.chatId];
			return newState;
		default:
			return state;
	}
};

export default chatReducer;
