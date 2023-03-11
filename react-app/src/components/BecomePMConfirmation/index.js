import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk, getAllUsersThunk } from "../../store/users";
import "./BecomePMConfirmation.css";
import pm from "../BecomePMConfirmation/pm.jpeg";


const BecomePMConfirmation = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

	const sessionUserId = useSelector((state) => state.session.user.id);
	// //(sessionUserId, "THIS IS THE SESH USER ID IN EDIT PROFILE");
	// const user = useSelector((state) => state.users[sessionUserId]);
	const user = useSelector((state) => state.session.user);

	//(user.isPm, "user is pm? in BECOME A PM")

	//route change to edit the form
	const routeChangetoEditForm = () => {
		let path = `/users/${sessionUserId}/edit`;
		history.push(path);
		// //(path, "path")
	};

	const routeChangeToHome = () => {
		history.push("/");
	};

	return (
		<>
			<h3 className="med-title">
				Are you sure you'd like to become a Property Manager?
			</h3>

			<button className="med-btn" onClick={routeChangeToHome}>
				Go Back Home
			</button>
			<button
				className="med-btn"
				style={{ display: "inline-block" }}
				onClick={() => {
					// handleEdit();
					// setIsPm((prev) => !prev);
					routeChangetoEditForm();
				}}
			>
				Yes!
			</button>
			<div className="img-home">
				<img
					className="img-pnf"
					src={pm}
					alt="picture of a house that's being managed..."
				/>
			</div>
		</>
	);
};

export default BecomePMConfirmation;
