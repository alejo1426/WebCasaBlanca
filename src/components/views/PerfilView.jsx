import { useState } from 'react';

const PerfilView = () => {
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    username: 'juanperez10',
    password: '********',
    phone: '123-456-7890',
    address: 'Calle Falsa 123',
  });

  // Estado para los datos del formulario (para modificar los datos)
  const [formData, setFormData] = useState({ ...userData });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simular la actualización de datos del usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregarías la lógica para actualizar los datos en el backend
    setUserData({ ...formData });
    alert('Datos actualizados exitosamente');
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between p-8">
      {/* Sección de Datos del Usuario */}
      <section className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
        <h2 className="text-2xl font-bold mb-4">Datos del Usuario</h2>
        <p><strong>Nombres:</strong> {userData.firstName}</p>
        <p><strong>Apellidos:</strong> {userData.lastName}</p>
        <p><strong>Correo Electrónico:</strong> {userData.email}</p>
        <p><strong>Usuario:</strong> {userData.username}</p>
        <p><strong>Contraseña:</strong> {userData.password}</p>
        <p><strong>Teléfono:</strong> {userData.phone}</p>
        <p><strong>Dirección:</strong> {userData.address}</p>
      </section>

      {/* Sección de Formulario de Modificación */}
      <section className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Modificar Datos</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombres</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellidos</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Actualizar Datos
          </button>
        </form>
      </section>
    </div>
  );
};

export default PerfilView;
