import React, { createContext, useState, useContext, useEffect } from 'react';
import { getPacienteById } from '../services/accesos_personal_service'; // Added import

// Define interfaces based on the Paciente JSON structure
interface Pais {
  nombre: string;
  id?: string;
}

interface Departamento {
  nombre: string;
  pais: Pais;
  id?: string;
  id_pais?: string;
}

interface Ciudad {
  nombre: string;
  departamento?: Departamento; // Made optional for simpler mock data initially
  id?: string;
  id_departamento?: string;
}

interface TipoIdentificacion {
  nombre: string;
  codigo: string;
  id?: string;
}

interface Estado {
  nombre: string;
  id?: string;
}

interface TipoSede {
  nombre: string;
  id: string;
}

interface CentroRehabilitacion {
  id_tipo_identificacion: string;
  identificacion: string;
  nombre: string;
  correo: string;
  id: string;
  tipo_identificacion: TipoIdentificacion;
  created_at: string;
  updated_at: string;
}

interface Sede {
  codigo_sede: string;
  direccion: string;
  telefono: string;
  telefono_validado: boolean;
  correo: string;
  email_validado: boolean;
  id: string;
  tipo_sede: TipoSede;
  ciudad: Ciudad;
  centro_rehabilitacion: CentroRehabilitacion;
  estado: Estado;
  created_at: string;
  updated_at: string;
}

interface Paciente {
  id: string;
  identificacion: string;
  nombre: string; // Replaces 'name' from old User interface
  apellido: string;
  genero: string;
  fecha_nacimiento: string;
  telefono: string;
  telefono_validado: boolean;
  email: string; // Already part of the old User interface
  email_validado: boolean;
  // contrasena: string; // Generally not stored in frontend context
  direccion: string;
  tipo_identificacion: TipoIdentificacion;
  estado: Estado;
  ciudad: Ciudad;
  sede?: Sede; // Made Sede optional for simpler initial mock, can be loaded later
}

interface AuthContextType {
  user: Paciente | null; // Changed User to Paciente
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nombre: string, apellido: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Paciente | null>(null); // Initial state to null
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const attemptAutoLoginAndFallback = async () => {
      setIsLoading(true);
      let userFound = false;
      const pacienteIdFromSession = sessionStorage.getItem('pacienteId');

      if (pacienteIdFromSession) {
        try {
          console.log(`Attempting to fetch user with ID from session: ${pacienteIdFromSession}`);
          const response = await getPacienteById(pacienteIdFromSession);
          if (response && response.data) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            sessionStorage.setItem('pacienteId', response.data.id); 
            userFound = true;
            console.log('User data loaded from API via session ID', response.data);
          } else {
            console.warn('Invalid API response structure when fetching by session ID');
            // Potentially clear session storage if response is bad
            // sessionStorage.removeItem('pacienteId'); 
          }
        } catch (error) {
          console.error('Failed to fetch user by ID from session storage:', error);
          // Clear potentially problematic session/local storage items
          localStorage.removeItem('user');
          sessionStorage.removeItem('pacienteId');
        }
      }

      if (!userFound) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser) as Paciente;
            setUser(parsedUser);
            sessionStorage.setItem('pacienteId', parsedUser.id);
            userFound = true;
            console.log('User data loaded from localStorage (no session ID or session fetch failed)', parsedUser);
          } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem('user');
            sessionStorage.removeItem('pacienteId'); // Clear session if local user is corrupt
          }
        }
      }

      if (!userFound) {
        console.log("No user found in session or local storage. Attempting default login for development.");
        const hardcodedPacienteIdForDev = 'fa4504f5-3601-4461-bcdd-edd760d3e5cd';
        try {
            const response = await getPacienteById(hardcodedPacienteIdForDev);
            if (response && response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                sessionStorage.setItem('pacienteId', response.data.id);
                console.log('Default login successful, user data fetched:', response.data);
            } else {
                console.error('Default login fetch succeeded but API response structure was invalid or missing data.');
                // User remains null, storages should ideally be clear or reflect this failed state
                localStorage.removeItem('user');
                sessionStorage.removeItem('pacienteId');
            }
        } catch (error) {
            console.error('Error during default login attempt (dev fallback):', error);
            setUser(null);
            localStorage.removeItem('user');
            sessionStorage.removeItem('pacienteId');
        }
      }
      setIsLoading(false);
    };

    attemptAutoLoginAndFallback();
  }, []);

  const login = async (_email: string, _password: string) => { 
    setIsLoading(true);
    const hardcodedPacienteId = 'fa4504f5-3601-4461-bcdd-edd760d3e5cd'; 
    try {
      console.log(`Attempting login by fetching Paciente ID: ${hardcodedPacienteId}`);
      const response = await getPacienteById(hardcodedPacienteId);
      if (response && response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        sessionStorage.setItem('pacienteId', response.data.id); 
        console.log('Login successful, user data fetched:', response.data);
      } else {
        throw new Error('Login fetch succeeded but API response structure was invalid or missing data.');
      }
    } catch (error) {
      console.error('Error during login (fetch by ID):', error);
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('pacienteId');
      // throw error; // Decide if login function itself should throw or just handle internally
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, _password: string, nombre: string, apellido: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      const userData: Paciente = {
        id: 'new-user-id-' + Date.now(), 
        email,
        nombre,
        apellido,
        identificacion: '000000000', 
        genero: 'No especificado', 
        fecha_nacimiento: '2000-01-01',
        telefono: '0000000000', 
        telefono_validado: false,
        email_validado: false, 
        direccion: 'N/A', 
        tipo_identificacion: { nombre: 'No especificado', codigo: 'N/A' }, 
        estado: { nombre: 'Pendiente Activación' }, 
        ciudad: { nombre: 'No especificada' }, 
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('pacienteId', userData.id); 
      console.log('Registration successful (mock):', userData);
    } catch (error) {
      console.error('Error during registration:', error);
      setUser(null); 
      localStorage.removeItem('user');
      sessionStorage.removeItem('pacienteId'); 
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('pacienteId'); 
    console.log('User logged out, session and local storage cleared.');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};