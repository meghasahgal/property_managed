import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {

    getAllUsersThunk
} from "../../store/users";
import { createHireThunk, getAllHiresThunk, deleteHireThunk } from "../../store/hires";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

const GetHires = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state?.users[sessionUser.id]?.hiresAsUserId1);
    const allUsers = Object.values(useSelector((state)=> state?.users))
    // const users = useSelector((state) => state.users[sessionUser.id])


    // const allUsersArray = Object.values(users)
    // console.log(allUsersArray, "THESE ARE ALL THE HIRES BY THE USER")



	const allHiresArray = useSelector((state) => {
		if (state?.hires) {
			return Object.values(state?.hires);
		} else return undefined;
	});
    // console.log(allHiresArray, "allHiresArray")
    //get the hires for that user where user2 id is equal to the user id
    const filteredHires = allHiresArray.map((hire) => hire.user2Id)

    // console.log(filteredHires, "filteredHIRES")
     const result = allUsers.filter(({id}) => filteredHires.includes(id));
    //  console.log(result, "THIS IS THE RESULT")



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
			<div>
				{result.length === 0 ? (
					<h2>No Hires Yet!</h2>
				) : (
					<h2>My Hires:</h2>
				)}
			</div>
			{sessionUser ? (
				<div className="users-container">
					{result?.map((user) =>
						user && user?.id ? (
							<div key={user?.id}>
								<div className="user-details"></div>
								<div>
									<div
										style={{
											backgroundImage: `url('${user?.profileImg}')`,
										}}
										className="img-size-user"
									></div>
								</div>
								{/* <div>{user.username}</div> */}
								<Link
									className="user-link"
									to={`/users/${user.id}`}
								>
									{user.username}
								</Link>

									<div>
										{user.propertyType == "Residential" ? (
											<FontAwesomeIcon
												className="house"
												icon={faHouse}
											/>
										) : (
											<FontAwesomeIcon
												className="house"
												icon={faWarehouse}
											/>
										)}
										{user.propertyType}
									</div>

								{/* <button
									onClick={() => handleDeleteHire(user?.id)}
								>
									Remove Hire
								</button> */}
							</div>
						) : (
							<div></div>
						)
					)}
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};


export default GetHires;
