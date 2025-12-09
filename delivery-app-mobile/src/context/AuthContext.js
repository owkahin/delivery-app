import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setAuthToken(storedToken);
            }
        } catch (error) {
            console.error('Error loading auth:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            const { token: newToken, user: newUser } = response.data;

            setToken(newToken);
            setUser(newUser);
            setAuthToken(newToken);

            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('user', JSON.stringify(newUser));

            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.msg || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await authAPI.register(name, email, password);
            const { token: newToken, user: newUser } = response.data;

            setToken(newToken);
            setUser(newUser);
            setAuthToken(newToken);

            await AsyncStorage.setItem('token', newToken);
            await AsyncStorage.setItem('user', JSON.stringify(newUser));

            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.msg || 'Registration failed' };
        }
    };

    const logout = async () => {
        setToken(null);
        setUser(null);
        setAuthToken(null);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
