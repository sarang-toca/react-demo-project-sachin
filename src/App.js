import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./routing/PrivateRoute";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
//  import setAuthToken from "./utils/setAuthToken";
//  import store from "./store";
//  import { loadUser } from "./actions/auth";

// if (localStorage.token) {
// 	setAuthToken(localStorage.token);
// }

function App() {
	// useEffect(() => {
	// 	store.dispatch(loadUser());
	// }, []);
	return (
		
		<>
			<div className="App">
				<Router>
					<Navbar />
					<Switch>
						{/* <Route exact path="/" component={Landing} /> */}
						<Route exact path="/" component={Register} />
						<Route exact path="/login" component={Login} />
						{/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
						<PrivateRoute exact path="/dashboard">
            <Dashboard/>
        </PrivateRoute>
						<Route exact path="/users" component={NotFound} />
					</Switch>
				</Router>
			</div>
		</>
	);
}

export default App;