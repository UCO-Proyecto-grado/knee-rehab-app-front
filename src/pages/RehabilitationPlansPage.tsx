import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { FileText, CalendarDays, Percent, ListChecks, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPlanRehabilitacion } from '../services/terapias_service';

// Define the type for a single rehabilitation plan based on your JSON structure
interface RehabilitationPlan {
  codigo_plan_rehabilitacion: string;
  nombre: string;
  fecha_creacion: string;
  finalizado: boolean;
  porcentaje_finalizacion: string;
  observaciones: string;
  id_fisioterapeuta_sede: string;
  id_estado: string;
  id_paciente_categoria_tipo_lesion: string;
  id: string;
}

// Define the expected API response structure for getPlanRehabilitacion
interface ApiResponse {
  status: number;
  message: string;
  data: RehabilitationPlan[];
}

const RehabilitationPlansPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<RehabilitationPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      console.log('No user logged in, not fetching plans.');
      setPlans([]);
      setLoading(false);
      return;
    }

    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      console.log(`Fetching plans for user ID: ${user.id}`);
      try {
        const response: ApiResponse = await getPlanRehabilitacion();
        if (response && response.data && response.status === 200) {
          setPlans(response.data);
        } else {
          console.error('Failed to fetch plans or data format is incorrect:', response);
          setError('No se pudieron cargar los planes. Formato de datos incorrecto.');
          setPlans([]);
        }
      } catch (err) {
        console.error('Error fetching rehabilitation plans:', err);
        setError('Error al conectar con el servidor para cargar los planes.');
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <Layout title="Planes de Rehabilitación">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-typography-primary">Cargando planes...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Planes de Rehabilitación">
        <div className="text-center py-10">
          <FileText size={48} className="mx-auto text-neutral-secondary mb-4" />
          <p className="text-xl text-typography-secondary">
            Debes iniciar sesión para ver tus planes de rehabilitación.
          </p>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout title="Error">
        <div className="text-center py-10">
          <AlertTriangle size={48} className="mx-auto text-functional-red-light mb-4" />
          <p className="text-xl text-typography-primary mb-2">Error al Cargar Planes</p>
          <p className="text-neutral-secondary mb-6">{error}</p>
          <button 
            onClick={() => { /* Consider a retry mechanism here */ }}
            className="bg-functional-blue-medium hover:bg-functional-blue-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Intentar de Nuevo
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Planes de Rehabilitación">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-typography-primary mb-2">
          Mis Planes de Rehabilitación
        </h1>
        <p className="text-center text-neutral-secondary mb-8">
          Planes asignados a: {user.nombre} {user.apellido} (ID: {user.id})
        </p>

        {plans.length === 0 ? (
          <div className="text-center py-10">
            <FileText size={48} className="mx-auto text-neutral-secondary mb-4" />
            <p className="text-xl text-typography-secondary">
              No tienes planes de rehabilitación asignados actualmente.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className="bg-background-dark p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-semibold text-functional-blue-light mb-1">
                      {plan.nombre} <span className="text-sm text-neutral-secondary">({plan.codigo_plan_rehabilitacion})</span>
                    </h2>
                    <span 
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${ 
                        plan.finalizado 
                          ? 'bg-functional-green-dark text-functional-green-light' 
                          : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                      }`}
                    >
                      {plan.finalizado ? 'Finalizado' : 'En Progreso'}
                    </span>
                  </div>

                  <p className="text-neutral-secondary mb-4 text-sm">
                    {plan.observaciones}
                  </p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-typography-secondary">
                      <CalendarDays size={16} className="mr-2 text-functional-blue-light" />
                      Fecha de Creación: {new Date(plan.fecha_creacion).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-typography-secondary">
                      <Percent size={16} className="mr-2 text-functional-blue-light" />
                      Progreso: {plan.porcentaje_finalizacion}%
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                    <div className="h-2.5 w-full bg-background rounded-full mb-2">
                        <div 
                            className="h-2.5 rounded-full bg-functional-green-light"
                            style={{ width: `${plan.porcentaje_finalizacion}%` }}
                        ></div>
                    </div>
                    <button 
                        className="w-full mt-4 bg-functional-blue-medium hover:bg-functional-blue-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        onClick={() => navigate(`/planes-rehabilitacion/${plan.id}/ejercicios`)}
                    >
                        <ListChecks size={18} className="mr-2" />
                        Ver Detalles del Plan
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RehabilitationPlansPage; 