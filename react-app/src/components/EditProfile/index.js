import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk, deleteProfileThunk } from "../../store/users";

const EditProfile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams(); // userId of PM
    console.log(userId, "USER ID")
	const user = useSelector((state) => state.users[userId]);
	//set state variables
	const [username, setUsername] = useState(user?.username);
	const [email, setEmail] = useState(user?.email);
	const [pmTagline, setPmTagline] = useState(user?.pmTagline);
	const [profileImage, setProfileImage] = useState(user?.profile_image);
	const [propertyType, setPropertyType] = useState("");
	const [pmRate, setPmRate] = useState(user?.pmRate);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [errors, setErrors] = useState([]);

	//A useEffect that calls all of the setState functions to update the fields
	useEffect(() => {
		if (user) {
			setUsername(user.username);
			setEmail(user.email);
			setPmTagline(user.pmTagline);
			setProfileImage(user.profileImage);
			setPropertyType(user.propertyType);
			setPmRate(user.pmRate);
			setPhoneNumber(user.phoneNumber);
			setCity(user.city);
			setState(user.state);
			setZipcode(user.zipcode);
		}
	}, [user]);

	//handleEdit function
	const handleEdit = async (e) => {
		e.preventDefault();
		const editedProfile = {
			id: userId,
			username,
			email,
			pm_tagline: pmTagline,
            profile_image: profileImage,
			property_type: propertyType,
			pm_rate: pmRate,
			phone_number: phoneNumber,
			city,
			state,
			zipcode,
		};

		let data = await dispatch(editUserThunk(editedProfile));
		if (data) {
			setErrors(data);
		} else {
			history.push(`/users/${userId}`);
		}
	};

	// const handleDelete = () =>
	// 	dispatch(deleteProfileThunk(data.id));

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
					placeholder="Update username"
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div>Email</div>
				<input
					type="text"
					placeholder="Update email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div>Property Manager Tagline</div>
				<input
					type="text"
					placeholder="Update tagline"
					required
					value={pmTagline}
					onChange={(e) => setPmTagline(e.target.value)}
				/>
				<div>Profile Image</div>
				<input
					type="url"
					placeholder="Update profile image"
					required
					value={profileImage}
					onChange={(e) => setProfileImage(e.target.value)}
				/>
				<div>Property Type</div>
				<input
					type="text"
					placeholder="Update property type"
					required
					value={propertyType}
					onChange={(e) => setPropertyType(e.target.value)}
				/>
				<div>Property Manager Rate</div>
				<input
					type="text"
					placeholder="Update property manager rate"
					required
					value={pmRate}
					onChange={(e) => setPmRate(e.target.value)}
				/>
				<div>Phone Number</div>
				<input
					type="text"
					placeholder="Update property type"
					required
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<div>City</div>
				<input
					type="text"
					placeholder="Update city"
					required
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<div>State</div>
				<input
					type="text"
					placeholder="Update state"
					required
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
				<div>Zipcode</div>
				<input
					type="text"
					placeholder="Update zipcode"
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
};

export default EditProfile;
