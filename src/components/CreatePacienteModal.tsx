import React, { useState, useEffect } from 'react';
import { X, UserPlus } from 'lucide-react';
import Button from './Button';
import { postCreatePaciente } from '../services/accesos_personal_service';

// Define interfaces for dropdown data - assuming these would be fetched from an API
interface SelectOption {
  id: string;
  nombre: string;
}

// Define the structure for the Paciente creation payload
interface PacienteCreatePayload {
  identificacion: string;
  nombre: string;
  apellido: string;
  genero: string;
  fecha_nacimiento: string; // Format YYYY-MM-DD
  telefono: string;
  telefono_validado: boolean;
  email: string;
  email_validado: boolean;
  contrasena: string;
  direccion: string;
  id_tipo_identificacion: string;
  id_estado: string; // This might represent an initial state like "activo" or "pendiente"
  id_ciudad: string;
  id_sede: string; // Assuming a patient is assigned to a Sede
}

interface CreatePacienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPacienteCreated: (newPaciente: any) => void; // Adjust 'any' to the actual Paciente type if available
}

// Mock data for dropdowns (replace with API calls)
const mockTiposIdentificacion: SelectOption[] = [
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', nombre: 'Cédula de Ciudadanía' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', nombre: 'Tarjeta de Identidad' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', nombre: 'Pasaporte' },
];

const mockEstados: SelectOption[] = [
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', nombre: 'Activo' }, // Example from your JSON
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa7', nombre: 'Inactivo' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa8', nombre: 'Pendiente' },
];

const mockCiudades: SelectOption[] = [
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', nombre: 'Palmira' }, // Example
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa9', nombre: 'Cali' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afb0', nombre: 'Bogotá' },
];

const mockSedes: SelectOption[] = [
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', nombre: 'Sede Principal' }, // Example
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afb1', nombre: 'Sede Norte' },
];

const initialFormState: PacienteCreatePayload = {
  identificacion: '',
  nombre: '',
  apellido: '',
  genero: 'Masculino', // Default value
  fecha_nacimiento: '',
  telefono: '',
  telefono_validado: false,
  email: '',
  email_validado: false,
  contrasena: '',
  direccion: '',
  id_tipo_identificacion: mockTiposIdentificacion[0]?.id || '',
  id_estado: mockEstados[0]?.id || '',
  id_ciudad: mockCiudades[0]?.id || '',
  id_sede: mockSedes[0]?.id || '',
};

const CreatePacienteModal: React.FC<CreatePacienteModalProps> = ({ isOpen, onClose, onPacienteCreated }) => {
  const [formData, setFormData] = useState<PacienteCreatePayload>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: useEffect to fetch actual dropdown data for tiposIdentificacion, estados, ciudades, sedes
  // For now, using mock data defined above.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // const checked = (e.target as HTMLInputElement).checked; // For checkboxes
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation example (can be expanded with a library like Zod or Yup)
    if (!formData.identificacion || !formData.nombre || !formData.apellido || !formData.email || !formData.contrasena) {
        setError('Por favor complete todos los campos obligatorios: Identificación, Nombre, Apellido, Email, Contraseña.');
        setIsSubmitting(false);
        return;
    }

    try {
      const newPaciente = await postCreatePaciente(formData);
      onPacienteCreated(newPaciente); // Callback to parent component
      setFormData(initialFormState); // Reset form
      onClose(); // Close modal
    } catch (err: any) {
      console.error('Error creating paciente:', err);
      setError(err.response?.data?.message || err.message || 'Ocurrió un error al crear el paciente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-background-dark rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-typography-primary flex items-center">
            <UserPlus size={24} className="mr-3 text-functional-blue-light" />
            Crear Nuevo Paciente
          </h2>
          <button onClick={onClose} className="text-neutral-secondary hover:text-typography-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-functional-red-dark text-white p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-typography-secondary mb-1">Nombre *</label>
              <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} required className="input-form-style" />
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-typography-secondary mb-1">Apellido *</label>
              <input type="text" name="apellido" id="apellido" value={formData.apellido} onChange={handleChange} required className="input-form-style" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="id_tipo_identificacion" className="block text-sm font-medium text-typography-secondary mb-1">Tipo Identificación *</label>
              <select name="id_tipo_identificacion" id="id_tipo_identificacion" value={formData.id_tipo_identificacion} onChange={handleChange} required className="input-form-style">
                {mockTiposIdentificacion.map(option => (
                  <option key={option.id} value={option.id}>{option.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="identificacion" className="block text-sm font-medium text-typography-secondary mb-1">Identificación *</label>
              <input type="text" name="identificacion" id="identificacion" value={formData.identificacion} onChange={handleChange} required className="input-form-style" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-typography-secondary mb-1">Género</label>
              <select name="genero" id="genero" value={formData.genero} onChange={handleChange} className="input-form-style">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
            </div>
            <div>
              <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-typography-secondary mb-1">Fecha Nacimiento *</label>
              <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required className="input-form-style" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-typography-secondary mb-1">Email *</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="input-form-style" />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-typography-secondary mb-1">Teléfono *</label>
              <input type="tel" name="telefono" id="telefono" value={formData.telefono} onChange={handleChange} required className="input-form-style" />
            </div>
          </div>

          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-typography-secondary mb-1">Dirección</label>
            <input type="text" name="direccion" id="direccion" value={formData.direccion} onChange={handleChange} className="input-form-style" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="id_ciudad" className="block text-sm font-medium text-typography-secondary mb-1">Ciudad *</label>
              <select name="id_ciudad" id="id_ciudad" value={formData.id_ciudad} onChange={handleChange} required className="input-form-style">
                {mockCiudades.map(option => (
                  <option key={option.id} value={option.id}>{option.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="id_sede" className="block text-sm font-medium text-typography-secondary mb-1">Sede Asignada *</label>
              <select name="id_sede" id="id_sede" value={formData.id_sede} onChange={handleChange} required className="input-form-style">
                {mockSedes.map(option => (
                  <option key={option.id} value={option.id}>{option.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-typography-secondary mb-1">Contraseña Temporal *</label>
            <input type="password" name="contrasena" id="contrasena" value={formData.contrasena} onChange={handleChange} required className="input-form-style" />
            <p className="text-xs text-neutral-secondary mt-1">El paciente deberá cambiarla en su primer inicio de sesión.</p>
          </div>

           {/* telefono_validado and email_validado are false by default and typically set by backend processes */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label htmlFor="id_estado" className="block text-sm font-medium text-typography-secondary mb-1">Estado Inicial *</label>
                <select name="id_estado" id="id_estado" value={formData.id_estado} onChange={handleChange} required className="input-form-style">
                    {mockEstados.map(option => (
                    <option key={option.id} value={option.id}>{option.nombre}</option>
                    ))}
                </select>
             </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} isLoading={isSubmitting}>
              {isSubmitting ? 'Creando Paciente...' : 'Crear Paciente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePacienteModal;

// Helper style for inputs (could be moved to index.css or a global styles file)
// You might already have a shared input style defined.
// If so, replace `className="input-form-style"` with your existing style class.
const styles = `
  .input-form-style {
    display: block;
    width: 100%;
    padding: 0.625rem 0.75rem; /* 10px 12px */
    font-size: 0.875rem; /* 14px */
    line-height: 1.25rem; /* 20px */
    color: #D1D5DB; /* gray-300 for text-typography-secondary approx */
    background-color: #374151; /* gray-700 for bg-background approx */
    border: 1px solid #4B5563; /* gray-600 for border-background-light approx */
    border-radius: 0.375rem; /* rounded-lg */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .input-form-style:focus {
    outline: none;
    border-color: #3B82F6; /* functional-blue-light */
    box-shadow: 0 0 0 0.125rem rgba(59, 130, 246, 0.25); /* ring-functional-blue-light with opacity */
  }
  .input-form-style::placeholder {
    color: #6B7280; /* gray-500 for text-neutral-secondary approx */
  }
`;

// Inject styles into the head - This is a simple way for a self-contained component.
// For larger apps, prefer a global CSS file or CSS-in-JS solution.
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
} 