import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, deleteProfileThunk } from "../../store/users";
import ReviewsByUserId from "../ReviewsByUserId";

const UserById = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams(); // userId of PM
	console.log(userId, "userId");
	const sessionUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.users[userId]);
	// console.log("*******");
	// console.log(user, "THIS IS THE USER");

	const handleDeleteProfile = (userId) => {
		dispatch(deleteProfileThunk(userId));
		history.push(`/users`);
	};

	// const handleEdit = () => {
	// 	const data = {
	// 		id,
	// 		text: editText,
	// 	};

	// 	dispatch(editTweetThunk(data));
	// };

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
									onClick={() => handleDeleteProfile(user?.id)}
								>
									Delete Profile
								</button>
							)}
						</div>
						<div>
							<ReviewsByUserId user={user} />
						</div>
					</div>
					<div>
						{user.id != sessionUser?.id && (
							<button>Chat with Me!</button>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default UserById;
