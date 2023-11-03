import React, { useEffect } from "react";
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
    // auth: PropTypes.object.isRequired,
};
export default PrivateRoute;



// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../Spinner";

// export default function PrivateRoute() {
//     const [ok, setOk] = useState(false);
//     const [auth, setAuth] = useAuth();

//     useEffect(() => {
//         const authCheck = async () => {
//             const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
//             if (res.data.ok) {
//                 setOk(true);
//             } else {
//                 setOk(false);
//             }
//         };
//         if (auth?.token) authCheck();
//     }, [auth?.token]);

//     return ok ? <Outlet /> : <Spinner />;
// }