import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProfileThunk, editProfileThunk, getUserThunk } from "../../store/users";
import { createHireThunk, getAllHiresThunk } from "../../store/hires";
import GetHires from "../GetHires";

const CreateHire = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams(); // userId of PM
    console.log(userId, "the user Id in the params")
	const sessionUser = useSelector((state) => state.session.user);
	const user = useSelector((state) => state.users[userId]);
    // console.log(user, "THIS IS THE USER in THE FE")
    const hires = Object.values(useSelector((state)=>state.hires))

    useEffect(() => {
		dispatch(getUserThunk(userId));
	}, [userId]);

     useEffect(() => {
			dispatch(getAllHiresThunk());
		}, [dispatch]);



    const routeChangetoHome = () => {
		let path = `/`;
		history.push(path);
	};

	const handleCreateHire = (userId) => {
		dispatch(createHireThunk(userId));
		// alert("You've successfully hired Lucas!");
	};

	return (
		<>
        {user && user.id && user.id && (
			<div>
				<h3>Please confirm that you'd like to hire {user?.username}.</h3>

				<button
                onClick={() => routeChangetoHome()}
                >No</button>

				<button
					onClick={() => handleCreateHire(user?.id)}> Yes!
				</button>
             <h3>These are Your Current Hires:</h3>
             <GetHires />
			</div>
		// <div>
	)}
		</>

	);
};
export default CreateHire;
