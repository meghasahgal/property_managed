import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/reviews";
// have this render on the ReviewById component
const EditReview = ({reviewId}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [reviewBody, setReviewBody] = useState("");
	const [stars, setStars] = useState("");
	const [errors, setErrors] = useState([]);
	const { userId } = useParams(); // userId of PM
    const sessionUser = useSelector((state=> state.session.user))
	const user = useSelector((state) => state.users[userId]);
    const review = useSelector((state) => state.reviews[reviewId]);
	// console.log(review, "REVIEW IN TEH REVIEW COMP")

    const reviews = useSelector((state) => Object.values(state.reviews))
    // console.log(reviews, "THESE ARE THE REVIEWS")
    //look at array of sessionUserReview
	const sessionUserReview = reviews.filter(
		(review) => review.reviewerId == sessionUser.id
	);
	// console.log(sessionUserReview, "sessionUserReview")
    const seshReviewId =  sessionUserReview[0]['id']
    // console.log(seshReviewId, "SESHReviewID")
	const sessionUserId = useSelector((state) => state.session.user.id);
    const reviewUserId = sessionUserReview[0]['reviewerId']
    // [{…}]0: {id: 5, reviewBody: 'amazing service!', reviewerId: 2, stars: '3', user: {…}, …}length: 1[[Prototype]]: Array(0) 'SESSIONUSERREVIEW'

	useEffect(() => {
		if (sessionUserReview) {
			setReviewBody(sessionUserReview[0]['reviewBody']);
			setStars(sessionUserReview[0]['stars']);
		}
	}, [review]);



	const handleEdit = async (e) => {
		e.preventDefault();

		const editedReview = {
			id: seshReviewId,
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
				<button
					className="small-btn"
					type="submit"
					// disabled={errors.length > 0}
				>
					Edit
				</button>
			</form>
		</>
	);
};

export default EditReview;
