import React, { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";

// import axios from "axios";
import clientapi from "api/clientapi";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //default axios
    clientapi.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                userId: parseData.user._id,
                token: parseData.token,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };