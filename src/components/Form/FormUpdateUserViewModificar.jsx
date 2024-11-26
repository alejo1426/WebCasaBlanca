/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormUpdateUser = ({ initialData, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombres: initialData.nombres || '',
    apellidos: initialData.apellidos || '',
    correo: initialData.correo || '',
    usuario: initialData.usuario || '',
    password: '', // Mantener el campo de contraseña vacío
    telefono: initialData.telefono || '',
    direccion: initialData.direccion || '',
    edad: initialData.edad || '',
    rol: initialData.rol || '',
    nivel_aprendizaje: initialData.nivel_aprendizaje || '',
  });

  // Efecto para actualizar el formulario cuando cambian los datos iniciales
  useEffect(() => {
    setFormData({
      nombres: initialData.nombres || '',
      apellidos: initialData.apellidos || '',
      correo: initialData.correo || '',
      usuario: initialData.usuario || '',
      password: '', // Mantener el campo de contraseña vacío
      telefono: initialData.telefono || '',
      direccion: initialData.direccion || '',
      edad: initialData.edad || '',
      rol: initialData.rol || '',
      nivel_aprendizaje: initialData.nivel_aprendizaje || '',
    });
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const {
      nombres,
      apellidos,
      correo,
      usuario,
      telefono,
      edad,
      rol,
      nivel_aprendizaje,
      password,
    } = formData;
  
    // Validar que todos los campos obligatorios estén llenos
    if (!nombres || !apellidos || !correo || !usuario || !rol || !nivel_aprendizaje) {
      toast.error('Por favor, complete todos los campos obligatorios.');
      return false;
    }
  
    // Validación del correo electrónico
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      toast.error('Por favor, ingrese un correo electrónico válido.');
      return false;
    }
  
    // Validación del teléfono
    if (telefono && !/^\d+$/.test(telefono)) {
      toast.error('El teléfono debe contener solo números.');
      return false;
    }
  
    // Validación de la edad
    if (edad && (isNaN(edad) || edad < 15 || edad > 80)) {
      toast.error('La edad debe ser un número y mayor de 14.');
      return false;
    }
  
    // Validación de la nueva contraseña
    if (password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/;
      if (!passwordRegex.test(password)) {
        toast.error(
          'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número o símbolo.'
        );
        return false;
      }
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Validar antes de enviar

    try {
      const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: initialData.id, // Asegúrate de incluir el ID del usuario
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('¡Datos actualizados exitosamente!');

        // Llama a la función para actualizar los datos en el componente padre
        onUpdate({ ...formData, id: initialData.id });
      } else {
        toast.error(result.error || 'Hubo un error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      toast.error('Error al actualizar los datos. Ocurrió un error inesperado.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Modificar Datos</h2>

        {/* Nombres */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombres</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Apellidos */}
        <div className="mb-4">
          <label className="block text-gray-700">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Correo Electrónico */}
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-gray-700">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Deja en blanco para mantener la misma contraseña"
          />
        </div>

        {/* Teléfono */}
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Dirección */}
        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Edad */}
        <div className="mb-4">
          <label className="block text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            min="15"
          />
        </div>

        {/* Rol */}
        <div className="mb-4">
          <label className="block text-gray-700">Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccionar Rol</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="usuario">Usuario</option>
          </select>
        </div>

        {/* Nivel de Aprendizaje */}
        <div className="mb-4">
          <label className="block text-gray-700">Nivel de Aprendizaje</label>
          <select
            name="nivel_aprendizaje"
            value={formData.nivel_aprendizaje}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccionar Nivel</option>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        {/* Botón de submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Actualizar Usuario
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormUpdateUser;