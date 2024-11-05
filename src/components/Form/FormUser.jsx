/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormUser = ({ onUserAdded }) => {
  const [userData, setUserData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    usuario: '',
    password: '',
    telefono: '',
    direccion: '',
    edad: '',
    rol: 'usuario', // Valor predeterminado
    nivel_aprendizaje: 'principiante', // Valor predeterminado
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres: userData.nombres,
          apellidos: userData.apellidos,
          correo: userData.correo,
          usuario: userData.usuario,
          password: userData.password, // Password will be hashed by the backend
          telefono: userData.telefono,
          direccion: userData.direccion,
          edad: parseInt(userData.edad, 10),
          rol: 'usuario',
          nivel_aprendizaje: 'principiante',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Hubo un error en el registro. Intenta nuevamente.');
      } else {
        toast.success('Usuario agregado exitosamente');
        onUserAdded(); // Llamar a la función pasada desde el componente padre
        // Reiniciar los datos del formulario
        setUserData({
          nombres: '',
          apellidos: '',
          correo: '',
          usuario: '',
          password: '',
          telefono: '',
          direccion: '',
          edad: '',
          rol: 'usuario',
          nivel_aprendizaje: 'principiante',
        });
      }
    } catch (error) {
      console.error('Error en la conexión al backend:', error);
      toast.error('Error en la conexión al backend. Intenta de nuevo.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
        {/* Nombres */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombres</label>
          <input
            type="text"
            name="nombres"
            value={userData.nombres}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
            required
          />
        </div>

        {/* Apellidos */}
        <div className="mb-4">
          <label className="block text-gray-700">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={userData.apellidos}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
            required
          />
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="block text-gray-700">Correo</label>
          <input
            type="email"
            name="correo"
            value={userData.correo}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
            required
          />
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-gray-700">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={userData.usuario}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
            required
          />
        </div>

        {/* Teléfono */}
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
          />
        </div>

        {/* Dirección */}
        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={userData.direccion}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
          />
        </div>

        {/* Edad */}
        <div className="mb-4">
          <label className="block text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            value={userData.edad}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white pl-2"
            min="15"
            required
          />
        </div>

        {/* Botón de submit */}
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Agregar
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormUser;
