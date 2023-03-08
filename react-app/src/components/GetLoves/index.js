import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getLovesByUserIdThunk,
	deleteLoveThunk,
	createLovesByUser,
} from "../../store/loves";
import { getUserThunk, getAllUsersThunk } from "../../store/users";

import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const GetLoves = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const users = useSelector(
		(state) => state.users[sessionUser.id]?.lovesAsUserId1
	);
    console.log(users, "users in get loves")
	const allUsers = Object.values(useSelector((state) => state.users));
    const allLovesArray = useSelector((state) => {
		if (state?.loves) {
			return Object.values(state?.loves);
		} else return undefined;
	});
    const filteredLoves = allLovesArray.map((love) => love.user2_id);
    console.log(filteredLoves, "filtered loves")

	// console.log(filteredHires, "filteredHIRES")
	const result = allUsers.filter(({ id }) => filteredLoves.includes(id));

	return(<>
			<div>
				{result.length === 0 ? <h2>No Loves Yet!</h2> : <h2>My Loves:</h2>}
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
}

export default GetLoves;
