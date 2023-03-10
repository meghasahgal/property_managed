import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import styles from "../Modals/App.module.css";
import { getAllUsersThunk } from "../../store/users"
import AverageRating from "../AverageRating/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
    faSearch,
	faHouse,
	faWarehouse,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import SplashPage from "../SplashPage";
import "./Search.css";




const Search = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const users = useSelector((state) => Object.values(state.users));
	const sessionUser = useSelector((state) => state.session.user);

	// for search
	const [query, setQuery] = useState("");
	// for zipcode - use only if there is a user logged in to populate distance, else hide distance

	// let sessionUserZipcode;
	// if (sessionUser) {
	// 	sessionUserZipcode = sessionUser.zipcode;
	// }
	const allUsersArray = useSelector((state) => Object.values(state.users));

	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

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

export default Search;
// {
/* <>
			<div></div>
			{sessionUser? (
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
			):(
				<div><SplashPage/></div>
			)}
		</>
	);
}; */
// }
