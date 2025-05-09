import { useState } from 'react';
import { Users, UserPlus, Activity, Calendar, Search} from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const CenterDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  const filters = [
    { id: 'todos', name: 'Todos' },
    { id: 'activos', name: 'Activos' },
    { id: 'completados', name: 'Completados' },
    { id: 'pendientes', name: 'Pendientes' },
  ];

  const patients = [
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
            <Button variant="primary">
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

          {/* Patients Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Paciente</th>
                  <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Estado</th>
                  <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Progreso</th>
                  <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Próxima Cita</th>
                  <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Fisioterapeuta</th>
                  <th className="text-left py-3 px-4 text-neutral-secondary font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-t border-background">
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-typography-secondary font-medium">{patient.name}</p>
                        <p className="text-sm text-neutral-secondary">{patient.condition}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === 'activo' 
                          ? 'bg-functional-green-light bg-opacity-20 text-functional-green-light'
                          : patient.status === 'completado'
                          ? 'bg-functional-blue-light bg-opacity-20 text-functional-blue-light'
                          : 'bg-functional-coral bg-opacity-20 text-functional-coral'
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
                      <span className="text-typography-secondary">
                        {patient.nextAppointment || 'No programada'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-typography-secondary">{patient.physiotherapist}</span>
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
          </div>
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
    </Layout>
  );
};

export default CenterDashboardPage;