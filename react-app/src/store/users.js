const LOAD_USERS = "/users/LOAD_USERS";
const DELETE_USER = "/users/DELETE_USER"

//action creators
const loadUsers = (payload) => ({
	type: LOAD_USERS,
	payload,
});

const deleteUser = (payload) => ({
    type: DELETE_USER,
    payload,
})

//thunks
// GET ALL USERS (PM's)
export const getAllUsersThunk = () => async (dispatch) => {
	const res = await fetch("/api/users/");
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

// EDIT a USER PROFILE
export const editProfileThunk = (data) => async (dispatch) => {
	const editedUser = JSON.stringify(data);
    //****need to change URL here */
	const res = await fetch(`/api/users/profile/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedUser,
	});

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
export const deleteProfileThunk = (data) => async (dispatch) => {
	const response = await fetch(`/api/users/${data.id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteUser(data.id));
	}
};

const userReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_USERS:
			return { ...newState, ...action.payload };
        case DELETE_USER:
            delete newState[action.reviewId];
			return newState;
		default:
			return state;
	}
};

export default userReducer;