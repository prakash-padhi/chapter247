import React from "react";
import { Route, Switch } from "react-router-dom";
import Transactions from "../components/Transactions";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import ResetPasswordContainer from '../components/GuestComponents/ResetPassword';
import CartPage from "../components/CartPage";
import PrivateRoute from "../routing/PrivateRoute";
import PublicRoute from "../routing/PublicRoute";


const Routes = () => {
	return (
		<Switch>
			<PublicRoute exact path="/resetPassword/:token" component={ResetPasswordContainer} />
			<PrivateRoute path="/cart" component={CartPage} />
			<PrivateRoute path="/dashboard" component={Dashboard} />
			<PrivateRoute path="/transactions" component={Transactions} />
			<Route path="*" component={NotFound} />
		</Switch>
	);
};

export default Routes;
