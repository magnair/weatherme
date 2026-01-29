import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const GoogleLoginButton = () => {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google login successful, sending to backend...');
    console.log('API URL:', `${API_BASE_URL}/api/auth/google`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credentialResponse.credential })
      });

      console.log('Backend response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, received token');
        login(data.token, data.email, data.name);
      } else {
        const errorText = await response.text();
        console.error('Authentication failed:', response.status, errorText);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error('Login Failed')}
    />
  );
};
