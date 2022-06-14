import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/" />
                    )
            }
        />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: state.userReducer.isAuthenticated,
});
PrivateRoute.propTypes = {
   
    component: PropTypes.func,
    isAuthenticated: PropTypes.bool
  }
export default connect(mapStateToProps, null)(PrivateRoute);