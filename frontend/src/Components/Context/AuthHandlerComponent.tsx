import { useEffect } from 'react';
import axios, { AxiosError } from 'axios'; 
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthHandlerComponent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = (error: AxiosError<any>) => {
      if (error.response && error.response.status === 401) {
        logout();
        navigate('/login'); 
      }
      return Promise.reject(error); 
    };

    const interceptor = axios.interceptors.response.use(
      response => response,
      handleUnauthorized,
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [logout, navigate]);

  return null;
};

export default AuthHandlerComponent;
