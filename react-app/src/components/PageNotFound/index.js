import React from "react";
import "./PageNotFound.css";
import { useHistory } from "react-router-dom";
import notfound from "../PageNotFound/notfound.jpeg";

const PageNotFound = () => {
	const history = useHistory();
	const routeChangeToHome = (e) => {
		history.push("/");
	};

	return (
		<div className="page-not-found">
			<h1>Oops!</h1>
			<p>We can't seem to find the page you're looking for.</p>
			<img className = "img-pnf" src={notfound} alt="not found, sadly..." />

			<button  onClick={routeChangeToHome}>
				Go Back Home
			</button>
		</div>
	);
};

export default PageNotFound;
