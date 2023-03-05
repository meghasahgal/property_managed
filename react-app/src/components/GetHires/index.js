import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	createProfileThunk,
	editProfileThunk,
	getUserThunk,
    getAllUsersThunk
} from "../../store/users";
import { createHireThunk, getAllHiresThunk, deleteHireThunk } from "../../store/hires";

const GetHires = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users[sessionUser.id].hiresAsUserId1);
    const allUsers = useSelector((state)=> state.users)
    // const users = useSelector((state) => state.users[sessionUser.id])


    const allUsersArray = Object.values(users)
    console.log(allUsersArray, "THESE ARE ALL THE HIRES BY THE USER")



	const allHiresArray = useSelector((state) => {
		if (state?.hires) {
			return Object.values(state?.hires);
		} else return undefined;
	});
    console.log(allHiresArray, "allHiresArray")
    //get the hires for that user where user2 id is equal to the user id
    const filteredHires = allHiresArray.map((hire) => hire.user2Id)
    //now get the users of the ids in the filteredHires
    // for (let i = 0; i < allUsersArray.length; i++) {
    //     let res = []
    //     if()
    // }
    console.log(filteredHires, "filteredHIRES")
    // const pms = allReviews.filter((review) => review?.userId == userId); // all reviews for the specific user/PM

	useEffect(() => {
		dispatch(getAllHiresThunk());
        dispatch(getAllUsersThunk())
	}, [dispatch]);

    //delete hire
    const handleDeleteHire = (userId) => {
		dispatch(deleteHireThunk(userId));
	};

	return (
		<>
			<div></div>
			{sessionUser ? (
				<div className="users-container">
					{allUsersArray?.map((user) =>
						user && user?.id ? (
							<div key={user?.id}>
								<div className="user-details"></div>
                                <div>ID: {user.id}</div>
                                <div>Quantity: {user.quantity}</div>
                                <div>Price: {user.price}</div>
                                <button
                                onClick={() => handleDeleteHire(user?.id)}>
                                    Delete Hire

                                </button>
							</div>
						) : (
							<div></div>
						)

					)}
				</div>
			) : (
				<div>
				</div>
			)}
		</>
	);
};


export default GetHires;
