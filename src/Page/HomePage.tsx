import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
 
const useQuery = () => new URLSearchParams(useLocation().search);
 
const HomePage: React.FC = () => {
  const query = useQuery();
  const code = query.get('code');
  const navigate = useNavigate();
 
  useEffect(() => {
    if (code) {
      // Si ya hay un código, redirige al login para continuar el flujo normal
      navigate(`/login?code=${code}`);
    } else {
      // Si no hay código, redirige a Cognito
      window.location.href = 'https://us-east-1zu66egizv.auth.us-east-1.amazoncognito.com/login?client_id=18ojcokska1igo3hrb743d6bt5&redirect_uri=https%3A%2F%2Fdevelop.d3d4ljvzw46psr.amplifyapp.com%2F&response_type=code&scope=email+openid+phone';
    }
  }, [code, navigate]);
 
  return (
<div>
<p>Redirigiendo a la página de inicio de sesión...</p>
</div>
  );
};
 
export default HomePage;