import React, { Fragment } from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomSpinner from "./spinners/Spinner";
import CustomAlert from "./Alert";
import productData from "./data/Products.json";
import { Row, Col, Card, CardImg, CardBody, CardTitle, Button, Spinner } from 'reactstrap';
import { FaCartPlus } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { productAdded, productRemoved } from "../actions/handleCart";

const Dashboard = ({
	auth: { loading }, productAdded, productRemoved
}) => {
	const [maxLength, setMaxLength] = React.useState(6);
	const [hasMore, setHasMore] = React.useState(true);
	const [items, setItems] = React.useState([]);

	const loadItems = () => {
        var products = [];
		for (var i = 0; i < maxLength; i++) {
           products.push(productData[i]);
        }
        return products;
	};
	
	const fetchMoreData = () => {
        if (maxLength >= productData.length) {
            setHasMore(false);
            return;
		}
        setTimeout(() => {
			setMaxLength( maxLength + 6 );
			setItems(loadItems());
		}, 1000);
	};
	
	const _productAdded = (data) => {
        if (data !== null) {
			productAdded(data);
        }
	};
	React.useEffect(() => {
		setItems(loadItems());
		setMaxLength( maxLength => maxLength + 6 );
	}, []);

	return (
		<Fragment>
			<Container className="themed-container">
				<div className="productsData__wrapper">
					<CustomAlert />
					{loading ? (
						<CustomSpinner />
					) : 
					(
					<div>
						<InfiniteScroll
						dataLength={maxLength}
						next={fetchMoreData}
						hasMore={hasMore}
						loader={(<div className="w-100 text-center mt-4 mb-2">
							<Spinner color="success" style={{ width: '3rem', height: '3rem' }} />
							</div>)}
						endMessage={ <p className="text-center mt-3 mb-2"><b>Yay! You have seen it all</b></p>}
						>
							<Row>
							{items.map((data, index) => (
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
													<Button color="success" onClick={e => _productAdded(data)}><FaCartPlus /> Add to cart</Button>
												</div>
											</CardBody>
										</Card>
									</div>
								</Col>
							))}
							</Row>
						</InfiniteScroll>
					</div>	
					)}
				</div>
			</Container>
		</Fragment>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	productAdded: PropTypes.func.isRequired,
	productRemoved: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	productAdded: PropTypes.func.isRequired,
	productRemoved: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { productAdded, productRemoved })(Dashboard);