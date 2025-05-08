import Layout from '../components/Layout';
import { ArrowUp, ArrowDown, BarChart2, TrendingUp, Activity, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ProgressPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semana');
  const [currentWeek, setCurrentWeek] = useState('Mayo 1-7, 2025');

  // Mock data for charts
  const weeklyData = [65, 68, 70, 72, 75, 73, 78];
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  // Stats
  const stats = [
    {
      id: 1,
      title: 'Flexibilidad',
      value: '78°',
      change: '+12°',
      trend: 'up',
      color: 'bg-functional-blue-light',
    },
    {
      id: 2,
      title: 'Fuerza',
      value: '65%',
      change: '+15%',
      trend: 'up',
      color: 'bg-functional-green-light',
    },
    {
      id: 3,
      title: 'Dolor',
      value: '2/10',
      change: '-3',
      trend: 'down',
      color: 'bg-functional-coral',
    },
    {
      id: 4,
      title: 'Ejercicios completados',
      value: '24',
      change: '+4',
      trend: 'up',
      color: 'bg-functional-blue-medium',
    },
  ];

  // Scale to convert data point to height
  const getBarHeight = (value: number) => {
    const max = Math.max(...weeklyData);
    const min = Math.min(...weeklyData);
    const range = max - min;
    return ((value - min) / range) * 100 + 20; // Adding 20 to ensure small values are visible
  };

  return (
    <Layout title="Progreso">
      <div className="animate-fadeIn">
        <div className="bg-background-dark rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <BarChart2 className="text-functional-blue-light mr-2" size={22} />
              <h2 className="text-xl font-semibold text-typography-primary">
                Resumen de progreso
              </h2>
            </div>
            
            <div className="flex bg-background rounded-lg">
              <button
                onClick={() => setSelectedPeriod('semana')}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedPeriod === 'semana' 
                    ? 'bg-functional-blue-light text-white' 
                    : 'text-neutral-secondary'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setSelectedPeriod('mes')}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedPeriod === 'mes' 
                    ? 'bg-functional-blue-light text-white' 
                    : 'text-neutral-secondary'
                }`}
              >
                Mes
              </button>
              <button
                onClick={() => setSelectedPeriod('total')}
                className={`px-3 py-1.5 text-sm rounded-lg ${
                  selectedPeriod === 'total' 
                    ? 'bg-functional-blue-light text-white' 
                    : 'text-neutral-secondary'
                }`}
              >
                Total
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-neutral-secondary" />
              <span className="text-sm font-medium text-typography-secondary">
                {currentWeek}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full bg-background hover:bg-functional-blue-deep transition-colors duration-200">
                <ChevronLeft size={16} className="text-neutral-secondary" />
              </button>
              <button className="p-1 rounded-full bg-background hover:bg-functional-blue-deep transition-colors duration-200">
                <ChevronRight size={16} className="text-neutral-secondary" />
              </button>
            </div>
          </div>
          
          <div className="relative pt-5">
            <div className="flex justify-between items-end h-40">
              {weeklyData.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-functional-blue-light bg-opacity-20 rounded-t-md w-8"
                    style={{ height: `${getBarHeight(value)}%` }}
                  >
                    <div 
                      className="bg-functional-blue-light rounded-t-md w-full transition-all duration-500"
                      style={{ height: `${(value / 100) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-neutral-secondary mt-2">
                    {weekDays[index]}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 left-0 right-0 h-40 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-background border-dashed flex items-center">
                <span className="text-xs text-neutral-secondary pr-2">100°</span>
              </div>
              <div className="border-b border-background border-dashed flex items-center">
                <span className="text-xs text-neutral-secondary pr-2">75°</span>
              </div>
              <div className="border-b border-background border-dashed flex items-center">
                <span className="text-xs text-neutral-secondary pr-2">50°</span>
              </div>
              <div className="border-b border-background border-dashed flex items-center">
                <span className="text-xs text-neutral-secondary pr-2">25°</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-background-dark rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-neutral-secondary text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-typography-primary mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  {stat.title === 'Flexibilidad' && <TrendingUp size={20} className="text-white" />}
                  {stat.title === 'Fuerza' && <Activity size={20} className="text-white" />}
                  {stat.title === 'Dolor' && <Activity size={20} className="text-white" />}
                  {stat.title === 'Ejercicios completados' && <BarChart2 size={20} className="text-white" />}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === 'up' ? (
                  <div className="bg-functional-green-light bg-opacity-20 rounded-full py-0.5 px-2 text-functional-green-light text-xs flex items-center">
                    <ArrowUp size={12} className="mr-1" />
                    {stat.change}
                  </div>
                ) : (
                  <div className="bg-functional-coral bg-opacity-20 rounded-full py-0.5 px-2 text-functional-coral text-xs flex items-center">
                    <ArrowDown size={12} className="mr-1" />
                    {stat.change}
                  </div>
                )}
                <span className="text-xs text-neutral-secondary ml-2">desde la semana pasada</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Weekly summary */}
        <div className="bg-background-dark rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Calendar className="text-functional-blue-light mr-2" size={22} />
            <h2 className="text-xl font-semibold text-typography-primary">
              Resumen semanal
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 text-neutral-secondary font-medium">Fecha</th>
                  <th className="text-left py-2 px-4 text-neutral-secondary font-medium">Ejercicios</th>
                  <th className="text-left py-2 px-4 text-neutral-secondary font-medium">Duración</th>
                  <th className="text-left py-2 px-4 text-neutral-secondary font-medium">Intensidad</th>
                  <th className="text-left py-2 px-4 text-neutral-secondary font-medium">Dolor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-background">
                  <td className="py-3 px-4 text-typography-secondary">Lun, 1 mayo</td>
                  <td className="py-3 px-4 text-typography-secondary">4 completados</td>
                  <td className="py-3 px-4 text-typography-secondary">25 min</td>
                  <td className="py-3 px-4 text-typography-secondary">Media</td>
                  <td className="py-3 px-4 text-typography-secondary">3/10</td>
                </tr>
                <tr className="border-b border-background">
                  <td className="py-3 px-4 text-typography-secondary">Mar, 2 mayo</td>
                  <td className="py-3 px-4 text-typography-secondary">3 completados</td>
                  <td className="py-3 px-4 text-typography-secondary">20 min</td>
                  <td className="py-3 px-4 text-typography-secondary">Baja</td>
                  <td className="py-3 px-4 text-typography-secondary">3/10</td>
                </tr>
                <tr className="border-b border-background">
                  <td className="py-3 px-4 text-typography-secondary">Mié, 3 mayo</td>
                  <td className="py-3 px-4 text-typography-secondary">4 completados</td>
                  <td className="py-3 px-4 text-typography-secondary">30 min</td>
                  <td className="py-3 px-4 text-typography-secondary">Media</td>
                  <td className="py-3 px-4 text-typography-secondary">2/10</td>
                </tr>
                <tr className="border-b border-background">
                  <td className="py-3 px-4 text-typography-secondary">Jue, 4 mayo</td>
                  <td className="py-3 px-4 text-typography-secondary">4 completados</td>
                  <td className="py-3 px-4 text-typography-secondary">28 min</td>
                  <td className="py-3 px-4 text-typography-secondary">Alta</td>
                  <td className="py-3 px-4 text-typography-secondary">3/10</td>
                </tr>
                <tr className="border-b border-background">
                  <td className="py-3 px-4 text-typography-secondary">Vie, 5 mayo</td>
                  <td className="py-3 px-4 text-typography-secondary">3 completados</td>
                  <td className="py-3 px-4 text-typography-secondary">22 min</td>
                  <td className="py-3 px-4 text-typography-secondary">Media</td>
                  <td className="py-3 px-4 text-typography-secondary">2/10</td>
                </tr>
                <tr className="border-b border-background">
                  <td className="py-3 px-4 text-typography-secondary">Sáb, 6 mayo</td>
                  <td className="py-3 px-4 text-typography-secondary">2 completados</td>
                  <td className="py-3 px-4 text-typography-secondary">15 min</td>
                  <td className="py-3 px-4 text-typography-secondary">Baja</td>
                  <td className="py-3 px-4 text-typography-secondary">2/10</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-typography-secondary">Dom, 7 mayo</td>
                  <td className="py-3 px-4 text-typography-secondary">4 completados</td>
                  <td className="py-3 px-4 text-typography-secondary">30 min</td>
                  <td className="py-3 px-4 text-typography-secondary">Media</td>
                  <td className="py-3 px-4 text-typography-secondary">2/10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProgressPage;