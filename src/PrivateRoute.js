import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import { useAuth } from "context/auth";
const PrivateRoute = ({ element }) => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    return auth.user ? element : navigate("/authentication/sign-in");
};
PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired,
};
export default PrivateRoute;
