
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
	const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
  return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sign-up"
						exact={true}
						activeClassName="active"
					>
						Sign Up
					</NavLink>
				</li>
				{/* <li>
					<NavLink to="/users" exact={true} activeClassName="active">
						Users
					</NavLink>
				</li> */}
				{/* <li>
					<NavLink
						to="/users/profile"
						exact={true}
						activeClassName="active"
					>
						Become a Property Manager
					</NavLink>
				</li> */}
				<li>
					{sessionUser?.id && (
						<button
							className="btn-create-profile"
							onClick={() => history.push("/users/create")}
						>
							Become a Property Manager
						</button>
					)}
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
		</nav>
  );
}

export default NavBar;
