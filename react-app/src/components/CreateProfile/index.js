import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProfileThunk, editProfileThunk } from "../../store/users";

const CreateProfile = ({userId}) =>{
	const dispatch = useDispatch();
	const history = useHistory();
    const user = useSelector(state => state.users[userId])
	//set state variables
	// const [username, setUsername] = useState();
	// const [email, setEmail] = useState();
	const [pmTagline, setPmTagline] = useState();
	const [profileImg, setProfileImage] = useState()
	const [propertyType, setPropertyType] = useState();
	const [pmRate, setPmRate] = useState();
	const [phoneNumber, setPhoneNumber] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [zipcode, setZipcode] = useState();
	const [errors, setErrors] = useState([]);

	//handleSubmit function
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newProfile = {
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
		};

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
				<div>Property Type</div>
				<input
					type="text"
					placeholder={user?.propertyType}
					required
					value={propertyType}
					onChange={(e) => setPropertyType(e.target.value)}
				/>
				<div>Property Manager Rate</div>
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
