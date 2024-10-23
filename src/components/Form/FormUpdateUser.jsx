import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Asegúrate de tener la biblioteca instalada
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = ({ userData, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    nombres: userData.nombres || '',
    apellidos: userData.apellidos || '',
    correo: userData.correo || '',
    usuario: userData.usuario || '',
    password: '', // Mantener el campo de contraseña vacío
    telefono: userData.telefono || '',
    direccion: userData.direccion || '',
    edad: userData.edad || '',
    rol: userData.rol || '',
    nivel_aprendizaje: userData.nivel_aprendizaje || '',
  });

  // Efecto para actualizar el formulario cuando cambian los datos del usuario
  useEffect(() => {
    setFormData({
      nombres: userData.nombres || '',
      apellidos: userData.apellidos || '',
      correo: userData.correo || '',
      usuario: userData.usuario || '',
      password: '', // Mantener el campo de contraseña vacío
      telefono: userData.telefono || '',
      direccion: userData.direccion || '',
      edad: userData.edad || '',
      rol: userData.rol || '',
      nivel_aprendizaje: userData.nivel_aprendizaje || '',
    });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: userData.id, // Asegúrate de incluir el ID del usuario
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('¡Datos actualizados exitosamente!');

        // Llama a la función para actualizar los datos en el componente padre
        onUserUpdate({ ...formData, id: userData.id });
      } else {
        toast.error(result.error || 'Hubo un error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      toast.error('Error al actualizar los datos. Ocurrió un error inesperado.');
    }
  };

  return (
    <section className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Modificar Datos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombres</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            placeholder="Deja en blanco para mantener la misma contraseña"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            min="15"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar Rol</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="usuario">Usuario</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nivel de Aprendizaje</label>
          <select
            name="nivel_aprendizaje"
            value={formData.nivel_aprendizaje}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
          >
            <option value="">Seleccionar Nivel</option>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Actualizar Datos
        </button>
      </form>

      {/* Contenedor de Toastify */}
      <ToastContainer />
    </section>
  );
};

export default UpdateUser;
