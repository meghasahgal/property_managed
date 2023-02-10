import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk, getAllUsersThunk } from "../../store/users";
import "./BecomePMConfirmation.css"

const BecomePMConfirmation = () => {
	const dispatch = useDispatch();
	const history = useHistory();


	useEffect(() => {
		dispatch(getAllUsersThunk());
	},[dispatch]);

	const sessionUserId = useSelector((state) => state.session.user.id);
	// console.log(sessionUserId, "THIS IS THE SESH USER ID IN EDIT PROFILE");
	// const user = useSelector((state) => state.users[sessionUserId]);
	const user = useSelector((state) => state.session.user);

	console.log(user.isPm, "user is pm? in BECOME A PM")


	//route change to edit the form
	const routeChangetoEditForm = () => {
		let path = `/users/${sessionUserId}/edit`;
		history.push(path);
		// console.log(path, "path")
	};

	const routeChangeToHome = () => {
		history.push("/");
	};

	return (
		<>
			<h3 className="med-title">Are you sure you'd like to become a Property Manager?</h3>

			<button className="med-btn"onClick={routeChangeToHome}>Go Back Home</button>
			<button className="med-btn"
				style={{ display: "inline-block" }}
				onClick={() => {
					// handleEdit();
					// setIsPm((prev) => !prev);
					routeChangetoEditForm();

				}}
			>
				Yes!
			</button>
		</>
	);
};

export default BecomePMConfirmation;
