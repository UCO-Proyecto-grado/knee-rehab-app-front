import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  BarChart2, 
  Video, 
  User, 
  Calendar, 
  FileText,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigationItems = [
    { 
      icon: <Home size={20} />, 
      label: 'Inicio', 
      path: '/dashboard' 
    },
    { 
      icon: <Video size={20} />, 
      label: 'Ejercicios', 
      path: '/ejercicios' 
    },
    { 
      icon: <BarChart2 size={20} />, 
      label: 'Progreso', 
      path: '/progreso' 
    },
    { 
      icon: <Calendar size={20} />, 
      label: 'Citas', 
      path: '/citas' 
    },
    { 
      icon: <FileText size={20} />, 
      label: 'Recursos', 
      path: '/recursos' 
    },
    { 
      icon: <User size={20} />, 
      label: 'Perfil', 
      path: '/perfil' 
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-background-dark">
      <div className="flex items-center justify-center h-16 border-b border-background">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-typography-primary" />
          <span className="text-xl font-semibold text-typography-primary">KneeRehab</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-3 rounded-md transition-colors duration-200
                ${isActive(item.path) 
                  ? 'bg-functional-blue-deep text-white' 
                  : 'text-neutral-secondary hover:bg-background hover:text-typography-primary'}
              `}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-background">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-neutral-secondary rounded-md hover:bg-background hover:text-functional-coral transition-colors duration-200"
        >
          <LogOut size={20} className="mr-3" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;