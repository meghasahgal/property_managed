//Actions
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";
const LOAD_MESSAGES = "messages/LOAD_MESSAGES";

const loadMessages = (payload) => {
	return {
		type: LOAD_MESSAGES,
		payload,
	};
};

const deleteMessage = (messageId) => {
	return {
		type: DELETE_MESSAGE,
		messageId,
	};
};

//THUNKS

// GET all messages
export const getAllMessagesThunk = () => async (dispatch) => {
	const response = await fetch(`/api/messages`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadMessages(data));
		// console.log(data, "THIS IS THE MESSAGES DATA")
		return data;
	}
};

// GET messages for a userId
export const getMessagesByUserIdThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/messages`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadMessages(data));
		return data;
	}
};

//GET specific message by messageId
export const getMessageByMessageIdThunk = (messageId) => async (dispatch) => {
	const response = await fetch(`/api/messages/${messageId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadMessages(data));
		return data;
	}
};

// CREATE A MESSAGE 
export const createMessageThunk = (data) => async (dispatch) => {
	const newMessage = JSON.stringify(data);
	// //(newReview, "THIS IS THE NEW MESSAGE")
	// const response = await fetch(`/api/users/${data.user_id}/messages`, {
	const response = await fetch(`/api/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newMessage,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadMessages(data));
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

// EDIT A MESSAGE
// export const editMessageThunk = (review) => async (dispatch) => {
// 	const editedMessage = JSON.stringify(review);
// 	const response = await fetch(`/api/messages/${review.id}`, {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: editedMessage,
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		// //("data", data)
// 		dispatch(loadMessages(data));
// 		return null;
// 	} else if (response.status < 500) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// };

// DELETE a MESSAGE
export const deleteMessageThunk = (messageId) => async (dispatch) => {
	const response = await fetch(`/api/messages/${messageId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteMessage(messageId));
	}
};

//REDUCER
const initialState = {};
const messageReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_MESSAGES:
			return { ...newState, ...action.payload };
		case DELETE_MESSAGE:
			delete newState[action.messageId];
			return newState;
		default:
			return state;
	}
};

export default messageReducer;
