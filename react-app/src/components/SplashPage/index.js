import "./SplashPage.css"
import town from "../SplashPage/town.svg"

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
				</header>
			</body>
		</>
	);

}

export default SplashPage;
