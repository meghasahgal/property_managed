import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk} from "../st
// have this render on the ReviewById component
const EditReview = ({ review }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [reviewBody, setReviewBody] = useState("");
	const [stars, setStars] = useState("");
	const [errors, setErrors] = useState([]);
	// user_id = IntegerField('user_id', validators=[DataRequired()])
	// reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
	// stars = IntegerField('rating', validators = [DataRequired()])
	// review_body = TextAreaField('your review',validators =[DataRequired()])

	const handleSubmit = async (e) => {
		e.preventDefault();

		const editedReview = {
			id: review.id,
			user_id: review.userId,
			reviewer_id: review.reviewerId,
			review_body: reviewBody,
			stars,
		};
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
					placeholder={user?.reviewBody}
					required
					value={reviewBody}
					onChange={(e) => setReviewBody(e.target.value)}
				/>
				<div>Rating</div>
				<input
					type="text"
					placeholder={user?.stars}
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
					disabled={errors.length > 0}
				>
					Edit
				</button>
			</form>
		</>
	);
};
