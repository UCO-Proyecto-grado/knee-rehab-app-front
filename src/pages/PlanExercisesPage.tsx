import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Dumbbell, Info, ChevronLeft, PlayCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Define types for exercises and plan details (can be expanded)
interface Exercise {
  id: string;
  nombre: string;
  descripcion: string;
  series?: number;
  repeticiones?: number;
  videoUrl?: string; // Optional: URL to an exercise video
}

interface PlanDetails extends RehabilitationPlan { // Assuming RehabilitationPlan is defined elsewhere or we redefine a simpler version
    // Potentially add more plan-specific details if needed
    ejercicios: Exercise[];
}

// Mock data for plan details including exercises
const mockPlanDetailsData: { [key: string]: PlanDetails } = {
  "46b65d6d-92e0-4550-8f63-eeb872473f74": { // Plan01 LCA
    id: "46b65d6d-92e0-4550-8f63-eeb872473f74",
    codigo_plan_rehabilitacion: "Plan01",
    nombre: "LCA",
    fecha_creacion: "2025-05-27",
    finalizado: false,
    porcentaje_finalizacion: "0.00",
    observaciones: "Fase Inicial - Ejercicios de movilidad y activación suave.",
    id_fisioterapeuta_sede: "bf39c842-10b3-481a-825f-2e9321e73323",
    id_estado: "eed3b2b9-5e39-4fd6-9562-2f99e5dae3bf",
    id_paciente_categoria_tipo_lesion: "b16fa195-abf2-45df-843e-ef968211d7e7",
    ejercicios: [
      { id: 'ex001', nombre: 'Elevación de talón (sentado)', descripcion: 'Elevar talones manteniendo puntas en el suelo.', series: 3, repeticiones: 15 },
      { id: 'ex002', nombre: 'Flexión de rodilla pasiva (con toalla)', descripcion: 'Usar una toalla para ayudar a flexionar la rodilla suavemente.', series: 3, repeticiones: 10 },
      { id: 'ex003', nombre: 'Contracción isométrica de cuádriceps', descripcion: 'Presionar la parte posterior de la rodilla contra una toalla enrollada.', series: 4, repeticiones: 10 },
    ]
  },
  "da5195de-95f3-40c3-8422-c1594ab1049d": { // Plan02 Meniscos
    id: "57c76e7e-92e0-4550-8f63-eeb872473f75",
    codigo_plan_rehabilitacion: "Plan02",
    nombre: "Meniscos",
    fecha_creacion: "2025-06-15",
    finalizado: false,
    porcentaje_finalizacion: "25.00",
    observaciones: "Fase Intermedia - Fortalecimiento progresivo y control motor.",
    id_fisioterapeuta_sede: "bf39c842-10b3-481a-825f-2e9321e73323",
    id_estado: "eed3b2b9-5e39-4fd6-9562-2f99e5dae3bf",
    id_paciente_categoria_tipo_lesion: "c27gb295-abf2-45df-843e-ef968211d8e8",
    ejercicios: [
      { id: 'ex004', nombre: 'Mini sentadillas (Squats)', descripcion: 'Realizar sentadillas parciales, sin pasar los 90 grados.', series: 3, repeticiones: 12 },
      { id: 'ex005', nombre: 'Elevación de pierna recta', descripcion: 'Acostado, elevar la pierna recta sin doblar la rodilla.', series: 3, repeticiones: 10 },
      { id: 'ex006', nombre: 'Balanceo en una pierna', descripcion: 'Mantener el equilibrio sobre la pierna afectada por 30 segundos.', series: 3, repeticiones: 3 },
    ]
  },
  "dev7c76e7e-92e0-4550-8f63-eeb872473f75": { // PlanDevUser Rodilla General - Dev
    id: "dev7c76e7e-92e0-4550-8f63-eeb872473f75",
    codigo_plan_rehabilitacion: "PlanDevUser",
    nombre: "Rodilla General - Dev",
    fecha_creacion: "2025-07-01",
    finalizado: false,
    porcentaje_finalizacion: "10.00",
    observaciones: "Plan de prueba para usuario de desarrollo - Ejercicios básicos.",
    id_fisioterapeuta_sede: "bf39c842-10b3-481a-825f-2e9321e73323",
    id_estado: "eed3b2b9-5e39-4fd6-9562-2f99e5dae3bf",
    id_paciente_categoria_tipo_lesion: "dev-user-plan-association",
    ejercicios: [
      { id: 'ex007', nombre: 'Estiramiento de isquiotibiales', descripcion: 'Sentado, intentar tocar los pies con las manos.', series: 2, repeticiones: 30 }, // seconds
      { id: 'ex008', nombre: 'Puente de glúteos', descripcion: 'Elevar la cadera del suelo contrayendo los glúteos.', series: 3, repeticiones: 15 },
    ]
  }
};

// We need a simplified RehabilitationPlan interface here if not importing from elsewhere
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

const PlanExercisesPage = () => {
  const { planId } = useParams<{ planId: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }
    if (!user) {
      setLoading(false);
      return;
    }
    if (!planId) {
      console.error("No plan ID provided in URL");
      setLoading(false);
      return;
    }

    // Simulate API call to fetch plan details including exercises
    console.log(`Fetching exercises for plan ID: ${planId} for user ${user.nombre}`);
    setLoading(true);
    setTimeout(() => {
      const foundPlan = mockPlanDetailsData[planId];
      if (foundPlan) {
        setPlanDetails(foundPlan);
      } else {
        console.warn(`No plan details found for plan ID: ${planId}`);
        setPlanDetails(null); // Or handle as an error state
      }
      setLoading(false);
    }, 1000);
  }, [planId, user, authLoading]);

  if (authLoading || loading) {
    return (
      <Layout title="Ejercicios del Plan">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-typography-primary">Cargando ejercicios del plan...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
        <Layout title="Acceso Denegado">
            <div className="text-center py-10">
                <Info size={48} className="mx-auto text-functional-red-light mb-4" />
                <p className="text-xl text-typography-secondary">
                    Debes iniciar sesión para ver los ejercicios del plan.
                </p>
                <Link to="/login" className="mt-4 inline-block bg-functional-blue-medium hover:bg-functional-blue-dark text-white font-semibold py-2 px-4 rounded-lg">
                    Ir a Iniciar Sesión
                </Link>
            </div>
        </Layout>
    );
  }

  if (!planDetails) {
    return (
      <Layout title="Plan no Encontrado">
        <div className="text-center py-10">
            <Info size={48} className="mx-auto text-yellow-500 mb-4" />
            <p className="text-xl text-typography-secondary">
              No se encontraron detalles para el plan con ID: {planId}.
            </p>
            <Link to="/planes-rehabilitacion" className="mt-4 inline-block bg-functional-blue-medium hover:bg-functional-blue-dark text-white font-semibold py-2 px-4 rounded-lg">
                <ChevronLeft size={20} className="inline mr-1"/> Volver a Planes
            </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Ejercicios: ${planDetails.nombre}`}>
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <Link 
            to="/planes-rehabilitacion" 
            className="inline-flex items-center text-functional-blue-light hover:text-functional-blue-dark mb-6 transition-colors">
            <ChevronLeft size={20} className="mr-1"/>
            Volver a Mis Planes
        </Link>
        
        <div className="bg-background-dark p-6 rounded-xl shadow-lg mb-8">
            <h1 className="text-3xl font-bold text-typography-primary mb-2">
                {planDetails.nombre} <span className="text-lg text-neutral-secondary">({planDetails.codigo_plan_rehabilitacion})</span>
            </h1>
            <p className="text-neutral-secondary text-sm mb-4">
                {planDetails.observaciones}
            </p>
            <div className="h-2.5 w-full bg-background rounded-full mb-1">
                <div 
                    className="h-2.5 rounded-full bg-functional-green-light"
                    style={{ width: `${planDetails.porcentaje_finalizacion}%` }}
                ></div>
            </div>
            <p className="text-xs text-functional-green-light text-right">{planDetails.porcentaje_finalizacion}% completado</p>
        </div>

        <h2 className="text-2xl font-semibold text-typography-primary mb-6">Ejercicios Asignados</h2>

        {planDetails.ejercicios.length === 0 ? (
          <div className="text-center py-10 bg-background-dark p-6 rounded-xl shadow-md">
            <Dumbbell size={48} className="mx-auto text-neutral-secondary mb-4" />
            <p className="text-xl text-typography-secondary">
              No hay ejercicios asignados a este plan actualmente.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {planDetails.ejercicios.map((exercise) => (
              <div 
                key={exercise.id} 
                className="bg-background-dark p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-functional-blue-light mb-2">
                  {exercise.nombre}
                </h3>
                <p className="text-neutral-secondary mb-3 text-sm">
                  {exercise.descripcion}
                </p>
                {(exercise.series || exercise.repeticiones) && (
                    <div className="text-sm text-typography-secondary mb-3">
                        <span className="font-medium">Indicaciones:</span> 
                        {exercise.series && <span> {exercise.series} series</span>}
                        {exercise.series && exercise.repeticiones && <span> × </span>}
                        {exercise.repeticiones && <span> {exercise.repeticiones} repeticiones</span>}
                    </div>
                )}
                {exercise.videoUrl && (
                  <a 
                    href={exercise.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-functional-blue-light hover:text-functional-blue-dark font-medium transition-colors"
                  >
                    Ver Video del Ejercicio <Info size={14} className="ml-1.5" />
                  </a>
                )}
                 {/* Placeholder for a button to navigate to the exercise video page, like in DashboardPage */}
                  <button 
                    onClick={() => navigate(`/exercise/${exercise.id}`)} 
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-functional-green-medium text-white font-semibold rounded-lg hover:bg-functional-green-dark transition-colors duration-300"
                  >
                    <PlayCircle size={18} className="mr-2" />
                    Iniciar Ejercicio
                  </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PlanExercisesPage; 