import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, deleteProfileThunk } from "../../store/users";
import { getReviewsByUserIdThunk } from "../../store/reviews";

const ReviewsByUserId = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	//all reviews array in store
	// const allReviews = useSelector((state) => {
	// 	if (state?.reviews) {
	// 		return Object.values(state?.reviews);
	// 	} else return undefined;
	// });
	const sessionUser = useSelector((state) => state.session.user)
	const user = useSelector((state) => state.users[userId]);
	const allReviews = useSelector((state) => Object.values(state?.reviews));
	console.log("***********");
	console.log(allReviews, "THESE are all reviews");

	// get all reviews for the property
	const reviews = allReviews.filter((review) => review?.userId == userId); // all reviews for the specific user/PM
	console.log("***********");
	console.log(reviews, "filtered reviews");

	//dispatch the thunk the get the reviews for the userId
	useEffect(() => {
		dispatch(getReviewsByUserIdThunk(userId));
	}, []);

	return (
		<div>
			<div className="primary-text">Reviews</div>
			<hr></hr>
			<div className="reviews-container">
				{reviews.map((review) => (
					<div className="review-id" key={review.id}>
						<div className="review-details">
							<div className="review-font">
								{review?.stars}{" "}
								{review?.reviewBody}
							</div>

						</div>
						{review.userId === sessionUser?.id && (
							<button
								// className="delete-spot-button"
								// onClick={() => handleDeleteClick(review.id)}
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
