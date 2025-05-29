import { useState, useEffect } from 'react';
import { Users, UserPlus, Activity, Calendar, Search} from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import CreatePacienteModal from '../components/CreatePacienteModal';
import { getPacientes } from '../services/accesos_personal_service';

interface DisplayPaciente {
  id: string | number;
  name: string;
  status: string;
  progress: number;
  nextAppointment: string | null;
  physiotherapist: string;
  condition: string;
  identificacion?: string;
  email?: string;
}

const CenterDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [patients, setPatients] = useState<DisplayPaciente[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const initialMockPatients = [
    {
      id: 1,
      name: 'Ana García',
      status: 'activo',
      progress: 65,
      nextAppointment: '15 Mayo, 2025',
      physiotherapist: 'Dr. Martínez',
      condition: 'Rehabilitación post-operatoria',
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      status: 'activo',
      progress: 45,
      nextAppointment: '16 Mayo, 2025',
      physiotherapist: 'Dra. Sánchez',
      condition: 'Lesión ligamento cruzado',
    },
    {
      id: 3,
      name: 'María López',
      status: 'completado',
      progress: 100,
      nextAppointment: null,
      physiotherapist: 'Dr. Martínez',
      condition: 'Rehabilitación menisco',
    },
  ];

  const fetchAndSetPatients = async () => {
    setIsLoadingPatients(true);
    setFetchError(null);
    try {
      const apiResponse = await getPacientes();
      if (apiResponse && apiResponse.data && apiResponse.status === 200) {
        const formattedPatients = apiResponse.data.map((p: any) => ({
          id: p.id,
          name: `${p.nombre} ${p.apellido}`,
          status: p.estado?.nombre?.toLowerCase() || 'pendiente',
          progress: p.porcentaje_progreso_general || 0,
          nextAppointment: p.proxima_cita_fecha || null,
          physiotherapist: p.fisioterapeuta_asignado?.nombre || 'N/A',
          condition: p.diagnostico_principal || 'N/D',
          identificacion: p.identificacion,
          email: p.email,
        }));
        setPatients(formattedPatients);
      } else {
        console.error("Failed to fetch patients or data format incorrect", apiResponse);
        setFetchError("No se pudieron cargar los pacientes. Formato de datos incorrecto.");
        setPatients(initialMockPatients);
      }
    } catch (err) {
      console.error('Error fetching patients:', err);
      setFetchError('Error al conectar con el servidor para cargar los pacientes.');
      setPatients(initialMockPatients);
    } finally {
      setIsLoadingPatients(false);
    }
  };

  useEffect(() => {
    fetchAndSetPatients();
  }, []);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handlePacienteCreated = (newPaciente: any) => {
    console.log('New paciente created:', newPaciente);
    fetchAndSetPatients();
  };

  const filters = [
    { id: 'todos', name: 'Todos' },
    { id: 'activos', name: 'Activos' },
    { id: 'completados', name: 'Completados' },
    { id: 'pendientes', name: 'Pendientes' },
  ];

  const physiotherapists = [
    {
      id: 1,
      name: 'Dr. Martínez',
      patients: 12,
      availability: '80%',
      specialization: 'Rodilla',
      appointments: 8,
    },
    {
      id: 2,
      name: 'Dra. Sánchez',
      patients: 15,
      availability: '60%',
      specialization: 'Deportiva',
      appointments: 10,
    },
    {
      id: 3,
      name: 'Dr. Rodríguez',
      patients: 8,
      availability: '90%',
      specialization: 'Post-operatorio',
      appointments: 5,
    },
  ];

  const stats = [
    {
      title: 'Pacientes Activos',
      value: '45',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-functional-blue-light',
    },
    {
      title: 'Fisioterapeutas',
      value: '8',
      icon: <UserPlus className="w-6 h-6" />,
      color: 'bg-functional-green-light',
    },
    {
      title: 'Citas Hoy',
      value: '12',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-functional-blue-medium',
    },
    {
      title: 'Tasa de Recuperación',
      value: '92%',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-functional-blue-deep',
    },
  ];

  const filteredPatients = patients.filter(patient => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = patient.name.toLowerCase().includes(query) || 
                          (patient.identificacion && patient.identificacion.toLowerCase().includes(query)) ||
                          (patient.email && patient.email.toLowerCase().includes(query));

    if (activeFilter === 'todos') return matchesSearch;
    if (activeFilter === 'activos') return patient.status === 'activo' && matchesSearch;
    if (activeFilter === 'completados') return patient.status === 'completado' && matchesSearch;
    if (activeFilter === 'pendientes') return patient.status === 'pendiente' && matchesSearch;
    return false;
  });

  return (
    <Layout title="Panel de Control">
      <div className="animate-fadeIn space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-background-dark p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-neutral-secondary text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-typography-primary mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Patients Section */}
        <div className="bg-background-dark rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-typography-primary flex items-center">
              <Users className="mr-2" size={22} />
              Pacientes
            </h2>
            <Button variant="primary" onClick={handleOpenCreateModal}>
              <UserPlus size={16} className="mr-2" />
              Nuevo Paciente
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-secondary" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background w-full pl-10 pr-4 py-2.5 rounded-lg border border-background focus:outline-none focus:ring-1 focus:ring-functional-blue-light focus:border-functional-blue-light transition-colors duration-200 text-typography-secondary"
                placeholder="Buscar pacientes..."
              />
            </div>
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-functional-blue-light text-white'
                      : 'bg-background text-neutral-secondary hover:text-typography-primary'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Patients Table or Loading/Error State */}
          {isLoadingPatients ? (
            <div className="text-center py-10">
              <p className="text-xl text-typography-primary">Cargando pacientes...</p>
            </div>
          ) : fetchError ? (
            <div className="text-center py-10 bg-functional-red-dark bg-opacity-10 p-4 rounded-lg">
              <Activity size={32} className="mx-auto text-functional-red-light mb-2" />
              <p className="text-xl text-functional-red-light mb-1">Error al Cargar Pacientes</p>
              <p className="text-neutral-secondary text-sm">{fetchError}</p>
              <Button onClick={fetchAndSetPatients} variant='outline' className='mt-4'>Intentar de Nuevo</Button>
            </div>
          ) : filteredPatients.length === 0 && searchQuery === '' && activeFilter === 'todos' ? (
             <div className="text-center py-10">
                <Users size={32} className="mx-auto text-neutral-secondary mb-2" />
                <p className="text-xl text-typography-primary mb-1">No hay pacientes registrados</p>
                <p className="text-neutral-secondary text-sm mb-4">Crea un nuevo paciente para comenzar.</p>
                <Button variant="primary" onClick={handleOpenCreateModal}>
                    <UserPlus size={16} className="mr-2" />
                    Crear Primer Paciente
                </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Paciente</th>
                    <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Identificación</th>
                    <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Estado</th>
                    <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Progreso</th>
                    <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-t border-background">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-typography-secondary font-medium">{patient.name}</p>
                          <p className="text-sm text-neutral-secondary">{patient.condition}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-typography-secondary text-sm">{patient.identificacion || 'N/A'}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-typography-secondary text-sm">{patient.email || 'N/A'}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${ 
                          patient.status === 'activo' 
                            ? 'bg-functional-green-light bg-opacity-20 text-functional-green-light'
                            : patient.status === 'completado'
                            ? 'bg-functional-blue-light bg-opacity-20 text-functional-blue-light'
                            : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                        }`}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-background rounded-full h-2 mr-2">
                            <div 
                              className="bg-functional-blue-light rounded-full h-2"
                              style={{ width: `${patient.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-typography-secondary">{patient.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="outline" className="text-sm py-1">
                          Ver detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPatients.length === 0 && (
                <div className="text-center py-6">
                    <p className="text-neutral-secondary">No se encontraron pacientes con los filtros actuales.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Physiotherapists Section */}
        <div className="bg-background-dark rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-typography-primary flex items-center">
              <UserPlus className="mr-2" size={22} />
              Fisioterapeutas
            </h2>
            <Button variant="primary">
              <UserPlus size={16} className="mr-2" />
              Nuevo Fisioterapeuta
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {physiotherapists.map((physio) => (
              <div key={physio.id} className="bg-background p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-typography-primary font-semibold">{physio.name}</h3>
                    <p className="text-sm text-neutral-secondary">{physio.specialization}</p>
                  </div>
                  <span className="px-2 py-1 bg-functional-blue-light bg-opacity-20 text-functional-blue-light text-xs rounded-full">
                    {physio.availability} disponible
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-secondary">Pacientes</span>
                    <span className="text-typography-secondary">{physio.patients}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-secondary">Citas hoy</span>
                    <span className="text-typography-secondary">{physio.appointments}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  fullWidth 
                  className="mt-4"
                >
                  Ver agenda
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Creating Paciente */}
      <CreatePacienteModal 
        isOpen={isCreateModalOpen} 
        onClose={handleCloseCreateModal} 
        onPacienteCreated={handlePacienteCreated} 
      />
    </Layout>
  );
};

export default CenterDashboardPage;