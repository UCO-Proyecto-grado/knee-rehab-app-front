import { useState } from 'react';
import { Search, Filter, Play, Check, Clock, BarChart2 } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const ExercisesPage = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'todos', name: 'Todos' },
    { id: 'fortalecimiento', name: 'Fortalecimiento' },
    { id: 'flexibilidad', name: 'Flexibilidad' },
    { id: 'estabilidad', name: 'Estabilidad' },
    { id: 'movimiento', name: 'Movimiento' },
  ];

  const exercises = [
    {
      id: 1,
      name: 'Elevación de pierna recta',
      category: 'fortalecimiento',
      duration: '6 min',
      difficulty: 'Fácil',
      description: 'Fortalece los músculos del cuádriceps sin doblar la rodilla.',
      completed: true,
      image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Estiramiento de isquiotibiales',
      category: 'flexibilidad',
      duration: '5 min',
      difficulty: 'Fácil',
      description: 'Mejora la flexibilidad de los músculos posteriores del muslo.',
      completed: true,
      image: 'https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      name: 'Sentadilla parcial',
      category: 'fortalecimiento',
      duration: '8 min',
      difficulty: 'Moderado',
      description: 'Fortalece los músculos de las piernas con un rango limitado de movimiento.',
      completed: false,
      image: 'https://images.pexels.com/photos/4803530/pexels-photo-4803530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      name: 'Extensión terminal de rodilla',
      category: 'fortalecimiento',
      duration: '7 min',
      difficulty: 'Moderado',
      description: 'Mejora la fuerza del cuádriceps en los últimos grados de extensión.',
      completed: false,
      image: 'https://images.pexels.com/photos/8436661/pexels-photo-8436661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      name: 'Equilibrio en una pierna',
      category: 'estabilidad',
      duration: '5 min',
      difficulty: 'Moderado',
      description: 'Mejora la propiocepción y estabilidad de la rodilla.',
      completed: false,
      image: 'https://images.pexels.com/photos/6739706/pexels-photo-6739706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 6,
      name: 'Deslizamiento de pared',
      category: 'movimiento',
      duration: '6 min',
      difficulty: 'Moderado',
      description: 'Ayuda a mejorar el rango de movimiento de la rodilla de forma controlada.',
      completed: false,
      image: 'https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const filteredExercises = exercises.filter((exercise) => {
    // Filter by category
    const categoryMatch = activeFilter === 'todos' || exercise.category === activeFilter;
    
    // Filter by search query
    const searchMatch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <Layout title="Ejercicios">
      <div className="animate-fadeIn">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-secondary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background-dark w-full pl-10 pr-4 py-2.5 rounded-lg border border-background focus:outline-none focus:ring-1 focus:ring-functional-blue-light focus:border-functional-blue-light transition-colors duration-200 text-typography-secondary"
              placeholder="Buscar ejercicios..."
            />
          </div>
          
          {/* Filter button (for mobile) */}
          <div className="md:hidden">
            <button className="bg-background-dark p-2.5 rounded-lg border border-background flex items-center justify-center w-full">
              <Filter className="h-5 w-5 text-neutral-secondary mr-2" />
              <span className="text-typography-secondary">Filtrar</span>
            </button>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-functional-blue-light text-white'
                    : 'bg-background-dark text-neutral-secondary hover:text-typography-primary'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Exercise cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-background-dark rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
                {exercise.completed && (
                  <div className="absolute top-2 right-2 bg-functional-green-light bg-opacity-90 text-background font-semibold text-xs py-1 px-2 rounded-full flex items-center">
                    <Check size={12} className="mr-1" />
                    Completado
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-typography-primary mb-1">
                  {exercise.name}
                </h3>
                <p className="text-sm text-neutral-secondary mb-3">
                  {exercise.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-neutral-secondary">
                    <Clock size={14} className="mr-1" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="px-2 py-1 rounded-full bg-background text-xs text-typography-primary">
                    {exercise.difficulty}
                  </div>
                </div>
                <Button
                  variant={exercise.completed ? "outline" : "primary"}
                  fullWidth
                  className="flex items-center justify-center"
                >
                  {exercise.completed ? (
                    <>
                      <BarChart2 size={16} className="mr-2" />
                      <span>Ver progreso</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} className="mr-2" />
                      <span>Comenzar</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredExercises.length === 0 && (
          <div className="bg-background-dark rounded-xl p-8 text-center">
            <p className="text-typography-secondary mb-2">No se encontraron ejercicios</p>
            <p className="text-neutral-secondary">Intenta con otra búsqueda o filtro</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExercisesPage;