import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../../store/users";

const EditProfile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams(); // userId of PM
	const user = useSelector((state)=> state.session.user)
	console.log(user, "USER IN EDIT")
	console.log(user.id, "user id from session in EDIT")
	// const user = useSelector((state) => state.users[userId]);
	//set state variables
	const [username, setUsername] = useState(user?.username);
	const [email, setEmail] = useState(user?.email);
	const [pmTagline, setPmTagline] = useState("");
	const [profileImg, setProfileImage] = useState("");
	const [propertyType, setPropertyType] = useState("");
	const [pmRate, setPmRate] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [isPm, setIsPm] = useState(true);
	const [errors, setErrors] = useState([]);

	// check if user is a pm, render the form conditionally
	//A useEffect that calls all of the setState functions to update the fields
	useEffect(() => {
		if (user) {
			setUsername(user.username);
			setEmail(user.email);
			setPmTagline(user.pmTagline);
			setProfileImage(user.profileImg);
			setPropertyType(user.propertyType);
			setPmRate(user.pmRate);
			setPhoneNumber(user.phoneNumber);
			setCity(user.city);
			setState(user.state);
			setZipcode(user.zipcode);
			setIsPm(user.isPm);
		}
	}, [user]);

	//handleEdit function
	const handleEdit = async (e) => {
		e.preventDefault();
		const editedProfile = {
			id: user.id,
			username: user.username,
			email: user.email,
			pm_tagline: pmTagline,
			profile_img: profileImg,
			property_type: propertyType,
			pm_rate: pmRate,
			phone_number: phoneNumber,
			city,
			state,
			zipcode,
			is_pm: isPm,
		};

		let data = await dispatch(editUserThunk(editedProfile));
		if (data) {
			setErrors(data);
		}
		else {
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
			<form className="edit-profile-form" onSubmit={handleEdit}>
				<div>
					{errors.map((error, i) => (
						<div key={i}>{error}</div>
					))}
				</div>
				<div>Username</div>
				<input
					type="text"
					placeholder={user?.username}
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div>Email</div>
				<input
					type="text"
					placeholder={user?.email}
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div>Property Manager Tagline</div>
				<input
					type="text"
					placeholder={user?.pmTagline}
					required
					value={pmTagline}
					onChange={(e) => setPmTagline(e.target.value)}
				/>
				<div>Profile Image</div>
				<input
					type="url"
					placeholder={user?.profileImg}
					value={profileImg}
					onChange={(e) => setProfileImage(e.target.value)}
				/>
				{/* <div>Property Type</div> */}
                <div></div>
				<label>Property Type </label>
				<select
					value={propertyType}
					onChange={(e) => setPropertyType(e.target.value)}
				>
					<option value="--">--</option>
					<option value="Residential">Residential</option>
					<option value="Retail">Retail</option>
					<option value="Commercial">Commercial</option>
				</select>
				{/* <input
					type="text"
					placeholder={user?.propertyType}
					required
					value={propertyType}
					onChange={(e) => setPropertyType(e.target.value)}
				/> */}
				<div>Your Rate (%)</div>
				<input
					type="text"
					placeholder={user?.pmRate}
					required
					value={pmRate}
					onChange={(e) => setPmRate(e.target.value)}
				/>
				<div>Phone Number</div>
				<input
					type="text"
					placeholder={user?.phoneNumber}
					required
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<div>City</div>
				<input
					type="text"
					placeholder={user?.city}
					required
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<div>State</div>
				<input
					type="text"
					placeholder={user?.state}
					required
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
				<div>Zipcode</div>
				<input
					type="text"
					placeholder={user?.zipcode}
					required
					value={zipcode}
					onChange={(e) => setZipcode(e.target.value)}
					minLength={5}
				/>
				{/* <div>Confirm You're a Property Manager</div>
				<input
					type="text"
					placeholder={user?.isPm}
					required
					value={isPm}
					onChange={(e) => setIsPm(e.target.value)}
				/> */}
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
					// disabled={errors.length > 0}
				>
					Submit
				</button>
			</form>
		</>
	);
};

export default EditProfile;
