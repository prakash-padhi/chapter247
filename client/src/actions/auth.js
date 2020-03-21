import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../authToken/setAuthToken";
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT
} from "./types";


// Load All Transactions
export const updateTransaction = () => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	const body = JSON.stringify({});
	try {
		const res = await axios.post("/api/updateTransaction", body, config);
		dispatch(setAlert("Transaction updated", "success"));
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get("/api/login");
		if (res.data !== null) {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		} else {
			dispatch({ type: LOGOUT });
			dispatch(setAlert("Authentication error.", "danger"));
		}
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};


// Register User
export const register = (name, email, password) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post("/api/register", body, config);
		dispatch(setAlert("Registered successfully. Please login..!", "success"));
		return res;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
	}
};


//Reset Password
export const resetPasswordAction = (email) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ email });

	try {
		const res = await axios.post("/api/resetPassword", body, config);
		dispatch(setAlert(res.data.successMsg, "success"));
		return res;
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
	}
};


// Login User
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post("/api/login", body, config);
		dispatch(setAlert("Login successfull", "success"));
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// Logout / Clear Profile
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
	dispatch(setAlert("Logout successfull.", "success"));
};
