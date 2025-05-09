import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { getTiposDocumento } from '../services/entidades_primarias_service';
import { TipoDocumento } from '../models/entidates_primarias_model.interface';
import { postCreateCentro } from '../services/instituciones_service';


const RegisterCenterPage = () => {
  const [formData, setFormData] = useState({
    idType: '',
    identification: '',
    name: '',
    email: '',
  });
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTiposDocumento();
  }, []);

  const fetchTiposDocumento = async () => {
    const response = await getTiposDocumento();
    setTiposDocumento(response.data);
  }

  const idTypes = tiposDocumento.map((tipo: TipoDocumento) => ({
    value: tipo.id,
    label: `${tipo.codigo} - ${tipo.nombre}`,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await postCreateCentro({
        id_tipo_identificacion: formData.idType,
        identificacion: formData.identification,
        nombre: formData.name,
        correo: formData.email
      });
      setSuccess(response.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err: any) {
      setError(err.response.data.data.detail_errors || 'Error al registrar el centro. Por favor, intenta de nuevo.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 animate-fadeIn">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-functional-blue-dark flex items-center justify-center mx-auto mb-4">
            <Activity className="w-12 h-12 text-functional-blue-light" />
          </div>
          <h1 className="text-5xl font-bold text-typography-primary mb-2">KneeRehab</h1>
          <p className="text-2xl text-typography-secondary">
            Registra tu centro de rehabilitación
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-background-dark p-8 rounded-lg shadow-lg animate-slideUp">
          <h2 className="text-2xl font-bold text-typography-primary mb-6">Registro de Centro</h2>
          
          {error && (
            <div className="bg-functional-coral bg-opacity-20 text-functional-coral p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-functional-green bg-opacity-20 text-functional-green-light p-3 rounded-md mb-4">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-typography-primary mb-2 font-medium">
                Tipo de identificación
              </label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full bg-background-dark text-typography-secondary rounded-md py-2 px-4 border border-background focus:outline-none focus:ring-1 focus:ring-functional-blue-light focus:border-functional-blue-light transition-all duration-200"
                required
              >
                <option value="">Selecciona un tipo</option>
                {idTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <Input
              label="Número de identificación"
              type="text"
              name="identification"
              value={formData.identification}
              onChange={handleChange}
              required
              placeholder="Introduce el número de identificación"
            />
            
            <Input
              label="Nombre del centro"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nombre completo del centro"
            />
            
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="centro@ejemplo.com"
            />
            
            <Button 
              type="submit" 
              fullWidth
            >
              Registrar centro
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

export default RegisterCenterPage;