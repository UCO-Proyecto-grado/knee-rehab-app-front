import { Menu, Bell, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MobileSidebar from './MobileSidebar';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="bg-background-dark shadow-md z-10">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-typography-primary truncate">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="text-neutral-secondary hover:text-typography-primary focus:outline-none"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-functional-coral rounded-full"></span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-background-dark rounded-md shadow-lg py-1 z-50 border border-background">
                  <div className="px-4 py-2 border-b border-background">
                    <h3 className="text-sm font-semibold text-typography-primary">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-background cursor-pointer transition-colors duration-150">
                      <p className="text-sm text-typography-primary">Nuevo ejercicio disponible</p>
                      <p className="text-xs text-neutral-secondary">Hace 5 minutos</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-background cursor-pointer transition-colors duration-150">
                      <p className="text-sm text-typography-primary">¡Progreso logrado!</p>
                      <p className="text-xs text-neutral-secondary">Hace 3 horas</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                className="flex items-center text-neutral-secondary hover:text-typography-primary focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-functional-blue-deep flex items-center justify-center text-white">
                  <User size={18} />
                </div>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background-dark rounded-md shadow-lg py-1 z-50 border border-background">
                  <div className="px-4 py-2 border-b border-background">
                    <p className="text-sm font-semibold text-typography-primary">
                      {(user?.nombre && user?.apellido) ? `${user.nombre} ${user.apellido}` : 'Usuario'}
                    </p>
                    <p className="text-xs text-neutral-secondary">{user?.email || '-'}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-functional-coral hover:bg-background"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <MobileSidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
    </>
  );
};

export default TopBar;