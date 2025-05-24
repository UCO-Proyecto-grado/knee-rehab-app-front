import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al crear cuenta. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 animate-fadeIn">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-functional-blue-dark flex items-center justify-center mx-auto mb-4">
            <Activity className="w-12 h-12 text-functional-blue-light" />
          </div>
          <h1 className="text-5xl font-bold text-typography-primary mb-2">Knee Rehab</h1>
          <p className="text-2xl text-typography-secondary">
            Recupera tu rodilla con nuestro programa digital
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-background-dark p-8 rounded-lg shadow-lg animate-slideUp">
          <h2 className="text-2xl font-bold text-typography-primary mb-6">Crear cuenta</h2>
          
          {error && (
            <div className="bg-functional-coral bg-opacity-20 text-functional-coral p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Nombre completo"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Tu nombre completo"
            />
            
            <Input
              label="Correo electrónico"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@correo.com"
            />
            
            <Input
              label="Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            
            <Input
              label="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Registrarse'}
            </Button>
            
            <div className="mt-4 text-center">
              <p>
                ¿Ya tienes una cuenta?{' '}
                <Link 
                  to="/" 
                  className="text-typography-primary hover:text-functional-blue-light transition duration-200"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;