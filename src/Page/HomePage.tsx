import React, { useEffect } from 'react';

const HomePage: React.FC = () => {
  useEffect(() => {
    window.location.href = "https://us-east-1zu66egizv.auth.us-east-1.amazoncognito.com/login?client_id=18ojcokska1igo3hrb743d6bt5&redirect_uri=https%3A%2F%2Fdevelop.d3d4ljvzw46psr.amplifyapp.com%2F&response_type=code&scope=email+openid+phone";
  }, []);

  return (
    <div>
      <p>Redirigiendo a la página de inicio de sesión...</p>
    </div>
  );
};

export default HomePage; 