import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import NotFoundImg from "../assets/404.png";
import { Container, Jumbotron, Button } from "reactstrap";

const NotFound = () => {
	return (
		<Fragment>
			<Container className="themed-container">
				<div className="notFound__wrapper">
					<Jumbotron>
						<img src={NotFoundImg} className="not_foundPageLogo" alt="Not Found" />
						<hr className="mt-3 mb-4" />
						<p>
							404 Not Found
						</p>
						<p className="lead">
							<Button color="dark">
								<Link to="/">Back To Homepage</Link>
							</Button>
						</p>
					</Jumbotron>
				</div>
			</Container>
		</Fragment>
	);
};

export default NotFound;
