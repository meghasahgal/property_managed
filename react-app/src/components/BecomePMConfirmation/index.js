import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk, getAllUsersThunk } from "../../store/users";

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

	//handle Edit
	// const handleEdit = async (e) => {
	// 	const editedProfile = {
	// 		id: sessionUserId,
	// 		username,
	// 		email,
	// 		pm_tagline: pmTagline,
	// 		profile_img: profileImg,
	// 		property_type: propertyType,
	// 		pm_rate: pmRate,
	// 		phone_number: phoneNumber,
	// 		city,
	// 		state,
	// 		zipcode,
	// 		is_pm: !isPm,
	// 	};

	// 	let data = await dispatch(editUserThunk(editedProfile));
	// };

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
			<div>Are you sure you'd like to become a Property Manager?</div>

			<button
				style={{ display: "block" }}
				onClick={() => {
					// handleEdit();
					// setIsPm((prev) => !prev);
					routeChangetoEditForm();

				}}
			>
				Yes!
			</button>
			<button onClick={routeChangeToHome}>Go Back Home</button>
		</>
	);
};

export default BecomePMConfirmation;
