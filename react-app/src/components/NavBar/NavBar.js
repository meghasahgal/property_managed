import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { login } from "../../store/session";
import { getAllUsersThunk } from "../../store/users";
import "./NavBar.css";
import logo from "../NavBar/logo2.png";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);

	const user = useSelector((state)=> state.session.user)

	// console.log(sessionUser?.is_Pm, "session user is PM?")
	// console.log(sessionUser, "this is the session user")
	// console.log(sessionUser?.id, "this is the id")
	// console.log(sessionUser?.isPm, "this is the pm")
	const sessionUserisPm = sessionUser?.isPm;

	// const [showDemo, setShowDemo] = useState(true);
	// load all users
	useEffect(() => {
		dispatch(getAllUsersThunk());
		// dispatch(getReviewsByUserIdThunk())
	});

	const history = useHistory();
	const dispatch = useDispatch();
	//demo user
	const demoUser = {
		email: "marnie@aa.io",
		password: "password",
	};

	const handleClick = (e) => {
		e.preventDefault();
		return dispatch(login(demoUser.email, demoUser.password));
		// setShowDemo(false)
	};

	// const [isPm, setIsPm] = useState('false')
	const [buttonText, setButtonText] = useState("Become a PM");
	const changeText = (text) => setButtonText(text);
	// console.log(sessionUserisPm==="true", "is this a val?")
	// console.log(sessionUserisPm == true)

	//use effect for sessionUserisPm to show My Profile

	useEffect(() => {
<<<<<<< HEAD
		if (sessionUser && (sessionUser.isPm)) {
=======
		if (sessionUser && (sessionUser.isPm===true)) {
>>>>>>> dev
			setButtonText("My Profile");
		}
	}, [sessionUser]);



	// //button to confirm if someone would like to become a property manager
	const routeChangetoEditForm = () => {
		let path = `/users/${sessionUser.id}/confirmation`;
		history.push(path);
	};

	const routeChangetoEditProfileForm = () => {
		let path = `/users/${sessionUser.id}`;
		history.push(path);
	};

	return (
		<div className="header">
			<nav>
				<ul>
					<li>
						<NavLink to="/" exact={true} activeClassName="active">
							<img
								className="logoImg"
								src={logo}
								alt="Managed Logo"
							/>
						</NavLink>
					</li>

					{sessionUser ? (
						<>
							<li className="barLink">
								<LogoutButton className="navButton" />
							</li>

							{sessionUser.isPm === true ? (
								<li className="barLink">
									<NavLink to={`/users/${sessionUser.id}`}>
										<button>My Profile</button>
									</NavLink>
								</li>
							) : (
								<li className="barLink">
									<NavLink
										to={`/users/${sessionUser.id}/confirmation`}
									>
										<button>Become a PM</button>
									</NavLink>
								</li>
							)}
						</>
					) : (
						<>
							<li className="barLink">
								<NavLink
									to="/login"
									exact={true}
									activeClassName="active"
								>
									<button>Login</button>
								</NavLink>
							</li>
							<li className="barLink">
								<NavLink
									to="/sign-up"
									exact={true}
									activeClassName="active"
								>
									<button>Sign Up</button>
								</NavLink>
							</li>
						</>
					)}

					<li>
						{!sessionUser && (
							<button onClick={handleClick}>Demo Login</button>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;

// {
// 	sessionUser.isPm ? (
// 		<li className="barLink">
// 			<Link to={`/users/${sessionUser.id}`}>My Profile</Link>
// 		</li>
// 	) : (
// 		<li className="barLink">
// 			<button
// 				className="navButton"
// 				onClick={() =>`users/${sessionUser.id}/`}
// 			>
// 				Become a Property Manager
// 			</button>
// 		</li>
// 	);
// }
