import "./SplashPage.css"
import town from "../SplashPage/town.svg"
import {Link} from 'react-router-dom'

const SplashPage =() =>{
    return (
		<>
			<body className="splash-body">
				<header id="container">
					<div className="splashBig">
						Need a Hand with Your Property?
					</div>
					<h2 className="splashText">Managed Has You Covered! </h2>
					<img
						className="img-splash"
						src={town}
						alt="we'll help you manage your properties!"
					/>

				</header>
			</body>
		</>
	);

}

export default SplashPage;
