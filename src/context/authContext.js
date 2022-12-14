import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, inputs, { withCredentials: true }); // withCredentials: true is needed to send the cookie to backend
        setCurrentUser(res.data);
    };

    const logout = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, { withCredentials: true }); // withCredentials: true is needed to get the cookie from backend
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};