import { useState } from 'react';
import { Dumbbell, Calendar, Clock, BarChart2, Award, ChevronRight, Check } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const DashboardPage = () => {
  const { user } = useAuth();
  const [currentDay, _setCurrentDay] = useState(3); // Example: day 3 of program

  const todaysExercises = [
    {
      id: 1,
      name: 'Elevación de pierna recta',
      sets: 3,
      reps: 10,
      completed: true,
    },
    {
      id: 2,
      name: 'Estiramiento de isquiotibiales',
      sets: 2,
      reps: 15,
      completed: true,
    },
    {
      id: 3,
      name: 'Sentadilla parcial',
      sets: 3,
      reps: 8,
      completed: false,
    },
    {
      id: 4,
      name: 'Extensión terminal de rodilla',
      sets: 3,
      reps: 12,
      completed: false,
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Martínez',
      specialty: 'Fisioterapeuta',
      date: '15 de mayo, 2025',
      time: '10:30 AM',
    }
  ];

  // Calculate progress
  const completedExercises = todaysExercises.filter(ex => ex.completed).length;
  const totalExercises = todaysExercises.length;
  const progressPercentage = Math.round((completedExercises / totalExercises) * 100);

  return (
    <Layout title="Panel Principal">
      <div className="animate-fadeIn">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Main content column */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Welcome message */}
            <div className="bg-background-dark p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-typography-primary mb-1">
                Bienvenido, {user?.name || 'Usuario'}
              </h2>
              <p className="text-neutral-secondary mb-4">
                Día {currentDay} de tu programa de rehabilitación
              </p>
              
              <div className="relative h-2 bg-background rounded-full mb-4">
                <div 
                  className="absolute left-0 top-0 h-full bg-functional-green-light rounded-full"
                  style={{ width: `${(currentDay / 30) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-typography-secondary text-sm">
                  <span className="text-functional-green-light font-semibold">{currentDay}</span> de 30 días completados
                </p>
                <p className="text-typography-secondary text-sm">
                  {30 - currentDay} días restantes
                </p>
              </div>
            </div>

            {/* Daily exercises */}
            <div className="bg-background-dark p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Dumbbell className="text-functional-blue-light mr-2" size={22} />
                  <h2 className="text-xl font-semibold text-typography-primary">Ejercicios de hoy</h2>
                </div>
                <div className="bg-background px-3 py-1 rounded-full">
                  <p className="text-sm text-typography-primary">
                    <span className="font-semibold">{completedExercises}/{totalExercises}</span> completados
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {todaysExercises.map((exercise) => (
                  <div 
                    key={exercise.id} 
                    className={`p-4 rounded-lg flex items-center justify-between border ${
                      exercise.completed 
                        ? 'border-functional-green-light bg-functional-green-light bg-opacity-10' 
                        : 'border-background'
                    }`}
                  >
                    <div>
                      <h3 className="font-medium text-typography-secondary">
                        {exercise.name}
                      </h3>
                      <p className="text-sm text-neutral-secondary">
                        {exercise.sets} series × {exercise.reps} repeticiones
                      </p>
                    </div>
                    <div className="flex items-center">
                      {exercise.completed ? (
                        <div className="bg-functional-green-light bg-opacity-20 p-1.5 rounded-full">
                          <Check size={18} className="text-functional-green-light" />
                        </div>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="py-1 px-3 text-sm"
                        >
                          Iniciar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline"
                  fullWidth
                  className="flex items-center justify-center"
                >
                  <span>Ver todos los ejercicios</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Progress */}
            <div className="bg-background-dark p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <BarChart2 className="text-functional-blue-light mr-2" size={22} />
                <h2 className="text-xl font-semibold text-typography-primary">
                  Progreso diario
                </h2>
              </div>
              
              <div className="flex items-center justify-center py-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle
                      className="text-background stroke-current"
                      strokeWidth="8"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    ></circle>
                    <circle
                      className="text-functional-blue-medium stroke-current"
                      strokeWidth="8"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * progressPercentage) / 100}
                      transform="rotate(-90 50 50)"
                    ></circle>
                  </svg>
                  <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-functional-blue-light">
                        {progressPercentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-neutral-secondary">
                {completedExercises} de {totalExercises} ejercicios completados hoy
              </p>
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  fullWidth
                  className="flex items-center justify-center"
                >
                  <span>Ver estadísticas</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Upcoming appointments */}
            <div className="bg-background-dark p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Calendar className="text-functional-blue-light mr-2" size={22} />
                <h2 className="text-xl font-semibold text-typography-primary">
                  Próximas citas
                </h2>
              </div>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="p-4 border border-background rounded-lg"
                    >
                      <h3 className="font-medium text-typography-secondary">
                        {appointment.doctor}
                      </h3>
                      <p className="text-sm text-neutral-secondary mb-2">
                        {appointment.specialty}
                      </p>
                      <div className="flex items-center text-sm text-typography-primary">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-3">{appointment.date}</span>
                        <Clock size={14} className="mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-neutral-secondary">
                  No tienes citas programadas
                </p>
              )}
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  fullWidth
                  className="flex items-center justify-center"
                >
                  <span>Programar cita</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-background-dark p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Award className="text-functional-blue-light mr-2" size={22} />
                <h2 className="text-xl font-semibold text-typography-primary">
                  Logros
                </h2>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="p-3 bg-functional-blue-deep bg-opacity-30 rounded-lg flex flex-col items-center w-24">
                  <Award size={32} className="text-functional-blue-light mb-2" />
                  <p className="text-xs text-center text-typography-secondary">3 días seguidos</p>
                </div>
                <div className="p-3 bg-background rounded-lg flex flex-col items-center w-24 opacity-60">
                  <Award size={32} className="text-neutral-secondary mb-2" />
                  <p className="text-xs text-center text-neutral-secondary">7 días seguidos</p>
                </div>
                <div className="p-3 bg-background rounded-lg flex flex-col items-center w-24 opacity-60">
                  <Award size={32} className="text-neutral-secondary mb-2" />
                  <p className="text-xs text-center text-neutral-secondary">30 ejercicios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;