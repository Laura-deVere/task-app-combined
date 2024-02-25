const PageLanding = () => {
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
				<button>Sign in</button>
				<button>Sign up</button>
			</div>
		</section>
	);
};

export default PageLanding;
