import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import "./HomePage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse , faWarehouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import AverageRating from "../AverageRating";
import SplashPage from "../SplashPage"


const HomePage = () => {
	const dispatch = useDispatch();
    const history = useHistory();

    const reviews = useSelector((state) => state.reviews)

	const sessionUser = useSelector((state) => state.session.user);

    const allUsersArray = useSelector((state) =>{
        if(state?.users){
		return Object.values(state?.users)
    }
    else return undefined
    });


	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

	return (
		<>
			<div></div>
			{/* {sessionUser? ( */}
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

								</div>
								<Link
									className="user-link"
									to={`/users/${user.id}`}
								>
									{user.username}
								</Link>

								<div>
                                    {user.propertyType == "Residential" ?
									<FontAwesomeIcon
										className="house"
										icon={faHouse}
									/>:
                                    <FontAwesomeIcon
										className="house"
										icon={faWarehouse}
									/>}
									{user.propertyType}
								</div>
								<div>
									<FontAwesomeIcon
										className="location"
										icon={faLocationDot}
									/>
									{user.city}, {user.state}
								</div>
								<div>

                                    <AverageRating user={user} />
								</div>
							</div>
						</div>
					) : (
						<div></div>
					)
				)}
			</div>


		</>


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
