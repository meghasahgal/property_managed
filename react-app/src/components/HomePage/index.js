import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";

const HomePage = () => {
	const dispatch = useDispatch();
    const history = useHistory();

	const sessionUser = useSelector((state) => state.session.user);

    const allUsersArray = useSelector((state) =>{
        if(state?.users?.users){
		return Object.values(state?.users?.users)
    }
    else return undefined
    });


	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

	return (
		<>

			<div></div>
			{allUsersArray?.map((user) =>
				user && user?.id ? (
					<div key={user?.id}>
						<div>
							<img id="user-splash-img" src={user?.profileImg} />
						</div>
						<Link className="user-link" to={`/users/${user.id}`}>
							{user.username}
						</Link>
						<div>
							{user.city}, {user.state} {user.avgRating}
							{/* <div>{user.avgRating}</div> */}
						</div>
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
