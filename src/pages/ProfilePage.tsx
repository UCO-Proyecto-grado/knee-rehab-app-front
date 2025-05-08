import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import { User, Mail, Phone, Bell, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  
  const tabs = [
    { id: 'personal', label: 'Información personal' },
    { id: 'notifications', label: 'Notificaciones' },
    { id: 'privacy', label: 'Privacidad y seguridad' },
  ];

  return (
    <Layout title="Mi Perfil">
      <div className="animate-fadeIn">
        <div className="bg-background-dark rounded-xl shadow-md overflow-hidden">
          {/* Profile header */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-28 h-28 rounded-full bg-functional-blue-deep flex items-center justify-center text-white text-4xl">
              <User size={48} />
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold text-typography-primary mb-1">
                {user?.name || 'Usuario'}
              </h2>
              <p className="text-neutral-secondary mb-4">
                {user?.email || 'usuario@example.com'}
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-functional-blue-dark bg-opacity-30 py-1 px-3 rounded-full text-functional-blue-light text-sm">
                  Día 3 de 30
                </div>
                <div className="bg-functional-green-light bg-opacity-20 py-1 px-3 rounded-full text-functional-green-light text-sm">
                  8 ejercicios completados
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-b border-background">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-typography-primary border-b-2 border-functional-blue-light'
                      : 'text-neutral-secondary hover:text-typography-secondary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'personal' && (
              <div>
                <h3 className="text-lg font-semibold text-typography-primary mb-6">
                  Información personal
                </h3>
                
                <form className="space-y-5 max-w-2xl">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      label="Nombre completo"
                      value={user?.name || ''}
                      icon={<User size={16} />}
                      className="flex-1"
                    />
                    <Input
                      label="Correo electrónico"
                      type="email"
                      value={user?.email || ''}
                      icon={<Mail size={16} />}
                      className="flex-1"
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      label="Teléfono"
                      type="tel"
                      placeholder="+34 XXX XXX XXX"
                      icon={<Phone size={16} />}
                      className="flex-1"
                    />
                    <div className="flex-1"></div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">Guardar cambios</Button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-semibold text-typography-primary mb-6 flex items-center">
                  <Bell size={18} className="mr-2 text-functional-blue-light" />
                  Preferencias de notificaciones
                </h3>
                
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <h4 className="text-typography-secondary font-medium">Recordatorios de ejercicios</h4>
                      <p className="text-sm text-neutral-secondary">Recibe notificaciones para completar tus ejercicios diarios</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-functional-blue-light"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <h4 className="text-typography-secondary font-medium">Recordatorios de citas</h4>
                      <p className="text-sm text-neutral-secondary">Recibe recordatorios de tus próximas citas médicas</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-functional-blue-light"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <h4 className="text-typography-secondary font-medium">Actualizaciones de programa</h4>
                      <p className="text-sm text-neutral-secondary">Recibe notificaciones cuando haya cambios en tu programa</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-functional-blue-light"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div>
                      <h4 className="text-typography-secondary font-medium">Correos electrónicos promocionales</h4>
                      <p className="text-sm text-neutral-secondary">Recibe información sobre nuevos servicios y ofertas</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-background-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-functional-blue-light"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div>
                <h3 className="text-lg font-semibold text-typography-primary mb-6 flex items-center">
                  <Shield size={18} className="mr-2 text-functional-blue-light" />
                  Privacidad y seguridad
                </h3>
                
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h4 className="text-typography-secondary font-medium mb-4">Cambiar contraseña</h4>
                    <form className="space-y-4">
                      <Input
                        label="Contraseña actual"
                        type="password"
                        placeholder="••••••••"
                      />
                      <Input
                        label="Nueva contraseña"
                        type="password"
                        placeholder="••••••••"
                      />
                      <Input
                        label="Confirmar nueva contraseña"
                        type="password"
                        placeholder="••••••••"
                      />
                      <div className="pt-2">
                        <Button type="submit">Actualizar contraseña</Button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="pt-4 border-t border-background">
                    <h4 className="text-typography-secondary font-medium mb-4">Sesiones activas</h4>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-typography-secondary">Este dispositivo</p>
                          <p className="text-xs text-neutral-secondary">Iniciado el 7 de mayo, 2025</p>
                        </div>
                        <span className="px-2 py-1 bg-functional-green-light bg-opacity-20 text-functional-green-light text-xs rounded-full">
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-background">
                    <h4 className="text-typography-secondary font-medium mb-4">Eliminar cuenta</h4>
                    <p className="text-neutral-secondary text-sm mb-4">
                      Al eliminar tu cuenta, todos tus datos serán eliminados permanentemente y no podrán ser recuperados.
                    </p>
                    <Button 
                      variant="danger"
                      className="flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Eliminar mi cuenta
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;