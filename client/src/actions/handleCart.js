import { PRODUCT_ADDED, PRODUCT_REMOVED, CART_CLEAR } from "./types";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

export const productAdded = (product) => dispatch => {
	dispatch({
		type: PRODUCT_ADDED,
		payload: product
	});
	dispatch(setAlert("Product added to cart", "success"));
};
export const productRemoved = (product) => dispatch => {
	dispatch({
		type: PRODUCT_REMOVED,
		payload: product
	});
	dispatch(setAlert("Product removed from cart", "danger"));
};
export const paymentSuccess = () => dispatch => {
	dispatch(setAlert("Payment successfull", "success"));
	dispatch(cartClear());
	dispatch(loadUser());
};
export const paymentFailed = () => dispatch => {
	dispatch(setAlert("Payment Failed", "danger"));
};
export const cartClear = () => dispatch => {
	dispatch({
		type: CART_CLEAR
	});
};

