import React, { Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";
import { connect } from "react-redux";
import CustomSpinner from "./spinners/Spinner";
import CustomAlert from "./Alert";
import { Row, Col, Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import { cartClear, productRemoved, paymentSuccess, paymentFailed } from "../actions/handleCart";
import StripeCheckout from "react-stripe-checkout";


const CartPage = ({
	auth: { loading, user, isAuthenticated }, cartStore, cartClear, productRemoved, paymentSuccess, paymentFailed
}) => {
	const [cartData, setCartData] = React.useState({
		cart: [],
		cartAmount: 0
	});
	const loadCartItems = (cart) => {
        if (cart.length >= 1) {
            return true;
        }
        else {
            return false;
        }
	};

	const goToDashBoard = () => {
		return <Redirect to='/dashboard' />
	};

	async function handleToken(token, addresses) {
		const response = await axios.post(
		  "api/checkout",
		  { token, cartData }
		);
		const { status } = response.data;
		console.log("Response:", response.data);
		if (status === "success") {
			paymentSuccess();
			goToDashBoard()
		} else {
		   paymentFailed();
		}
	}

	const _cartClear = () => {
		cartClear();
	};
	const _removeProduct = (data) => {
        productRemoved(data);
	};
	React.useEffect(() => {
		const initialValue = 0;
			const totalCartPrice = cartStore.reduce((total, currentValue) => {
				return total + parseInt(currentValue.Price);
			}, initialValue);
			console.log(totalCartPrice);
			setCartData({
				cart: cartStore,
				cartAmount: totalCartPrice
			});
	}, [cartStore])


	return (
		<Fragment>
			<Container className="themed-container">
				<div className="cartData__wrapper">
					<CustomAlert />
					{loading ? (
						<CustomSpinner />
					) : 
					(
                    <Fragment>
                        { loadCartItems(cartStore) ? 
                        (<Fragment>
                            <Row>
							{cartStore.map((data, index) => (
								<Col xs="12" sm="12" md="6" lg="4" key={index}>
									<div className="Product_Wrapper my-2">
										<Card>
											<CardImg top width="100%" src={data.Image} className="Product__img" alt="Product Logo" />
											<CardBody>
												<CardTitle>{data.Name}</CardTitle>
												<div className="buy d-flex justify-content-between align-items-center">
													<div className="price text-success">
														<h5 className="m-0">₹{data.Price}</h5>
													</div>
													<Button color="danger" onClick={e => _removeProduct(data)}><AiOutlineDelete /> Remove</Button>
												</div>
											</CardBody>
										</Card>
									</div>
								</Col>
							))}
							</Row>
                            <div className="Checkout__Section my-3">
                            <div className="buy d-flex justify-content-between align-items-center">
                            <Button className="py-3 my-0 mx-2 w-50" color="danger" block onClick={e => _cartClear()}>Clear Cart</Button>
                            <StripeCheckout
								stripeKey="pk_test_2oUwbRBYeV6xwg3NPJAVSqN200PwvSkb6V"
								token={handleToken}
								amount={cartData.cartAmount * 100}
								name="Chapter247 Checkout"
								billingAddress
								shippingAddress
							/>
                            </div>
                            </div>
                        </Fragment>) : 
                        <p className="empty text-center">Empty cart</p>
                        }
                    </Fragment>
                    )}
				</div>
			</Container>
		</Fragment>
	);
};

CartPage.propTypes = {
    auth: PropTypes.object.isRequired,
    cartStore: PropTypes.array.isRequired,
	cartClear: PropTypes.func.isRequired,
	productRemoved: PropTypes.func.isRequired,
	paymentSuccess: PropTypes.func.isRequired,
	paymentFailed: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    cartStore: state.cart,
	cartClear: PropTypes.func.isRequired,
	productRemoved: PropTypes.func.isRequired,
	paymentSuccess: PropTypes.func.isRequired,
	paymentFailed: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { cartClear, productRemoved, paymentSuccess, paymentFailed })(CartPage);