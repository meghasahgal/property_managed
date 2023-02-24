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
