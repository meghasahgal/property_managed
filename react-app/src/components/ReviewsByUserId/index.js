import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, deleteProfileThunk } from "../../store/users";
import {
	getReviewsByUserIdThunk,
	deleteReviewThunk,
	editReviewThunk,
} from "../../store/reviews";

const ReviewsByUserId = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams();

	//all reviews array in store
	// const allReviews = useSelector((state) => {
	// 	if (state?.reviews) {
	// 		return Object.values(state?.reviews);
	// 	} else return undefined;
	// });
	const sessionUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.users[userId]);
	const allReviews = useSelector((state) => Object.values(state?.reviews));
	console.log("***********");
	console.log(allReviews, "THESE are all reviews");

	// get all reviews for the property
	const reviews = allReviews.filter((review) => review?.userId == userId); // all reviews for the specific user/PM
	console.log("***********");
	console.log(reviews, "filtered reviews");
	const sessionUserReview = reviews.filter(
		(review) => review.reviewerId == sessionUser.id
	); // review by the specific session user
	console.log(sessionUserReview, "THIS IS THE SESSION USER's REVIEW");

	//get all reviewerIds related to the reviews:
	//map over reviews:
	const allReviewsReviewerIds = allReviews.map((review) => review.reviwerId);
	console.log(
		allReviewsReviewerIds,
		"THESE ARE THE REVIEWER IDS of the REVIEWS"
	);

	//dispatch the thunk the get the reviews for the userId
	useEffect(() => {
		dispatch(getReviewsByUserIdThunk(userId));
	}, []);

	// dispatch the thunk to edit the review of the session user
	const handleEdit = (sessionUserReview) => {
		dispatch(editReviewThunk(sessionUserReview));
	};

	// dispatch another thunk to delete a review of the session user
	const handleDelete = (sessionUserReview) =>
		dispatch(deleteReviewThunk(sessionUserReview));

	const routeChangetoCreateReviewForm = () => {
		let path = `/users/${userId}/reviews`;
		history.push(path);
	};

	const routeChangetoEditReviewForm = () => {
		let path = `/users/${userId}/reviews`;
		history.push(path);
	};

	return (
		<div>
			<div className="primary-text">Reviews</div>
			<hr></hr>
			<div className="reviews-container">
				{reviews.map((review) => (
					<div className="review-id" key={review.id}>
						<div className="review-details">
							<div className="review-font">
								{review?.stars} {review?.reviewBody}
							</div>
						</div>
						{sessionUser?.id != user.id &&
							review.reviewerId != sessionUser?.id &&
							!allReviewsReviewerIds.includes(
								sessionUser?.id
							) && (
								<button
									className="create-review-button"
									onClick={routeChangetoCreateReviewForm}
								>
									Create Review
								</button>
							)}
						{review.reviewerId === sessionUser?.id && (
							<button
								className="delete-review-button"
								// onClick={() => handleEdit(review.id)}
							>
								Edit Review
							</button>
						)}
						{review.reviewerId === sessionUser?.id && (
							<button
								className="delete-review-button"
								onClick={() => handleDelete(review.id)}
							>
								Delete Review
							</button>
						)}
						<hr></hr>
					</div>
				))}
			</div>
		</div>
	);
};

export default ReviewsByUserId;

// postman result
//     "2": {
//         "id": 2,
//         "reviewBody": "Quick and to the point!",
//         "reviewerId": 1,
//         "stars": "4.3",
//         "user": {
//             "avgRating": "4.8",
//             "city": "Newark",
//             "email": "marnie@aa.io",
//             "isPm": true,
//             "phoneNumber": "5102997618",
//             "profileImg": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvcGVydHklMjBtYW5hZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//             "state": "CA",
//             "username": "marnie"
//         },
//         "userId": 2
//     }
// }
