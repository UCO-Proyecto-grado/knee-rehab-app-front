import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);


const LoginPage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const code = query.get('code');

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/autentificador/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });
        
        if (!response.ok) throw new Error('Token exchange failed');      
        const data = await response.json();
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('UserInfo', JSON.stringify(data.data.usuario_administrador));

        window.history.replaceState({}, document.title, window.location.pathname);
        const rol = data.data.usuario_administrador.roles[0];

        switch (rol) {
          case 'AdministradorCentro':
            navigate('/centro/dashboard');
            break;
          case 'AdministradorSede':
            navigate('/centro/dashboard');
            break;
          case 'UsuarioFisioterapeuta':
            navigate('/fisio/dashboard');
            break;
          case 'Paciente':
            navigate('/dashboard');
            break;
          case 'AdministradorSistema':
            navigate('/admin');
            break;
          default:
            console.error('Rol no reconocido:', rol);
            navigate('/no-autorizado');
            break;
        }
      } catch (err) {
        console.error(err);
      }
    };


    if (code) {
      fetchTokens();
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 animate-fadeIn">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-functional-blue-dark flex items-center justify-center mx-auto mb-4">
            <Activity className="w-12 h-12 text-functional-blue-light" />
          </div>
          <h1 className="text-5xl font-bold text-typography-primary mb-2">Knee Rehab APP</h1>
          <p className="text-2xl text-typography-secondary">
            Recupera tu rodilla con nuestro programa digital
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-functional-blue-dark"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;