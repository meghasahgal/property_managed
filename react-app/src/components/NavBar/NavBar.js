import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { login } from "../../store/session";
import { getAllUsersThunk } from "../../store/users";
import "./NavBar.css";
import logo from "../NavBar/logo.png";

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
	console.log(sessionUser?.is_Pm, "session user is PM?")
	console.log(sessionUser, "this is the session user")
	console.log(sessionUser?.id, "this is the id")
	console.log(sessionUser?.isPm, "this is the pm")
	const sessionUserisPm = sessionUser?.isPm

	useEffect(() => {
		dispatch(getAllUsersThunk());
		// dispatch(getReviewsByUserIdThunk())
	});

	const history = useHistory();
	const dispatch = useDispatch();

	const demoUser = {
		email: "marnie@aa.io",
		password: "password",
	};

	const handleClick = (e) => {
		e.preventDefault();
		return dispatch(login(demoUser.email, demoUser.password));
	};
	// const [isPm, setIsPm] = useState('false')
	const [buttonText, setButtonText] = useState("Become A PM");
	const changeText = (text) => setButtonText(text);
	// console.log(sessionUserisPm==="true", "is this a val?")
	console.log(sessionUserisPm == true)
	// check if isPm and change nav bar button to respective text
	// const changeButtonText=(sessionUserisPm)=>{

	// 	if (sessionUserisPm == true){
	// 		setButtonText['Your Profile']
	// 	}
	// 	else {
	// 		setButtonText['Become a PM']
	// 	}
	// }

	// const changeButtonText = () =>{
	// 	setButtonText('Your Profile')
	// }
	// console.log(buttonText);
	// console.log(setButtonText)

	// return (
	// 	<Button onClick={() => setButtonText("Your Profile")}>{buttonText}</Button>
	// );


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
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						<img
							className="logoImg"
							src={logo}
							alt="Managed Logo"
						/>
						Home
					</NavLink>
				</li>
				{/* <li>
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
				</li> */}
				{sessionUser ? (
					<>
						<li className="barLink">
							<LogoutButton className="navButton" />
						</li>
						{/* <li className="barLink">
							<NavLink
								to={`/users/${sessionUser.id}`}
								exact={true}
							>
								{sessionUser.username}'s Profile
							</NavLink>
						</li> */}
						{(sessionUser.isPm == true) ? (
							<li className="barLink">
								{/* <Link to={`/users/${sessionUser.id}`}></Link> */}
								<button
								OnClick={()=>{
									// changeButtonText(sessionUserisPm)
									routeChangetoEditForm();
									changeText("Your Profile")
									// setButtonText('Your Profile')
								}}
								>
									{buttonText}
								</button>
							</li>
						) : (
							<li className="barLink">
								<button

								>
									{buttonText}
								</button>
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
								Login
							</NavLink>
						</li>
						<li className="barLink">
							<NavLink
								to="/sign-up"
								exact={true}
								activeClassName="active"
							>
								Sign Up
							</NavLink>
						</li>
						{/* <li className="barLink">
							<button className="navButton" onClick={handleClick}>
								Demo Login
							</button>
						</li> */}
					</>
				)}

				{/* <li>
					<LogoutButton />
				</li> */}
				<li>
					<button onClick={handleClick}>Demo Login</button>
				</li>
			</ul>
		</nav>
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
