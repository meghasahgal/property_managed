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
    const allUsers = Object.values(useSelector((state)=> state.users))
    // const users = useSelector((state) => state.users[sessionUser.id])


    // !allReviewsUserIds.includes(sessionUser.id);
    // const activeIds = [202, 204]
    // const serviceList = [{"id":201,"title":"a"},{"id":202,"title":"a"},{"id":203,"title":"c"},{"id":204,"title":"d"},{"id":205,"title":"e"}]

    // const result = serviceList.filter(({id}) => !activeIds.includes(id));
    // console.log(result)

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

    console.log(filteredHires, "filteredHIRES")
     const result = allUsers.filter(({id}) => filteredHires.includes(id));
     console.log(result, "THIS IS THE RESULT")

    // const pms = allReviews.filter((review) => review?.userId == userId); // all reviews for the specific user/PM
    // const activeIds = [202, 204];
	// const serviceList = [
	// 	{ id: 201, title: "a" },
	// 	{ id: 202, title: "a" },
	// 	{ id: 203, title: "c" },
	// 	{ id: 204, title: "d" },
	// 	{ id: 205, title: "e" },
	// ];

	// const result = serviceList.filter(({ id }) => !activeIds.includes(id));
	// console.log(result);


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
					{result?.map((user) =>
						user && user?.id ? (
							<div key={user?.id}>
								<div className="user-details"></div>
                                <div>{user.username}</div>
                                <div></div>
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
