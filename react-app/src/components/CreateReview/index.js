import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, editReviewThunk } from "../../store/reviews";
import "./CreateReview.css"
// have this render on the ReviewById component
const CreateReview = () => {
	const dispatch = useDispatch();
	const history = useHistory();
    const {userId} = useParams()
    const user = useSelector((state) => state.users[userId]);
    const sessionUserId = useSelector((state) => state.session.user.id)
	const [reviewBody, setReviewBody] = useState("");
	const [stars, setStars] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newReview = {
			user_id: userId,
			reviewer_id: sessionUserId,
			review_body: reviewBody,
			stars,
		};
		let data = await dispatch(createReviewThunk(newReview));

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
			<form className="edit-profile-form" onSubmit={handleSubmit}>
				<div>
					{errors.map((error, i) => (
						<div key={i}>{error}</div>
					))}
				</div>
				<div>Review</div>
				<input
					type="text"
					placeholder="Enter your review"
					required
					value={reviewBody}
					onChange={(e) => setReviewBody(e.target.value)}
				/>
				<div>Rating (1 - 5)</div>
				<input
					type="text"
					placeholder="Enter your rating"
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
					Submit
				</button>
			</form>
		</>
	);
};

export default CreateReview;
