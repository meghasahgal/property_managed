import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from "./components/HomePage";
import { authenticate } from "./store/session";
import { getAllUsersThunk } from "./store/users";
import UserById from "./components/UserById";
import ReviewsByUserId from "./components/ReviewsByUserId";
import GetHires from "./components/GetHires";
import GetLoves from "./components/GetLoves";
import CreateHire from "./components/CreateHire"
import EditProfile from "./components/EditProfile";
import CreateProfile from "./components/CreateProfile";
import CreateReview from "./components/CreateReview";
import EditReview from "./components/EditReview";
import BecomePMConfirmation from "./components/BecomePMConfirmation";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
// import Search from "./components/Search";
import { getAllReviewsThunk } from "./store/reviews";
import { getAllHiresThunk } from "./store/hires";
import {getAllLovesThunk} from "./store/loves"

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllUsersThunk());
		dispatch(getAllReviewsThunk());
		dispatch(getAllHiresThunk())
		dispatch(getAllLovesThunk())
	});

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path={["/", "/users"]} exact={true}>
					<HomePage />
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/my-hires" exact={true}>
					<GetHires />
				</ProtectedRoute>
				{/* <ProtectedRoute path="/search" exact={true}>
					<Search />
				</ProtectedRoute> */}

				{/* <ProtectedRoute path="/my-loves" exact={true}>
					<GetLoves />
				</ProtectedRoute> */}

				{/* <ProtectedRoute path="/users/reviews" exact={true}>
					<ReviewsByUserId />
				</ProtectedRoute> */}
				{/* <Route exact path="/users/:userId/profile">
					<CreateProfile />
				</Route> */}
				<ProtectedRoute path="/users/:userId" exact={true}>
					<UserById />
				</ProtectedRoute>
				<ProtectedRoute exact path="/users/:userId/edit">
					<EditProfile />
				</ProtectedRoute>
				<Route exact path="/users/:userId/hire">
					<CreateHire />
				</Route>
				<Route path="/users/:userId/confirmation" exact={true}>
					<BecomePMConfirmation />
				</Route>
				<Route exact path="/users/:userId/reviews/edit">
					<EditReview />
				</Route>
				<Route exact path="/users/:userId/reviews">
					<CreateReview />
				</Route>
				<Route path="/">
					<PageNotFound />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
