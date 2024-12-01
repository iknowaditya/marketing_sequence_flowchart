import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import EmailSequenceDesigner from './pages/EmailSequenceDesigner';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { useAuth } from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/designer"
          element={
            <PrivateRoute>
              <EmailSequenceDesigner />
            </PrivateRoute>
          }
        />
         <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/designer" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
