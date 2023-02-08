import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			
			const data = await dispatch(
				signUp(username, email, password)
			);
			if (data) {
				setErrors(data);
			}
		} else {
			setErrors(["Passwords do not match"]);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-signup-main">

			<form className="login-signup-form" onSubmit={onSignUp}>
				<div className="errors-section">
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div className="input-group">
					<label>User Name</label>
					<input
						type="text"
						name="username"
						onChange={updateUsername}
						value={username}
					></input>
				</div>
				<div className="input-group">
					<label>Email</label>
					<input
						type="email"
						name="email"
						onChange={updateEmail}
						value={email}
					></input>
				</div>
				<div className="input-group">
					<label>Password</label>
					<input
						type="password"
						name="password"
						onChange={updatePassword}
						value={password}
					></input>
				</div>
				<div className="input-group">
					<label>Repeat Password</label>
					<input
						type="password"
						name="repeat_password"
						onChange={updateRepeatPassword}
						value={repeatPassword}
						required={true}
					></input>
				</div>
				<div>
					<button className="login-signup-btn" type="submit">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { Redirect } from 'react-router-dom';
// import { signUp } from '../../store/session';

// const SignUpForm = () => {
//   const [errors, setErrors] = useState([]);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const user = useSelector(state => state.session.user);
//   const dispatch = useDispatch();

//   const onSignUp = async (e) => {
//     e.preventDefault();

//     if (password === repeatPassword) {
//       const data = await dispatch(signUp(username, email, password));
//       console.log(data, "signupdata")
//       console.log(password, "********password")
//       console.log(repeatPassword, "*********repeatpassword")

//       if (data) {
//         setErrors(data)
//       }
//       else{
//         setErrors(["Passwords do not match"]);
//         console.log(errors, "errors")
//       }
//     }
//   };

//   const updateUsername = (e) => {
//     setUsername(e.target.value);
//   };

//   const updateEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const updatePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const updateRepeatPassword = (e) => {
//     setRepeatPassword(e.target.value);
//   };

//   if (user) {
//     return <Redirect to='/' />;
//   }

//   return (
// 		<>
//     		<h3>Please Provide Your Details Below </h3>

// 			<form onSubmit={onSignUp}>
// 				<div>
// 					{errors.map((error, ind) => (
// 						<div key={ind}>{error}</div>
// 					))}
// 				</div>
// 				<div>
// 					<label>User Name</label>
// 					<input
// 						type="text"
// 						name="username"
// 						onChange={updateUsername}
// 						value={username}
// 					></input>
// 				</div>
// 				<div>
// 					<label>Email</label>
// 					<input
// 						type="text"
// 						name="email"
// 						onChange={updateEmail}
// 						value={email}
// 					></input>
// 				</div>
// 				<div>
// 					<label>Password</label>
// 					<input
// 						type="password"
// 						name="password"
// 						onChange={updatePassword}
// 						value={password}
// 					></input>
// 				</div>
// 				<div>
// 					<label>Repeat Password</label>
// 					<input
// 						type="password"
// 						name="repeat_password"
// 						onChange={updateRepeatPassword}
// 						value={repeatPassword}
// 						required={true}
// 					></input>
// 				</div>
// 				<button type="submit">Sign Up</button>
// 			</form>
// 		</>
//   );
// };

// export default SignUpForm;
