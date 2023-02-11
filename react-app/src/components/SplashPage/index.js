import "./SplashPage.css"
import town from "../SplashPage/town.svg"
import {Link} from 'react-router-dom'

const SplashPage =() =>{
    return (
		<>
			<body>
				<header id="container">
					<h1 className="splashText">
						Need a Hand with Your Property?
					</h1>
					<h2 className="splashText">Managed Has You Covered! </h2>
					<img
						className="img-splash"
						src={town}
						alt="we'll help you manage your properties!"
					/>
					{/* <div className="splash-button">
						<Link to={`/login`}>
							<button>Login</button>
						</Link>
						<Link to={`/sign-up`}>
							<button>Sign Up</button>
						</Link>
					</div> */}
				</header>
			</body>
		</>
	);

}

export default SplashPage;
