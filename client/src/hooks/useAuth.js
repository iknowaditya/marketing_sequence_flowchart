import { useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = useCallback(async (email, password) => {
    try {
      console.log('Login request payload:', { email, password });
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      context.setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }, [context]);

  const register = useCallback(async (email, password) => {
    try {
      console.log('register request payload:', { email, password });
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Error in register function:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    context.setUser(null);
  }, [context]);

  const updateUser = useCallback((userData) => {
    context.setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, [context]);

  return {
    user: context.user,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!context.user
  };
};

export default useAuth;