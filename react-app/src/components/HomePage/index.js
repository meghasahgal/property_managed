import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import "./HomePage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHouse ,faHouseWindowChimney, faWarehouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";


const HomePage = () => {
	const dispatch = useDispatch();
    const history = useHistory();

    const reviews = useSelector((state) => state.reviews)

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
			<div className="users-container">
				{allUsersArray?.map((user) =>
					user && user?.id ? (
						<div key={user?.id}>
							<div className="user-details">
								<div
									style={{
										backgroundImage: `url('${user?.profileImg}')`,
									}}
									className="img-size"
								>
									{/* <img
										id="user-splash-img"
										src={user?.profileImg}
									/> */}
								</div>
								<Link
									className="user-link"
									to={`/users/${user.id}`}
								>
									{user.username}
								</Link>

								<div>
									<FontAwesomeIcon
										className="house"
										icon={faHouse}
									/>
									Property Type: {user.propertyType}
								</div>
								<div>
									<FontAwesomeIcon
										className="location"
										icon={faLocationDot}
									/>
									{user.city}, {user.state}
									{/* <div>{user.avgRating}</div> */}
								</div>
								<div>
									<FontAwesomeIcon
										className="house"
										icon={faStar}
									/>
									{user.avgRating}
								</div>
							</div>
						</div>
					) : (
						<div></div>
					)
				)}
			</div>
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
