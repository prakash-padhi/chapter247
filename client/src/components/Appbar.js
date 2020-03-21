import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { GoHistory } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { IoIosCart } from "react-icons/io";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Spinner
} from "reactstrap";

const MyNavbar = ({ auth: { isAuthenticated, loading, user }, cart, logout }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const toggleButton = <NavbarToggler onClick={toggle} />;
	const checkUser = userData => {
		if (userData !== null) {
			return true;
		} else {
			return false;
		}
	};
	const checkCart = cartData => {
		if (cartData !== null) {
			return true;
		}
		else {
			return false;
		}
	};
	const authLinks = (
		<Collapse isOpen={isOpen} navbar>
			<Nav className="ml-auto" navbar>
				<NavItem>
					<Link to="/transactions" className="nav-link">
						<GoHistory /> Transactions
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/cart" className="nav-link">
						<IoIosCart /> Cart (<Fragment>{checkCart(cart) ? cart.length : <Spinner color="light" />}</Fragment>)
					</Link>
				</NavItem>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						{isAuthenticated && (
							<Fragment>
								{checkUser(user) ? user.name : <Spinner color="light" />}
							</Fragment>
						)}
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem onClick={logout}>
							<FiLogOut /> Logout
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		</Collapse>
	);
	return (
		<div id="navBar__wrapper" className="py-2 container">
			<Navbar className={!loading ? !isAuthenticated ? "justify-content-center" : "" : ""} color="dark" dark expand="md">
				<NavbarBrand href="/" className="m-0">
					<p className="brandLogo m-0 py-2">
						<span className="brandName">Chapter247</span>
					</p>
				</NavbarBrand>
				{!loading && <Fragment>{isAuthenticated && toggleButton}</Fragment>}
				{!loading && <Fragment>{isAuthenticated && authLinks}</Fragment>}
			</Navbar>
		</div>
	);
};

MyNavbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	cart: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	cart: state.cart
});

export default connect(mapStateToProps, { logout })(MyNavbar);
