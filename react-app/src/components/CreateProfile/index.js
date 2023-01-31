import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProfileThunk } from "../../store/users";

const CreateProfile = () =>{
	const dispatch = useDispatch();
	const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
	//set state variables
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [pmTagline, setPmTagline] = useState();
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
			user_id: userId,
			username,
			email,
			pm_tagline: pmTagline,
			property_type: propertyType,
			pm_rate: pmRate,
			phone_number: phoneNumber,
			city,
			state,
			zipcode,
		};

		let data = await dispatch(createProfileThunk(newProfile));
		if (data) {
			setErrors(data);
		} else {
			history.push("/users");
		}
	};

    
}

export default CreateProfile;
