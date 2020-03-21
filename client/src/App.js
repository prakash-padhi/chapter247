import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Appbar from "./components/Appbar";
import Landing from "./components/Landing";
import "./App.css";
import Routes from "./routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store/store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./authToken/setAuthToken";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Appbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
