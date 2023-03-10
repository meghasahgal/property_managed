import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faWarehouse,
	faLocationDot,
	faSearch
} from "@fortawesome/free-solid-svg-icons";
import AverageRating from "../AverageRating";
import SplashPage from "../SplashPage"

const HomePage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const reviews = useSelector((state) => state.reviews);

	const sessionUser = useSelector((state) => state.session.user);

	const allUsersArray = useSelector((state) => {
		if (state?.users) {
			return Object.values(state?.users);
		} else return undefined;
	});

	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

	// for search
	const [query, setQuery] = useState("");

	return (
		<>
			{sessionUser ? (
				<div>
					{" "}
					<hr></hr>
					<div></div>
					<div className="search">
						<input
							className="search-bar"
							placeholder="Search By City..."
							onChange={(e) => setQuery(e.target.value)}
						/>
						<FontAwesomeIcon
							icon={faSearch}
							className="search-icon"
						/>
					</div>
					<div className="users-container">
						{allUsersArray
							.filter((user) => {
								if (query === "") {
									return user;
								} else if (query && user.city === null) {
									return null;
								} else if (
									user.city
										.toLowerCase()
										.includes(query.toLowerCase())
								) {
									return user;
								}
							})
							.map(
								(user) =>
									sessionUser && user && user.id ? (
										<div
											key={user?.id}
											className="user-details"
										>
											<Link
												className="user-link"
												to={`/users/${user.id}`}
											>
												<div
													style={{
														backgroundImage: `url('${user?.profileImg}')`,
													}}
													className="img-size"
												></div>
												{user.username}
											</Link>

											<div>
												{user.propertyType ==
												"Residential" ? (
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
												/>
												{user.city}, {user.state}
											</div>
											<div>
												<AverageRating user={user} />
											</div>

											<div>{/* <br></br> */}</div>
										</div>
									) : null
								// <div></div>
							)}
					</div>
				</div>
			) : (
				<div>
					<SplashPage />
				</div>
			)}
		</>
	);
};

// 		) : (
// 						<div></div>
// 					)
// 				)}
// 			</div>
// 			):(
// 				<div><SplashPage/></div>
// 			)}
// 		</>
// 	);
// }

export default HomePage;
