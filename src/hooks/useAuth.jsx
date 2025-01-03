// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, createContext, useContext } from 'react';
import api, { socialLogin, setAuthToken } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1] || '';
  console.log('CSRF Token:', csrfToken); // Debugging
  return csrfToken;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenRefreshTimeout, setTokenRefreshTimeout] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await api.get('csrf/');
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken) {
          if (isTokenValid(savedToken)) {
            setAuthToken(savedToken);
            setupTokenRefresh(savedToken);
            await fetchUserData();
          } else {
            await refreshToken();
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        handleAuthError(error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    return () => {
      if (tokenRefreshTimeout) clearTimeout(tokenRefreshTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log('Token expiration:', decoded.exp); // Debugging
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  const setupTokenRefresh = (token) => {
    if (typeof token !== 'string') {
      console.error('Invalid token specified: must be a string');
      signOut();
      return;
    }
  
    try {
      const { exp } = jwtDecode(token);
      const refreshTime = exp * 1000 - Date.now() - 60000; // Refresh 1 minute before expiration
      console.log('Token refresh scheduled in:', refreshTime, 'ms'); // Debugging
  
      if (tokenRefreshTimeout) clearTimeout(tokenRefreshTimeout);
  
      if (refreshTime > 0) {
        const timeoutId = setTimeout(() => refreshToken(), refreshTime);
        setTokenRefreshTimeout(timeoutId);
      } else {
        console.error('Token is expired or about to expire');
        signOut();
      }
    } catch (error) {
      console.error('Token refresh setup failed:', error);
      signOut();
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await api.post('token/refresh/', { refresh: refreshToken });
      const { access } = response.data;
      console.log('New access token:', access); // Debugging
      
      localStorage.setItem('accessToken', access);
      setAuthToken(access);
      setupTokenRefresh(access);
      
      return access;
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleAuthError(error);
      throw error;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get('me/');
      setUser(response.data);
      console.log('Fetched user data:', response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      handleAuthError(error);
      throw error;
    }
  };

  const handleSocialLoginCallback = async (accessToken) => {
    try {
      console.log('Starting social login callback');
      const userData = await socialLogin.handleCallback(accessToken);
      setUser(userData);
      console.log('Social login user data:', userData); // Debugging
      return userData;
    } catch (error) {
      console.error('Social login callback failed:', error);
      handleAuthError(error);
      throw error;
    }
  };

  const validateGoogleToken = async (token) => {
    try {
      const response = await api.post('validate_token/', {
        access_token: token,
      });
      console.log('Google token validation response:', response.data); // Debugging
      return response.data.valid;
    } catch (error) {
      console.error('Google token validation failed:', error);
      return false;
    }
  };

  const handleAuthError = (error) => {
    console.error('Auth error:', error.response?.data || error.message); // Debugging
    if (error?.response?.status === 401) {
      signOut();
    }
    setUser(null);
  };

  const signIn = async (email, password) => {
    try {
      const csrfToken = getCSRFToken();
      const response = await api.post('signin/', { email, password }, {
        headers: { 'X-CSRFToken': csrfToken }
      });
      
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setAuthToken(access);
      setupTokenRefresh(access);
      await fetchUserData();
      
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      const csrfToken = getCSRFToken();
      const payload = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      console.log('Password update payload:', payload); // Debugging
      
      const response = await api.post('update-password/', payload, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Password update response:', response.data); // Debugging
      
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setAuthToken(access);
      setupTokenRefresh(access);
      
      return response.data;
    } catch (error) {
      console.error('Password update failed:', error.response?.data); // Debugging
      throw error;
    }
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const updateProfile = async (data) => {
    try {
      const csrfToken = getCSRFToken();
      const response = await api.put('update-profile/', data, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile update response:', response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const signUp = async (email, password, firstname, lastname) => {
    try {
      const response = await api.post('signup/', {
        email,
        password,
        firstname: firstname,
        lastname: lastname,
      });
      console.log('Signup response:', response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const signOut = () => {
    if (tokenRefreshTimeout) clearTimeout(tokenRefreshTimeout);
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  const value = {
    user,
    setUser,
    updateUser,
    loading,
    signIn,
    signUp,
    signOut,
    refreshToken,
    validateGoogleToken,
    updatePassword,
    updateProfile,
    handleSocialLoginCallback,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};