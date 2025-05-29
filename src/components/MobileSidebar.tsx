import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
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

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-background opacity-75" onClick={onClose}></div>
      
      <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-sm bg-background-dark shadow-xl">
        <div className="flex items-center justify-between h-16 px-4 border-b border-background">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-typography-primary" />
            <span className="text-lg font-semibold text-typography-primary">Knee Rehab</span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-secondary hover:text-white"
          >
            <X size={24} />
          </button>
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
                onClick={onClose}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-background">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-neutral-secondary rounded-md hover:bg-background hover:text-functional-coral transition-colors duration-200"
          >
            <LogOut size={20} className="mr-3" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;