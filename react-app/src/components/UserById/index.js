import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, deleteProfileThunk } from "../../store/users";
import { getAllHiresThunk, deleteHireThunk, getHiresByUserIdThunk } from "../../store/hires";
import { logout } from "../../store/session";
import GetHires from "../GetHires";

import {
	getAllReviewsThunk,
	getReviewsByUserIdThunk,
} from "../../store/reviews";
import {
	getLovesByUserIdThunk,
	getAllLovesThunk,
	deleteLoveThunk,
	createLoveThunk,
} from "../../store/loves";

import { createHireThunk } from "../../store/hires";
import ReviewsByUserId from "../ReviewsByUserId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faWarehouse,
	faLocationDot,
	faMoneyCheckDollar,
	faHeart
} from "@fortawesome/free-solid-svg-icons";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import "./UserById.css";

const UserById = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams(); // userId of PM
	// console.log(userId, "THIS IS THE USER ID");
	const sessionUser = useSelector((state) => state.session.user);
	const sessionUserId = sessionUser.id;
	const user = useSelector((state) => state?.users[userId]);
	// need to get the hires array and filter for the hire ID where the user2Id == userId
	const hireId = Object.values(useSelector((state) => state.hires))
		.filter((hire) => hire.user2Id == userId)
		.map((hire) => hire.id)[0];

	const hiresByUser1 = Object.values(useSelector((state) => state.hires))
		.filter((hire) => sessionUser?.id == hire?.user1Id)
		.map((hire) => hire.user2Id);
	// console.log(hiresByUser1, "hiresByUser1");

	//get array of ids of user 2 loves by user1
	const lovesByUser1 = Object.values(useSelector((state) => state.loves))
		.filter((love) => sessionUser.id == love.user1_id)
		.map((love) => love.user2_id);
	// console.log(lovesByUser1, "lovesByUser1");
	// const [co, setCo] = useState("black");
	//get the first love id of user2
	const lovesForUser2 = Object.values(
		useSelector((state) => state.loves)
	).filter((love) => user?.id == love?.user2_id);
	//need an if condition here
	const loveId = Object.values(useSelector((state)=>state?.loves)).filter((love)=> user?.id == love?.user2_id)[0]?.id
	// const allLoves = Object.values(useSelector((state)=>state?.loves))
	// let loveId;
	// if(allLoves.filter((love)=> (user?.id == love?.user2_id)[0]['id']) === undefined){
	// 	let path = `/users/${userId}`;
	// 	history.push(path)
	// } else {
	// 	loveId=allLoves.filter((love)=> user?.id == love?.user2_id)[0]['id']
	// }

	// if (loveId == undefined){
	// 	let path = `/users/${userId}`
	// 	history.push(path)
	// }
	console.log(loveId, "loveId for delete")
	// // console.log(love.user2_id, "loveuser2id")
	// console.log(userId, "userId")

	//if user1 has loved user2, then only show as a purple heart, otherwise black
	// useState for toggling color
	// const[color, setColor] = useState("black")


	const handleDeleteProfile = (userId) => {
		dispatch(deleteProfileThunk(userId));
		dispatch(logout());
		history.push(`/sign-up`);
	};

	const handleDeleteHire = (hireId) => {
		dispatch(deleteHireThunk(hireId));
		history.push("/");
	};

	//get all reviews
	const allReviews = useSelector((state) => Object.values(state?.reviews));
	// conditions to create a review
	// 1. user/pm can't write a review for themselves (sessionUserId can't write one for the userId)
	// 2. reviewerId can't write a duplicate review - need to check for existing review (reviewerId dups)
	// 3. if a person has no reviews, can write a review for them (review length for that Id has to be 0)

	const totalReviews = useSelector((state) => Object.values(state?.reviews)); //all reviews array in store
	const reviews = totalReviews.filter((review) => review.userId == userId); // all reviews for the specific peep
	//map over reviews to get the reviewerIds:
	const allReviewsUserIds = reviews.map((review) => review.reviewerId);
	// console.log(allReviewsUserIds, "All Reviews ReVIeWER IDS")
	// console.log(allReviewsUserIds.includes(sessionUser.id), "is the session user id in the reviewer id array?");
	//get all reviews for that PM/user
	const allPmReviews = useSelector((state) => state?.reviews[userId]);
	// console.log(allPmReviews, "allPmReviews");

	//filter reviews for where the session user ID is also the reviewerID
	let filteredReviews;
	if (allReviews) {
		filteredReviews = allReviews.filter(
			(review) => review.reviewerId === sessionUser.id
		);
		// console.log(filteredReviews, "filteredreviews");
	}
	// console.log(filteredReviews);

	// console.log(allReviews, "allReviews");
	// const allReviewsByID = allReviews.filter((review)=> review.userId == review.id)
	const allReviewsReviewerIds = allReviews.map((review) => review.reviewerId);
	// console.log(allReviewsReviewerIds, "allreviewreviewerIds");
	//dispatch the thunk the get the user reviews for the userId
	useEffect(() => {
		dispatch(getUserThunk(userId));
	}, [userId]);

	useEffect(() => {
		dispatch(getAllReviewsThunk());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getReviewsByUserIdThunk(userId));
	}, [userId]);

	useEffect(() => {
		dispatch(getLovesByUserIdThunk(userId));
	}, [userId]);

	useEffect(() => {
		dispatch(getAllHiresThunk());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getHiresByUserIdThunk(userId));
	}, [userId]);

	useEffect(() => {
		dispatch(getAllLovesThunk());
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

	// //button to edit profile
	const routeChangetoCreateHire = () => {
		let path = `/users/${userId}/hire`;
		history.push(path);
	};

	// console.log(user?.id, "user?id")
	// love a PM
	const handleLove = (userId) => {
		console.log(userId, "THIS IS THE USER ID IN HANDLE LOVE")
		dispatch(createLoveThunk(userId));
		dispatch(getAllLovesThunk());
		dispatch(getLovesByUserIdThunk(userId));
	};
	//unlove a PM
	const handleDeleteLove = (loveId) => {
		dispatch(deleteLoveThunk(loveId));
		dispatch(getAllLovesThunk());
		dispatch(getLovesByUserIdThunk(userId));

	};

	// const review = reviews.filter((review) => review.userId == userId); // all reviews for the specific user/PM

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
						<div className="love-icons">
							<div className="loves">
								{!lovesByUser1?.includes(user?.id) ||
								lovesByUser1.length === 0 ? (
									// <i>
									<AiOutlineHeart
										style={{ color: "black" }}
										onClick={() => handleLove(user?.id)}
									/>
								) : (

									<i>
									<AiFillHeart
										style={{ color: "purple" }}
										onClick={() =>
											handleDeleteLove(loveId)
										}
									/>
									</i>
								)}
							</div>
						</div>

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
							{user?.id !== sessionUser?.id &&
								!hiresByUser1.includes(user?.id) && (
									<button
										className="btn-secondary"
										onClick={routeChangetoCreateHire}
									>
										Hire {user.username}!
									</button>
								)}
							{user.id !== sessionUser?.id &&
								hiresByUser1.includes(user?.id) && (
									<button className="unhire-button"
										onClick={() => handleDeleteHire(hireId)}
									>
										UnHire Me!
									</button>
								)}
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
					{sessionUser?.id !== user?.id &&
						!allReviewsUserIds.includes(sessionUser.id) && hiresByUser1.includes(user?.id) && (
							// review.reviewerId !== sessionUser?.id &&
							// filteredReviews &&
							// filteredReviews?.length == 0 &&
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
					{/* <div>
							<GetHires user={user}/>
						</div> */}
				</div>
			)}
		</>
	);
};

export default UserById;
