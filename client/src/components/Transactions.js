import React, { Fragment } from "react";
import { Container } from "reactstrap";
import { Row, Col, Card, CardImg, CardBody, CardTitle, UncontrolledCollapse, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomSpinner from "./spinners/Spinner";
import CustomAlert from "./Alert";

const Transactions = ({
	auth: { loading, isAuthenticated, user },
}) => {

    const loadTransactions = data => {
        if (data.length >= 1) {
            return true;
        }
        else {
            return false;
        }
    };

	return (
		<Fragment>
			<Container className="themed-container">
				<div className="transactionsData__wrapper">
					<CustomAlert />
					{loading ? (
						<CustomSpinner />
					) : 
					(
                    <Fragment>
                        { loadTransactions(user.transactions) ? 
                        (<Fragment>
							{user.transactions.map((data, i) => (
                                <div className="Single_Transaction my-3 py-3" key={i}>
                                    <Row className="justify-content-center">
                                        {data.cartData.map((item, index) => (
                                            <Col xs="12" sm="12" md="6" lg="4" key={index}>
                                                <div className="Product_Wrapper my-2 mx-2">
                                                    <Card>
                                                        <CardImg top width="100%" src={item.Image} className="Product__Logo" alt="Product Logo" />
                                                        <CardBody>
                                                            <CardTitle className="text-center">{item.Name}</CardTitle>
                                                            <div className="buy d-flex justify-content-center align-items-center">
                                                                <div className="price text-success">
                                                                    <h5 className="m-0 text-center">₹{item.Price}</h5>
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                             </Col>
                                        ))}
                                    </Row>
                                    <div className="text-center">
                                        <Button color="primary" id={"toggler-"+ i } className="my-2">Payment Details</Button>
                                        <UncontrolledCollapse toggler={"#toggler-"+ i }>
                                            <Card className="w-75 m-auto">
                                                <CardBody>
                                                    <p className="text-success my-2">Total Amount: ₹{data.finalAmount}</p>
                                                    <p className="text-success my-2">Transaction Date: {data.transactionDate}</p>
                                                    <p className="text-success my-2">Payment Method: {data.paymentDetails.brand}</p>
                                                    <p className="text-success my-2">Card Details: **** **** **** {data.paymentDetails.last4}</p>
                                                </CardBody>
                                            </Card>
                                        </UncontrolledCollapse>
                                        </div>
                                </div>
							))}
                        </Fragment>) : 
                        <p className="empty text-center">No Transactions Found</p>
                        }
                    </Fragment>
                    )}
				</div>
			</Container>
		</Fragment>
	);
};

Transactions.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Transactions);