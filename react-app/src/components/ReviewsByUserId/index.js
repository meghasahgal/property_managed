import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, deleteProfileThunk } from "../../store/users";
import { getReviewsByUserIdThunk } from "../../store/reviews";

const ReviewsByUserId = () => {
	const dispatch = useDispatch()
	const { userId } = useParams();
	//all reviews array in store
	const allReviews = useSelector((state) => {
		if (state?.reviews) {
			return Object.values(state?.reviews);
		} else return undefined;
	});

	const reviews = allReviews.filter((review) => review.userId == userId); // all reviews for the specific user/PM

	//dispatch the thunk the get the reviews for the userId
	useEffect(() => {
		dispatch(getReviewsByUserIdThunk(userId));
	}, []);

	return (
		<>
			{reviews.map((review) => {
				<div>{review.stars}</div>;
				<div>{review.reviewBody}</div>;
			})}
		</>
	);
};

export default ReviewsByUserId;
