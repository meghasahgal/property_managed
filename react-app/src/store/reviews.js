//Actions
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const loadReviews = (payload) => {
	return {
		type: LOAD_REVIEWS,
		payload,
	};
};

const deleteReview = (reviewId) => {
	return {
		type: DELETE_REVIEW,
		reviewId,
	};
};

//THUNKS

// GET all reviews
export const getAllReviewsThunk = () => async (dispatch) => {
	const response = await fetch(`/api/reviews`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};

// GET reviews for a userId
export const getReviewsByUserIdThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/reviews`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};

//GET specific review by reviewId
export const getReviewByReviewIdThunk = (reviewId) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${reviewId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
		return data;
	}
};

// CREATE A REVIEW based on userId /<int:id>/reviews'
export const createReviewThunk = (data) => async (dispatch) => {
	const newReview = JSON.stringify(data);
	// //(newReview, "THIS IS THE NEW REVIEW")
	const response = await fetch(`/api/users/${data.user_id}/reviews`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: newReview,
	});
	// //(data.user_id, "this is the user id of the review")

	if (response.ok) {
		const data = await response.json();
		dispatch(loadReviews(data));
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

// EDIT A REVIEW
export const editReviewThunk = (review) => async (dispatch) => {
	const editedReview = JSON.stringify(review);
	const response = await fetch(`/api/reviews/${review.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedReview,
	});

	// //(response, "response")
	// //(editedReview, "EDITED REVIEW FROM THUNK");
	if (response.ok) {
		const data = await response.json();
		// //("data", data)
		dispatch(loadReviews(data));
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

// DELETE a REVIEW
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		dispatch(deleteReview(reviewId));
	}
};

//REDUCER
const initialState = {};
const reviewReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_REVIEWS:
			return { ...newState, ...action.payload };
		case DELETE_REVIEW:
			delete newState[action.reviewId];
			return newState;
		default:
			return state;
	}
};

export default reviewReducer;
