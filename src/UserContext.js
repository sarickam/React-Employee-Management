import React, { createContext, useState, useContext } from 'react';

// Create a context for user state
const UserContext = createContext();

// User provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        userName: "",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
