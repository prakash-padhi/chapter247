import React, { Fragment } from "react";
import Loader from "react-loader-spinner";

export default () => (
	<Fragment>
		<div
			className="spinner__wrapper"
			style={{
				position: "relative",
				width: "100%",
				height: "70vh",
				backgroundColor: "#FFFFFF",
				zIndex: "2"
			}}
		>
			<div
				className="spinner__middle"
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)"
				}}
			>
				<Loader type="Oval" color="#00BFFF" height={100} width={100} />
			</div>
		</div>
	</Fragment>
);
