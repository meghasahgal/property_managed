import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProfileThunk, editProfileThunk } from "../../store/users";

const CreateProfile = () =>{
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.users[userId]);
	const sessionUserId = useSelector((state) => state.session.user.id);
	// console.log(sessionUserId, "THIS IS THE SESSION USER ID IN CREATE PROFILE");
	const sessionUsername = useSelector((state) => state.session.user.username);
	const sessionUserEmail = useSelector((state) => state.session.user.email);
	const { userId } = useParams(); // userId of PM/user

	//set state variables
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [pmTagline, setPmTagline] = useState();
	const [profileImg, setProfileImage] = useState();
	const [propertyType, setPropertyType] = useState();
	const [pmRate, setPmRate] = useState();
	const [phoneNumber, setPhoneNumber] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [zipcode, setZipcode] = useState();
	const [isPm, setIsPm] = useState();
	const [errors, setErrors] = useState([]);

	//handleSubmit function
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newProfile = {
			id: sessionUserId,
			username: sessionUsername,
			email: sessionUserEmail,
			pm_tagline: pmTagline,
			profile_img: profileImg,
			property_type: propertyType,
			pm_rate: pmRate,
			phone_number: phoneNumber,
			city,
			state,
			zipcode,
			is_pm: isPm
		};
		// console.log(newProfile, "THIS IS THE NEW PROFILE DATA");

		let data = await dispatch(editProfileThunk(newProfile));
		if (data) {
			setErrors(data);
		} else {
			history.push(`/users/${userId}`);
		}
	};
	const handleCancelClick = (e) => {
		e.preventDefault();
		history.push(`/users/${userId}`);
		// hideForm();
	};

	return (
		<>
			<form className="edit-profile-form" onSubmit={handleSubmit}>
				<div>
					{errors.map((error, i) => (
						<div key={i}>{error}</div>
					))}
				</div>
				<div>Username</div>
				<input
					type="text"
					placeholder={sessionUsername}
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div>Email</div>
				<input
					type="text"
					placeholder={sessionUserEmail}
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<div>Property Manager Tagline</div>
				<input
					type="text"
					placeholder="Enter your tagline"
					required
					value={pmTagline}
					onChange={(e) => setPmTagline(e.target.value)}
				/>
				<div>Profile Image</div>
				<input
					type="url"
					placeholder="Enter a URL of a pic of yourself"
					value={profileImg}
					onChange={(e) => setProfileImage(e.target.value)}
				/>
				<div>Property Type</div>
				<input
					type="text"
					placeholder="Enter the Property Type you Manage"
					required
					value={propertyType}
					onChange={(e) => setPropertyType(e.target.value)}
				/>
				<div>Property Manager Rate</div>
				<input
					type="text"
					placeholder="Enter Your Rate"
					required
					value={pmRate}
					onChange={(e) => setPmRate(e.target.value)}
				/>
				<div>Phone Number</div>
				<input
					type="text"
					placeholder="Enter Your Phone Number"
					required
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<div>City</div>
				<input
					type="text"
					placeholder="Enter your City"
					required
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<div>State</div>
				<input
					type="text"
					placeholder="Enter your State"
					required
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
				<div>Zipcode</div>
				<input
					type="text"
					placeholder="Enter your Zipcode"
					required
					value={zipcode}
					onChange={(e) => setZipcode(e.target.value)}
				/>
				<div>Confirm You're a Property Manager</div>
				<input
					type="text"
					placeholder="Please confirm with a True if you're a Property Manager"
					required
					value={isPm}
					onChange={(e) => setIsPm(e.target.value)}
				/>
				<br></br>
				<div></div>
				<button
					className="small-btn"
					type="button"
					onClick={handleCancelClick}
				>
					Cancel
				</button>
				<button
					className="small-btn"
					type="submit"
					disabled={errors.length > 0}
				>
					Edit
				</button>
			</form>
		</>
	);
}

export default CreateProfile;
