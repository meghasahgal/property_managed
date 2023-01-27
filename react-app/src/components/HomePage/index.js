import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";

const HomePage = () => {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	// console.log(sessionUser, "session user id");
	const allUsersArray = useSelector((state) =>
		Object.values(state.users.users)
	);

	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

	return (
		<>
			{allUsersArray.map((user) =>
				user && user.id ? (
					<div key={user.id}>
						<div>
							<img id="user-splash-img" src={user?.profileImg} />
						</div>
						{user.city}, {user.state}
					</div>
				) : (
					<div></div>
				)
			)}
		</>

		// <h1>This is the home page</h1>
	);

	// const images = useSelector(
	// 	(state) =>
	// 		Object.keys(state.Reducer.images)
	// 			.filter((x) => x === someID)
	// 			.reduce((arr, key) => {
	// 				arr.push(state.Reducer.images[key].data);
	// 				return arr;
	// 			}, []),
	// 	shallowEqual
	// );
};

export default HomePage;
