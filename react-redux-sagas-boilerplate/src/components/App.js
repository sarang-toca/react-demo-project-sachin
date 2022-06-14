import * as React from 'react';
import { Route, Switch } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import setAuthToken from "../utils/ setAuthToken";
import HomePage from "./home/HomePage";
import Header from "../components/common/Header";
import PageNotFound from "./PageNotFound";
import Register from "./register/Register";
import Login from "./login/Login";
import News from "./news/News";
import Account from "./account/Account";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from 'react-redux';
import { setCurrentUser, logOutUser } from "../redux/actions/action";
import PropTypes from 'prop-types';


const App = () => {

 
    
    return (
        <>
           
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/news" component={News} />
                <PrivateRoute exact path="/account" component={Account} />
                <Route component={PageNotFound} />
            </Switch>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
            />
        </>
    );
}

const mapDispatchToProps = {
    logOutUser: logOutUser,
    setCurrentUser: setCurrentUser,
    
};
App.propTypes = {
   
    setCurrentUser: PropTypes.func,
    logOutUser: PropTypes.func
  }

export default connect(null, mapDispatchToProps)(App);