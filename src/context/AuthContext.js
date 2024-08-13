// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // ou vérifiez le token d'authentification ici

    const login = (userInfo) => {
        setUser(userInfo);
        // Stockez le token ou les informations de l'utilisateur
    };

    const logout = () => {
        setUser(null);
        // Supprimez le token ou les informations de l'utilisateur
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
