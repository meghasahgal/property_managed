import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/reviews";
// have this render on the ReviewById component
const EditReview = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { userId } = useParams(); // userId of PM
	const sessionUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state?.users[userId]);
	// console.log(user)
	// const userReview = useSelector((state) => Object.values(user?.reviews).filter(user => user?.reviewerId == sessionUser.id));
	// const userReview = useSelector((state) => Object.values(state?.users[userId]?.reviews).filter(user => user?.reviewerId == sessionUser?.id));
	const userReview = useSelector((state) =>
		Object.values(state?.users[userId]?.reviews).filter(
			(user) => user?.reviewerId == sessionUser?.id
		)
	);

	// console.log(userReview, "USER REVIEW")
	//set default states!
	const [reviewBody, setReviewBody] = useState(userReview[0]["reviewBody"]);
	const [stars, setStars] = useState(userReview[0]["stars"]);
	const [errors, setErrors] = useState([]);

	// const review = useSelector((state) => state.reviews[reviewId]);
	// console.log(review, "REVIEW IN TEH REVIEW COMP")
	// console.log(userReview[0]['id'], "user review id")
	// let userReviewId = userReview[0]['id']

	const reviews = useSelector((state) => Object.values(state.reviews));

	// console.log(reviews, "THESE ARE THE REVIEWS")
	//look at array of sessionUserReview
	// const sessionUserReview = reviews.filter(
	// 	(review) => review.reviewerId == sessionUser.id
	// );
	// console.log(sessionUserReview, "sessionUserReview")
	// let seshReviewId;
	// if (sessionUserReview) {
	// 	seshReviewId = sessionUserReview[0]["id"];
	// }
	let userReviewId;
	if (userReview) {
		userReviewId = userReview[0]["id"];
	}
	// console.log(seshReviewId, "SESHReviewID")
	// const sessionUserId = useSelector((state) => state.session?.user?.id);
	const reviewUserId = userReview[0]["reviewerId"];
	// [{…}]0: {id: 5, reviewBody: 'amazing service!', reviewerId: 2, stars: '3', user: {…}, …}length: 1[[Prototype]]: Array(0) 'SESSIONUSERREVIEW'

	const handleEdit = async (e) => {
		e.preventDefault();

		const editedReview = {
			// id: seshReviewId,
			id: userReviewId,
			user_id: userId,
			reviewer_id: reviewUserId,
			review_body: reviewBody,
			stars,
		};
		// console.log(editedReview, "THIS IS THE EDITED REVIEW");
		let data = await dispatch(editReviewThunk(editedReview));
		if (data) {
			setErrors(data);
		} else {
			history.push(`/users/${userId}`);
		}
	};
	const handleCancelClick = (e) => {
		e.preventDefault();
		history.push(`/users/${userId}`);
		// hideForm();
	};

	return (
		<>
			<form className="edit-profile-form" onSubmit={handleEdit}>
				<div>
					{errors.map((error, i) => (
						<div key={i}>{error}</div>
					))}
				</div>
				<div>Review</div>
				<input
					type="text"
					// placeholder={sessionUserReview[0]['reviewBody']}
					required
					value={reviewBody}
					onChange={(e) => setReviewBody(e.target.value)}
				/>
				<div>Rating (1 to 5)</div>
				<input
					type="text"
					// placeholder={sessionUserReview[0]['stars']}
					required
					value={stars}
					onChange={(e) => setStars(e.target.value)}
				/>

				<br></br>
				<div></div>
				<button
					className="small-btn"
					type="button"
					onClick={handleCancelClick}
				>
					Cancel
				</button>
				<button className="small-btn" type="submit">
					Edit
				</button>
			</form>
		</>
	);
};

export default EditReview;
