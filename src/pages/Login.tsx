import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>WeatherMe</h1>
          <p>Sign in to access your weather data</p>
        </div>
        <div className="login-content">
          <GoogleLoginButton />
        </div>
        <div className="login-footer">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};
