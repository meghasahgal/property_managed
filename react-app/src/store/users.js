const LOAD_USERS = "/users/LOAD_USERS";
const DELETE_USER = "/users/DELETE_USER";

//action creators
const loadUsers = (payload) => ({
	type: LOAD_USERS,
	payload,
});

const deleteUser = (userId) => ({
	type: DELETE_USER,
	userId,
});

//thunks
// GET ALL USERS (PM's)
export const getAllUsersThunk = () => async (dispatch) => {
	const res = await fetch("/api/users");
	// const res = await fetch("/api/users");

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadUsers(payload));
		return payload;
	}
};

// GET A USER BY ID
export const getUserThunk = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadUsers(payload));
		return payload;
	}
};

// EDIT A USER BY ID
export const editUserThunk = (data) => async (dispatch) => {
	const editedUser = JSON.stringify(data);

	const res = await fetch(`/api/users/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedUser,
	});
	// console.log(`\n\n\n Edited user in thunk \n\n ${editedUser} \n\n`);

	if (res.ok) {
		const data = await res.json();
		dispatch(loadUsers(data));
		return null;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// GET A PROFILE

// CREATE A PROFILE based on userId /<int:id>/' - ok in postman
export const createProfileThunk = (data) => async (dispatch) => {
	const newProfile = JSON.stringify(data);
	const response = await fetch(`/api/users/${data.id}/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadUsers(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		// //(data, "is data is here?")
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// EDIT a USER PROFILE
export const editProfileThunk = (data) => async (dispatch) => {
	const editedUser = JSON.stringify(data);
	const res = await fetch(`/api/users/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedUser,
	});
	//(editedUser, "editedUser")

	if (res.ok) {
		const data = await res.json();
		dispatch(loadUsers(data));
		return null;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// DELETE a PROFILE
export const deleteProfileThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteUser(userId));
	}
};

// export const deleteReviewThunk = (reviewId) => async (dispatch) => {
// 	const response = await fetch(`/api/reviews/${reviewId}`, {
// 		method: "DELETE",
// 	});
// 	if (response.ok) {
// 		dispatch(deleteReview(reviewId));
// 	}
// };

const userReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_USERS:
			return { ...newState, ...action.payload };
		case DELETE_USER:
			delete newState[action.userId];
			return newState;
		default:
			return state;
	}
};

export default userReducer;
