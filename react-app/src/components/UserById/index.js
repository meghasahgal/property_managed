import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, deleteProfileThunk } from "../../store/users";
import ReviewsByUserId from "../ReviewsByUserId";

const UserById = () => {
	const dispatch = useDispatch();
	const { userId } = useParams(); // userId of PM
	console.log(userId, "userId")
	const sessionUser = useSelector((state) => state.session.user);
	// const user = useSelector((state) =>{
	// 	if (state?.users[userId]){
	// 		Object.values(state?.users[userId])
	// 	} else return undefined;
	// }
	// );
	const user = useSelector((state) => state.users[userId])
	console.log("*******")
	console.log(user, "THIS IS THE USER")

	// const allUsersArray = useSelector((state) => {
	// 	if (state?.users?.users) {
	// 		return Object.values(state?.users?.users);
	// 	} else return undefined;
	// });
	// const reviews = useSelector((state) => {
	// 	if (state?.users?.users) {
	// 		return Object.values(state?.users?.users?.reviews);
	// 	} else return undefined;
	// }); //all reviews array in store
	// const review = reviews.filter((review) => review.userId == userId); // all reviews for the specific user/PM

	useEffect(() => {
		dispatch(getUserThunk(userId));
	}, [userId]);

	return (
		<>
			{user && (
				<div className="user-container-individual-user">
					<div>
						<img id="user-splash-img" src={user?.profileImg} />
					</div>
					<div className="title-text">{user.username}</div>
					<div className="user-details-container">
						<div className="user-info">
							<span className="blob">{" · "}</span>
							<div>
								{" "}
								{user.city}
								{", "}
								{user.state}
							</div>
						</div>
						<div className="img-container">
							<div
								className="img-size-id primary-text"
								style={{
									backgroundImage: `url('${user?.profileImage}')`,
								}}
							></div>
						</div>
						<div>
							<ReviewsByUserId user={user} />
						</div>

						{user.userId === sessionUser?.id && (
							<button>Edit Review</button>
						)}
						{user.userId === sessionUser?.id && (
							<button>Delete Review</button>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default UserById;

// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getSpotById, deleteSpot } from "../../store/spot";
// import EditSpotForm from "../EditSpotForm";
// import ReviewsBySpotId from "../ReviewsBySpotId";
// import CreateReviewForm from "../CreateReviewForm";
// import "./SpotById.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
// import AverageRatingCalc from "../AverageRatingCalc";

// const SpotById = () => {
// 	const history = useHistory();
// 	const dispatch = useDispatch();
// 	const { spotId } = useParams();
// 	const spot = useSelector((state) => state.spots[spotId]);
// 	const sessionUser = useSelector((state) => state.session.user);
// 	const reviews = useSelector((state) => Object.values(state.reviews)); //all reviews array in store
// 	const review = reviews.filter((review) => review.spotId == spotId); // all reviews for the specific spot

// 	//map over reviews:
// 	const allReviewsUserIds = review.map((review) => review.userId);

// 	const star = <FontAwesomeIcon icon={faStar} />;

// 	useEffect(() => {
// 		dispatch(getSpotById(spotId));
// 	}, [spotId]);

// 	// handleDeleteClick // fixed by taking out the id in the redirect callbackroute
// 	const handleDeleteClick = (id) => {
// 		dispatch(deleteSpot(id));
// 		history.push(`/spots`);
// 	};

// 	// //button to edit spot
// 	const routeChangetoEditForm = () => {
// 		let path = `/spots/${spotId}/edit`;
// 		history.push(path);
// 	};

// 	// console.log(spotId)

// 	const routeChangetoCreateReviewForm = () => {
// 		let path = `/spots/${spotId}/reviews`;
// 		history.push(path);
// 	};

//
// export default SpotById;
