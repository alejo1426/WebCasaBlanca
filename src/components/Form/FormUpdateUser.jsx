/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = ({ userData, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    nombres: userData.nombres || '',
    apellidos: userData.apellidos || '',
    correo: userData.correo || '',
    usuario: userData.usuario || '',
    password: '',
    telefono: userData.telefono || '',
    direccion: userData.direccion || '',
    edad: userData.edad || '',
    rol: userData.rol || '',
    nivel_aprendizaje: userData.nivel_aprendizaje || '',
  });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).*$/;

  useEffect(() => {
    setFormData({
      nombres: userData.nombres || '',
      apellidos: userData.apellidos || '',
      correo: userData.correo || '',
      usuario: userData.usuario || '',
      password: '',
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

    if (formData.password && !passwordRegex.test(formData.password)) {
      toast.error('La contraseña debe incluir al menos una mayúscula, una minúscula y un número o símbolo.');
      return;
    }

    try {
      const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: userData.id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('¡Datos actualizados exitosamente!');
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
    <section
      className="w-full md:w-1/2 bg-white p-6 rounded-lg transition-shadow"
      style={{
        boxShadow: '0 8px 16px rgba(69, 123, 157, 0.4)',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 102, 204, 0.8)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 8px 16px rgba(69, 123, 157, 0.4)')}
    >
      <h2 className="text-2xl font-bold mb-4">Modificar Datos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombres</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
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
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
            placeholder="Deja en blanco para mantener la misma contraseña"
          />
          {!passwordRegex.test(formData.password) && formData.password && (
            <p className="text-red-500 text-sm">
              La contraseña debe incluir al menos una mayúscula, una minúscula y un número o símbolo.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 text-white pl-2 rounded-md"
            min="15"
          />
        </div>
        {formData.rol === 'admin' && (
          <>
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
          </>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Actualizar Datos
        </button>
      </form>
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
      />
    </section>
  );
};

export default UpdateUser;
