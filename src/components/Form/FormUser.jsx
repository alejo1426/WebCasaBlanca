import { useState } from 'react';

const FormUser = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de usuario a agregar:', userData);
    // Aquí puedes agregar la lógica para enviar los datos a Supabase
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow">
      {/* Nombres */}
      <div className="mb-4">
        <label className="block text-gray-700">Nombres</label>
        <input
          type="text"
          name="nombres"
          value={userData.nombres}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          min="15"
        />
      </div>

      {/* Rol */}
      <div className="mb-4">
        <label className="block text-gray-700">Rol</label>
        <select
          name="rol"
          value={userData.rol}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="admin">Admin</option>
          <option value="instructor">Instructor</option>
          <option value="usuario">Usuario</option>
        </select>
      </div>

      {/* Nivel de aprendizaje */}
      <div className="mb-4">
        <label className="block text-gray-700">Nivel de Aprendizaje</label>
        <select
          name="nivel_aprendizaje"
          value={userData.nivel_aprendizaje}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Agregar
      </button>
    </form>
  );
};

export default FormUser;
