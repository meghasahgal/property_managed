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
import EditReview from "../EditReview";
import "../ReviewsByUserId/ReviewsByUserId.css";

const ReviewsByUserId = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams();
	// console.log(userId, "USER ID IN THUNK")
	const sessionUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.users[userId]);
	// //(user.id, "USER/PM ID IN REVIEWS BY ID")
	const allReviews = useSelector((state) => Object.values(state?.reviews));
	// //("***********");
	// //(allReviews, "THESE are all reviews");

	// get all reviews for the user
	const reviews = allReviews.filter((review) => review?.userId == userId); // all reviews for the specific user/PM
	// //("***********");
	// //(reviews, "filtered reviews");
	const sessionUserReview = reviews.filter(
		(review) => review.reviewerId == sessionUser.id
	); // review by the specific session user
	// //(sessionUserReview, "THIS IS THE SESSION USER's REVIEW");

	//get all reviewerIds related to the reviews:
	//map over reviews:
	const allReviewsReviewerIds = allReviews.map((review) => review.reviewerId);
	// //(
	// 	allReviewsReviewerIds,
	// 	"THESE ARE THE REVIEWER IDS of the REVIEWS"
	// );

	//dispatch the thunk the get the reviews for the userId
	useEffect(() => {
		dispatch(getReviewsByUserIdThunk(userId));
	}, [userId]);

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
		let path = `/users/${userId}/reviews/edit`;
		history.push(path);
	};

	return (
		<div>
			<hr></hr>
			<div></div>
			<h3 className="reviews-header">
				{reviews.length ? "Reviews" : "No Reviews Yet!"}
			</h3>
			{/* <div className="primary-text">Reviews</div> */}
			<hr></hr>

			<div className="reviews-container">
				{reviews.map((review) => (
					<div className="review-id" key={review.id}>
						<div className="review-details">
							<div className="review-font">
								{review?.stars} {""} {review?.reviewBody}
								{""}
							</div>
						</div>
						{/* {sessionUser?.id !== user.id &&
							// review.reviewerId !== sessionUser?.id &&
								!allReviewsReviewerIds.includes(
									sessionUser?.id) &&(

								// <EditReview review={review}/>, need to add a setState and set off an OnChange if want to do it other way
								// {
								<button
									className="change-review-button"
									onClick={routeChangetoCreateReviewForm}
								>
									Create Review
								</button>
								// }
							)} */}
						{review.reviewerId === sessionUser?.id && (
							<button
								className="change-review-button"
								onClick={routeChangetoEditReviewForm}
							>
								Edit Review
							</button>
						)}
						{review.reviewerId === sessionUser?.id && (
							<button
								className="change-review-button"
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

// {sessionUserId === review.userId && (
// 										<div>
// 											<button
// 												className={styles.primaryBtn}
// 												onClick={() =>
// 													setIsOpenEdit(true)
// 												}
// 											>
// 												Edit Comment
// 											</button>
// 											{isOpenEdit && (
// 												<ModalEditReview
// 													setIsOpen={setIsOpenEdit}
// 													review={review}
// 												/>
// 											)}
// 											<button
