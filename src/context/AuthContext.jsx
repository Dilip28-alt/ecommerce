import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStoredLoggedInUser, 
  setStoredLoggedInUser, 
  registerUser, 
  findUserByEmail 
} from '../utils/localStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredLoggedInUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = findUserByEmail(email);
    if (!user) {
      return { success: false, message: "User not found. Please register first." };
    }
    if (user.password !== password) {
      return { success: false, message: "Invalid email or password." };
    }

    const sessionUser = { fullName: user.fullName, email: user.email };
    setCurrentUser(sessionUser);
    setStoredLoggedInUser(sessionUser);
    return { success: true };
  };

  const register = (fullName, email, password) => {
    const existing = findUserByEmail(email);
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = { fullName, email, password };
    registerUser(newUser);
    
    // Automatically log in after successful registration
    const sessionUser = { fullName, email };
    setCurrentUser(sessionUser);
    setStoredLoggedInUser(sessionUser);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setStoredLoggedInUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
