import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, deleteProfileThunk } from "../../store/users";
import {
	getAllReviewsThunk,
	getReviewsByUserIdThunk,
} from "../../store/reviews";
import ReviewsByUserId from "../ReviewsByUserId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faWarehouse,
	faLocationDot,
	faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import "./UserById.css";

const UserById = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams(); // userId of PM
	// //(userId, "userId");
	const sessionUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.users[userId]);

	const handleDeleteProfile = (userId) => {
		dispatch(deleteProfileThunk(userId));
		history.push(`/users`);
	};

	//get all reviews
	const allReviews = useSelector((state) => Object.values(state?.reviews));
	const allReviewsReviewerIds = allReviews.map((review) => review.reviewerId);
	//dispatch the thunk the get the reviews for the userId
	useEffect(() => {
		dispatch(getAllReviewsThunk());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getReviewsByUserIdThunk(userId));
	}, [dispatch]);

	const routeChangetoCreateReviewForm = () => {
		let path = `/users/${userId}/reviews`;
		history.push(path);
	};

	// //button to edit profile
	const routeChangetoEditForm = () => {
		let path = `/users/${userId}/edit`;
		history.push(path);
	};
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
			{user && user.id && (
				<div className="users-container-individual-user">
					<div className="img-container">
						<div
							style={{
								backgroundImage: `url('${user?.profileImg}')`,
							}}
							className="img-size-user"
						></div>

						<div className="title-text">{user.username}</div>
						<div className="user-details-container">
							<div className="user-info">
								{/* <span className="blob">{" · "}</span> */}
								<div className="secondary-header-text">
									{user.pmTagline}
								</div>
								<br></br>
								<div>
									{" "}
									{user.propertyType == "Residential" ? (
										<FontAwesomeIcon
											className="house"
											icon={faHouse}
										/>
									) : (
										<FontAwesomeIcon
											className="house"
											icon={faWarehouse}
										/>
									)}
									{user.propertyType}
								</div>
								<div>
									<FontAwesomeIcon
										className="location"
										icon={faLocationDot}
									/>{" "}
									{user.city}
									{", "}
									{user.state}
								</div>
								<div>
									<FontAwesomeIcon
										className="check"
										icon={faMoneyCheckDollar}
									/>
									{user.pmRate} {"%"}
								</div>
							</div>
						</div>
						<div>
							{user.id === sessionUser?.id && (
								<button
									className="change-profile-button"
									onClick={routeChangetoEditForm}
								>
									Edit Profile
								</button>
							)}
							{user.id === sessionUser?.id && (
								<button
									className="change-profile-button"
									onClick={() =>
										handleDeleteProfile(user?.id)
									}
								>
									Delete Profile
								</button>
							)}
						</div>
						<div></div>
						<br></br>
						<div>
							<ReviewsByUserId user={user} />
						</div>
					</div>
					{sessionUser?.id !== user.id &&
						// review.reviewerId !== sessionUser?.id &&
						!allReviewsReviewerIds.includes(sessionUser?.id) && (
							// <EditReview review={review}/>, need to add a setState and set off an OnChange if want to do it other way
							// {
							<button
								className="change-review-button"
								onClick={routeChangetoCreateReviewForm}
							>
								Create Review
							</button>
							// }
						)}
					<div>
						{user.id != sessionUser?.id && (
							<button className="btn-secondary">
								Chat with Me!
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default UserById;
