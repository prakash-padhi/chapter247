import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { IoMdKey } from "react-icons/io";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
import { register } from "../actions/auth";
import { resetPasswordAction } from "../actions/auth";

import Alert from "./Alert";

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import {
	Form,
	FormGroup,
	Label,
	Input,
	Card,
	Button,
	CardBody
} from "reactstrap";
import Spinner from "./spinners/Spinner";

const Landing = ({ login, register, resetPasswordAction, isAuthenticated, loading }) => {

	const [activeTab, setActiveTab] = useState('1');
	const [resetPasswordToggle, setResetPasswordToggle] = useState(false);

	const toggle = tab => {
	  if(activeTab !== tab) setActiveTab(tab);
	}
	const [resetFormData, setResetFormData] = useState({
		resetEmail: ""
	});
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});
	const [registerFormData, setRegisterFormData] = useState({
		userName: "",
		userEmail: "",
		userPassword: ""
	});
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	const { resetEmail } = resetFormData;

	const { email, password } = formData;

	const { userName, userEmail, userPassword } = registerFormData;

	const _handleReset = e => {
		setResetFormData({ ...resetFormData, [e.target.name]: e.target.value });
	};
	const _handleChange = e => {
		setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
	};

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const _handleSubmit = async e => {
		e.preventDefault();
		register(userName, userEmail, userPassword).then(function(res){
			if (res) {
				toggle('1');
			}
		})
	};

	const onSubmit = async e => {
		e.preventDefault();
		login(email, password);
	};

	const onPasswordReset = async e => {
		e.preventDefault();
		resetPasswordAction(resetEmail).then(function(res){
			if (res) {
				setResetPasswordToggle(false);
			}
		})
	};

	const ResetPasswordComponent = (
		<Fragment>
			<div>
				<Nav tabs>
					<NavItem className="w-100">
					<NavLink className="active">Reset Password</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
				<Row>
					<Col sm="12">
						<Fragment>
							<Row>
								<Col>
									<Card>
										<CardBody>
											<Alert />
											<Row className="form__wrapper">
												<Col lg="12">
													<Form id="userResetPassword" onSubmit={e => onPasswordReset(e)}>
														<FormGroup className="mt-sm-2 mb-sm-2">
															<Label for="resetEmail" className="mr-sm-2">
																Email
															</Label>
															<Input
																type="email"
																name="resetEmail"
																id="resetEmail"
																value={resetEmail}
																onChange={e => _handleReset(e)}
																bsSize="lg"
																required
															/>
														</FormGroup>
														<FormGroup className="mt-sm-4 mb-sm-4">
															<Button
																className="reset__submit"
																type="submit"
																size="lg"
																block
															>
																<IoMdKey /> Reset
															</Button>
														</FormGroup>
														<FormGroup className="mt-sm-2 mb-sm-2">
															<p className="in-out text-center mt-4">Remembered password?
																<span className="ml-2 Return__To" onClick={() => { setResetPasswordToggle(false) }}>Login</span>
															</p>
														</FormGroup>
													</Form>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</Fragment>
					</Col>
				</Row>
				</TabPane>
			</TabContent>
			</div>
		</Fragment>
	);
	return (
		<Fragment>
			<Container className="themed-container">
				<div className="Landing__Form-Wrapper">
				{!resetPasswordToggle ? (
					<Fragment>
					{!loading ? (
						<div>
							<Nav tabs>
								<NavItem className="w-50">
								<NavLink
									className={classnames({ active: activeTab === '1' })}
									onClick={() => { toggle('1'); }}
								>
									Log In
								</NavLink>
								</NavItem>
								<NavItem className="w-50">
								<NavLink
									className={classnames({ active: activeTab === '2' })}
									onClick={() => { toggle('2'); }}
								>
									Sign Up
								</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeTab={activeTab}>
								<TabPane tabId="1">
								<Row>
									<Col sm="12">
									{!loading ? (
										<Fragment>
											<Row>
												<Col>
													<Card>
														<CardBody>
															<Alert />
															<Row className="form__wrapper">
																<Col lg="12">
																	<Form id="userLogin" onSubmit={e => onSubmit(e)}>
																		<FormGroup className="mt-sm-2 mb-sm-2">
																			<Label for="adminEmail" className="mr-sm-2">
																				Email
																			</Label>
																			<Input
																				type="email"
																				name="email"
																				id="adminEmail"
																				value={email}
																				onChange={e => onChange(e)}
																				bsSize="lg"
																				required
																			/>
																		</FormGroup>
																		<FormGroup className="mt-sm-2 mb-sm-2">
																			<Label for="adminPassword" className="mr-sm-2">
																				Password
																			</Label>
																			<Input
																				type="password"
																				name="password"
																				id="adminPassword"
																				value={password}
																				onChange={e => onChange(e)}
																				bsSize="lg"
																				required
																			/>
																		</FormGroup>
																		<FormGroup className="mt-sm-4 mb-sm-4">
																			<Button
																				className="login__submit"
																				type="submit"
																				size="lg"
																				block
																			>
																				<FiLogIn /> Log In
																			</Button>
																		</FormGroup>
																		<FormGroup className="mt-sm-2 mb-sm-2">
																			<p className="in-out text-center mt-4">Forget Password?
																				<span className="ml-2 Return__To" onClick={() => { setResetPasswordToggle(true) }}>Reset Here</span>
																			</p>
																		</FormGroup>
																		<FormGroup className="mt-sm-2 mb-sm-2">
																			<p className="in-out text-center mt-4">Don't have an account?
																				<span className="ml-2 Return__To" onClick={() => { toggle('2'); }}>Sign Up Here</span>
																			</p>
																		</FormGroup>
																	</Form>
																</Col>
															</Row>
														</CardBody>
													</Card>
												</Col>
											</Row>
										</Fragment>
									) : (
										<Spinner />
									)}
									</Col>
								</Row>
								</TabPane>
								<TabPane tabId="2">
								<Row>
									<Col sm="12">
										{!loading ? (
											<Fragment>
												<Row>
													<Col>
														<Card>
															<CardBody>
																<Alert />
																<Row className="form__wrapper">
																	<Col lg="12">
																		<Form id="userRegister" onSubmit={e => _handleSubmit(e)}>
																		<FormGroup className="mt-sm-2 mb-sm-2">
																				<Label for="userName" className="mr-sm-2">
																					Name
																				</Label>
																				<Input
																					type="text"
																					name="userName"
																					id="userName"
																					value={userName}
																					onChange={e => _handleChange(e)}
																					bsSize="lg"
																					required
																				/>
																			</FormGroup>
																			<FormGroup className="mt-sm-2 mb-sm-2">
																				<Label for="userEmail" className="mr-sm-2">
																					Email
																				</Label>
																				<Input
																					type="email"
																					name="userEmail"
																					id="userEmail"
																					value={userEmail}
																					onChange={e => _handleChange(e)}
																					bsSize="lg"
																					required
																				/>
																			</FormGroup>
																			<FormGroup className="mt-sm-2 mb-sm-2">
																				<Label for="userPassword" className="mr-sm-2">
																					Password
																				</Label>
																				<Input
																					type="password"
																					name="userPassword"
																					id="userPassword"
																					value={userPassword}
																					onChange={e => _handleChange(e)}
																					bsSize="lg"
																					required
																				/>
																			</FormGroup>
																			<FormGroup className="mt-sm-4 mb-sm-4">
																				<Button
																					className="register__submit"
																					type="submit"
																					size="lg"
																					block
																				>
																					<FiUserPlus /> Sign Up
																				</Button>
																			</FormGroup>
																			<FormGroup className="mt-sm-2 mb-sm-2">
																			<p className="in-out text-center mt-4">Already have an account? 
																				<span className="ml-2 Return__To" onClick={() => { toggle('1'); }}>Log In Here</span>
																			</p>
																			</FormGroup>
																		</Form>
																	</Col>
																</Row>
															</CardBody>
														</Card>
													</Col>
												</Row>
											</Fragment>
										) : (
											<Spinner />
										)}
									</Col>
								</Row>
								</TabPane>
							</TabContent>
						</div>
					) : (
						<Spinner />
					)} </Fragment>
				) : (
					<Fragment>
						{ResetPasswordComponent}
					</Fragment>
				)}
				</div>
			</Container>
		</Fragment>
	);
};

Landing.propTypes = {
	login: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	resetPasswordAction: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool
};

const mapStateToProps = state => ({
	login: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	resetPasswordAction: PropTypes.func.isRequired,
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading
});

export default connect(mapStateToProps, { login, register, resetPasswordAction })(Landing);
