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
      let userDataSet = false;

      // Priority 1: Try to load user from sessionStorage.getItem('UserInfo')
      const userInfoString = sessionStorage.getItem('UserInfo');
      if (userInfoString) {
        try {
          const parsedUserInfo = JSON.parse(userInfoString);
          if (parsedUserInfo && parsedUserInfo.usuario && parsedUserInfo.usuario.id) {
            const pacienteData: Paciente = parsedUserInfo.usuario;
            setUser(pacienteData);
            localStorage.setItem('user', JSON.stringify(pacienteData)); // Sync to localStorage
            sessionStorage.setItem('pacienteId', pacienteData.id); // Sync pacienteId for compatibility
            userDataSet = true;
            console.log('User loaded from UserInfo in sessionStorage', pacienteData);
          } else {
            console.warn('UserInfo in sessionStorage is invalid or missing .usuario field. Clearing it.');
            sessionStorage.removeItem('UserInfo');
          }
        } catch (error) {
          console.error('Failed to parse UserInfo from sessionStorage. Clearing it.', error);
          sessionStorage.removeItem('UserInfo');
        }
      }

      // Priority 2: Fallback to localStorage.getItem('user') if UserInfo was not successful
      if (!userDataSet) {
        const storedUser = localStorage.getItem('user'); // This is expected to be a Paciente object string
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser) as Paciente;
            setUser(parsedUser);
            sessionStorage.setItem('pacienteId', parsedUser.id); // Ensure pacienteId in session is also set
            userDataSet = true;
            console.log('User loaded from localStorage', parsedUser);
          } catch (e) {
            console.error("Failed to parse user from localStorage. Clearing it.", e);
            localStorage.removeItem('user');
            sessionStorage.removeItem('pacienteId'); // Clear associated session item
          }
        }
      }
      
      // Priority 3: Fallback to hardcoded Paciente ID for development (if still no user)
      // This uses the ID from your example UserInfo: "00afde86-1027-4309-aaaf-ed16955c8993"
      if (!userDataSet) {
        const hardcodedPacienteIdForDev = '00afde86-1027-4309-aaaf-ed16955c8993';
        console.log(`Attempting to load user with hardcoded ID: ${hardcodedPacienteIdForDev}`);
        try {
            const response = await getPacienteById(hardcodedPacienteIdForDev);
            if (response && response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                sessionStorage.setItem('pacienteId', response.data.id);
                // Optionally, you could even populate sessionStorage 'UserInfo' here for consistency in dev
                // const devUserInfo = { usuario: response.data, email: response.data.email, id_cognito: 'dev-cognito-id', roles: ['Paciente'] };
                // sessionStorage.setItem('UserInfo', JSON.stringify(devUserInfo));
                userDataSet = true; // Mark that user data is now set
                console.log('User loaded using hardcoded dev ID', response.data);
            } else {
                console.error('Hardcoded ID fetch succeeded but API response structure was invalid or missing data.');
                localStorage.removeItem('user');
                sessionStorage.removeItem('pacienteId');
                sessionStorage.removeItem('UserInfo'); // Clear all if this critical fallback fails
            }
        } catch (error) {
            console.error('Error during hardcoded default login (getPacienteById): ', error);
            setUser(null); // Ensure user is null on failure
            localStorage.removeItem('user');
            sessionStorage.removeItem('pacienteId');
            sessionStorage.removeItem('UserInfo');
        }
      }

      if (!userDataSet) {
        console.log('No user data could be loaded after all attempts.');
      }

      setIsLoading(false);
    };

    attemptAutoLoginAndFallback();
  }, []);

  const login = async (_email: string, _password: string) => { 
    setIsLoading(true);
    // TODO: This login function should be updated to fetch the full UserInfo object upon successful authentication,
    // then store it in sessionStorage.setItem('UserInfo', JSON.stringify(apiResponse)).
    // Finally, call setUser(apiResponse.usuario).
    // For now, it uses a hardcoded ID and getPacienteById, which might not align with the new UserInfo flow.
    const hardcodedPacienteId = 'fa4504f5-3601-4461-bcdd-edd760d3e5cd'; // Example ID, may not match your test data
    console.warn("Login function is using a hardcoded ID and may not reflect the new UserInfo flow. Needs update for production.");
    try {
      const response = await getPacienteById(hardcodedPacienteId);
      if (response && response.data) {
        const pacienteData = response.data;
        setUser(pacienteData);
        localStorage.setItem('user', JSON.stringify(pacienteData));
        sessionStorage.setItem('pacienteId', pacienteData.id);
        // To align with the new flow, this should ideally set 'UserInfo' in sessionStorage as well.
        // Example: const mockUserInfo = { usuario: pacienteData, email: pacienteData.email, id_cognito: 'mock-cognito-id', roles: ['some_role'] };
        // sessionStorage.setItem('UserInfo', JSON.stringify(mockUserInfo));
      } else {
        throw new Error('Login fetch succeeded but API response structure was invalid or missing data.');
      }
    } catch (error) {
      console.error('Error during login (fetch by ID):', error);
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('pacienteId');
      sessionStorage.removeItem('UserInfo'); // Clear UserInfo on login failure too
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, _password: string, nombre: string, apellido: string) => {
    setIsLoading(true);
    // TODO: This function should also align with the UserInfo structure after successful registration.
    // The backend should return the full UserInfo, which is then stored.
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
      // To align, also set a mock UserInfo object in sessionStorage
      // const mockUserInfo = { usuario: userData, email: userData.email, id_cognito: 'new-cognito-id', roles: ['some_role'] };
      // sessionStorage.setItem('UserInfo', JSON.stringify(mockUserInfo));
      console.warn("Register function created mock Paciente data. Needs update to handle UserInfo structure from backend.");
    } catch (error) {
      console.error('Error during registration:', error);
      setUser(null); 
      localStorage.removeItem('user');
      sessionStorage.removeItem('pacienteId'); 
      sessionStorage.removeItem('UserInfo');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('pacienteId'); 
    sessionStorage.removeItem('UserInfo'); // Ensure UserInfo is cleared on logout
    console.log('User logged out, all auth storage cleared.');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
