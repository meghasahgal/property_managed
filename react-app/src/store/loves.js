//Actions
const DELETE_LOVE = "loves/DELETE_LOVE";
const LOAD_LOVES = "loves/LOAD_LOVES";

const loadLoves = (payload) => {
	return {
		type: LOAD_LOVES,
		payload,
	};
};

const deleteLove = (loveId) => {
	return {
		type: DELETE_LOVE,
		loveId,
	};
};

//THUNKS

// GET all loves
export const getAllLovesThunk = () => async (dispatch) => {
	const response = await fetch(`/api/loves`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadLoves(data));
		return data;
	}
};

// GET loves for a userId
export const getLovesByUserIdThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/loves`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadLoves(data));
		return data;
	}
};

//GET specific hire by loveId
export const getLoveByLoveIdThunk = (loveId) => async (dispatch) => {
	const response = await fetch(`/api/loves/${loveId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadLoves(data));
		return data;
	}
};

// CREATE A HIRE based on userId /<int:id>/loves'
export const createLoveThunk = (data) => async (dispatch) => {
	const newLove = JSON.stringify(data);
	// //(newLove, "THIS IS THE NEW HIRE")
	const response = await fetch(`/api/users/${data}/loves`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newLove,
	});
	// console.log(data, "this is the data")

	if (response.ok) {
		const data = await response.json();
		dispatch(loadLoves(data));
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

// EDIT A HIRE
// export const editHireThunk = (hire) => async (dispatch) => {
// 	const editedHire = JSON.stringify(hire);
// 	const response = await fetch(`/api/loves/${hire.id}`, {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: editedHire,
// 	});

// //(response, "response")
// //(editedReview, "EDITED HIRE FROM THUNK");
// 	if (response.ok) {
// 		const data = await response.json();
// 		// //("data", data)
// 		dispatch(loadLoves(data));
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

// DELETE a HIRE
export const deleteLoveThunk = (loveId) => async (dispatch) => {
	const response = await fetch(`/api/loves/${loveId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteLove(loveId));
	}
	console.log(loveId, "THIS IS THE LOVE ID IN THE THUNK");
};

//REDUCER
const initialState = {};
const loveReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_LOVES:
			return { ...newState, ...action.payload };
		case DELETE_LOVE:
			delete newState[action.loveId];
			return newState;
		default:
			return state;
	}
};

export default loveReducer;
