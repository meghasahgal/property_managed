//Actions
const DELETE_HIRE = "hires/DELETE_HIRE";
const LOAD_HIRES = "hires/LOAD_HIRES";

const loadHires = (payload) => {
	return {
		type: LOAD_HIRES,
		payload,
	};
};

const deleteHire = (hireId) => {
	return {
		type: DELETE_HIRE,
		hireId,
	};
};

//THUNKS

// GET all hires
export const getAllHiresThunk = () => async (dispatch) => {
	const response = await fetch(`/api/hires`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadHires(data));
		return data;
	}
};

// GET hires for a userId
export const getHiresByUserIdThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/hires`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadHires(data));
		return data;
	}
};

//GET specific hire by hireId
export const getHireByHireIdThunk = (hireId) => async (dispatch) => {
	const response = await fetch(`/api/hires/${hireId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadHires(data));
		return data;
	}
};

// CREATE A HIRE based on userId /<int:id>/hires'
export const createHireThunk = (data) => async (dispatch) => {
	const newHire = JSON.stringify(data);
	// //(newHire, "THIS IS THE NEW HIRE")
	const response = await fetch(`/api/users/${data}/hires`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newHire,
	});
	// console.log(data, "this is the data")

	if (response.ok) {
		const data = await response.json();
		dispatch(loadHires(data));
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
// 	const response = await fetch(`/api/hires/${hire.id}`, {
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
// 		dispatch(loadHires(data));
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
export const deleteHireThunk = (hireId) => async (dispatch) => {
	const response = await fetch(`/api/hires/${hireId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteHire(hireId));
	}
	console.log(hireId, "THIS IS THE HIRE ID IN THE THUNK")
};

//REDUCER
const initialState = {};
const hireReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_HIRES:
			return { ...newState, ...action.payload };
		case DELETE_HIRE:
			delete newState[action.hireId];
			return newState;
		default:
			return state;
	}
};

export default hireReducer;
