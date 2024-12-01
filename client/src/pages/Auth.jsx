import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const navigate = useNavigate();
  const { login, register } = useAuth(); // Import the register function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        await login(email, password);
        navigate('/dashboard');
      } else {
        // Register
        await register(email, password);
        // Optionally log the user in after successful registration
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold">
          {isLogin ? 'Sign In' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isLogin ? 'Sign In' : 'Register'}
          </Button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-600"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
