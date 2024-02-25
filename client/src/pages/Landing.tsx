import { Link } from "react-router-dom";

const PageLanding: React.FC<{}> = () => {
	return (
		<section
			id='pageLanding'
			className='login'
			style={{
				color: "#fff",
				display: "flex",
				width: "100%",
				height: "100vh",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<p>Please login</p>
			<div>
				<Link to='/login'>Sign in</Link>
				<Link to='/register'>Sign up</Link>
			</div>
		</section>
	);
};

export default PageLanding;
