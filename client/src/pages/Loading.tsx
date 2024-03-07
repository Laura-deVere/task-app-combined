import "./loading.scss";

const className = "loading-spinner";
const classNamePrefix = `${className}__`;

const PageLoading = () => {
	return (
		<div className={className}>
			<span className='sr-only'>Loading</span>
			<svg
				className={`${classNamePrefix}svg`}
				width='65px'
				height='65px'
				viewBox='0 0 66 66'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle
					className={`${classNamePrefix}path`}
					fill='none'
					strokeWidth='6'
					strokeLinecap='round'
					cx='33'
					cy='33'
					r='30'
				></circle>
			</svg>
		</div>
	);
};

export default PageLoading;
