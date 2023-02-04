import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { login } from "../../store/session";

import BecomePMConfirmation from "../BecomePMConfirmation";
import "./NavBar.css";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	//demo user
	const firstUser = useSelector((state) => state.users[1]);

	const demoUser = {
		email: firstUser?.email,
		password: "password",
	};

	const handleClick = (e) => {
		e.preventDefault();
		return dispatch(login(demoUser.email, demoUser.password));
	};

	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sign-up"
						exact={true}
						activeClassName="active"
					>
						Sign Up
					</NavLink>
				</li>

				{/* <li>
					<NavLink to="/users" exact={true} activeClassName="active">
						Users
					</NavLink>
				</li> */}
				{/* <li>
					<NavLink
						to="/users/profile"
						exact={true}
						activeClassName="active"
					>
						Become a Property Manager
					</NavLink>
				</li> */}
				<li>
					{sessionUser?.id && (
						<button
							className="btn-create-profile"
							onClick={() =>
								history.push(
									`users/${sessionUser.id}/confirmation`
								)
							}
							// onClick={() =>
							// 	history.push(`/users/${sessionUser.id}/`)
							// }
						>
							Become a Property Manager
						</button>
					)}
				</li>
				<li>
					<LogoutButton />
				</li>
				<li>
					<button onClick={handleClick}>Demo Login</button>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;

// {
// 	sessionUser.shopName ? (
// 		<li className="barLink">
// 			<Link to={`/store/${sessionUser.id}`}>{sessionUser?.shopName}</Link>
// 		</li>
// 	) : (
// 		<li className="barLink">
// 			<button
// 				className="navButton"
// 				onClick={() => setIsOpenAddShop(true)}
// 			>
// 				Become a Vendor
// 			</button>
// 		</li>
// 	);
// }
