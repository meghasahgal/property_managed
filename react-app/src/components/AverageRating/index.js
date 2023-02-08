import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getReviewsByUserIdThunk } from "../../store/reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./AverageRating.css"
// map through all reviews based on user id then render in Home Page
const AverageRatingCalc = ({ user }) => {
	const dispatch = useDispatch();
	const userId = user.id;
	const reviews = useSelector((state) => state.reviews);
	//dispatch the thunk the get the reviews for the userId
	useEffect(() => {
		dispatch(getReviewsByUserIdThunk(userId));
	}, []);

	//get all reviews where user id = user id of the review(s)
	const allReviewsArray = Object.values(reviews).filter(
		(review) => userId == review.userId
	);
	// console.log(allReviewsArray, "allReviewsArray"); //returns an array of objs
	const sessionUser = useSelector((state) => state.session.user);

	const filteredReviewsForStars = allReviewsArray.map(
		(review) => review.stars
	);
	// console.log(filteredReviewsForStars, "filteredReviewsForStars"); // returns an array of stars numbers
	//average calculation
	const averageStars = (filteredReviewsForStars, userId) => {
		let average;
		let total = 0;
		for (let i = 0; i < filteredReviewsForStars.length; i++) {
			let stars = Number(filteredReviewsForStars[i]);
			total += Number(stars);
		}
		average = total / filteredReviewsForStars.length;
		// console.log("average", average)
		return average;
	};

	return (
		<div>
			{" "}
			{filteredReviewsForStars.length ? (
			<FontAwesomeIcon className="star"
				icon={faStar}
			/>
			):null}
			{" "}
			{averageStars(filteredReviewsForStars, userId)
				? averageStars(filteredReviewsForStars, userId).toFixed(1)
				: "New!"}
		</div>
	);
};
export default AverageRatingCalc;

{/* <FontAwesomeIcon className="star"
				icon={filteredReviewsForStars.length ? faStar :null}
			/>{" "} */}
