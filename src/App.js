import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { ROUTES, VERSION } from "./utils/constants/Constants";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Certificate from "./pages/main/components/certificates/edit/Certificate";
import Participants from "./pages/main/components/participants/Participants";
import Template from "./pages/main/components/templates/edit/Template";
import Delegates from "./pages/main/components/administrative/list/Delegates";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path={ROUTES.LOGIN} component={Login} />
						<Route exact path={ROUTES.LIST} component={Main} />
						<Route exact path={ROUTES.TEMPLATES} component={Main} />
						<Route exact path={ROUTES.CERTIFICATES_PENDING} component={Main} />
						<Route exact path={ROUTES.CERTIFICATES} component={Main} />
						<Route exact path={ROUTES.CERTIFICATES_REVOKED} component={Main} />
						<Route exact path={ROUTES.PRESENTATIONS} component={Main} />
						<Route path={ROUTES.EDIT_TEMPLATE} component={Template} />
						<Route path={ROUTES.EDIT_CERT} component={Certificate} />
						<Route path={ROUTES.QR_REQUEST} component={Participants} />
						<Route path={ROUTES.DELEGATES} component={Delegates} />
					</Switch>
				</Router>
				<h6 className="Version">v{VERSION}</h6>
			</div>
		);
	}
}

export default App;
