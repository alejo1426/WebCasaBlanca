import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import UpdateUser from '../Form/FormUpdateUser';

const PerfilView = () => {
  const [userData, setUserData] = useState(null);

  // Función para obtener datos del usuario
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    if (!token || typeof token !== 'string') {
      console.error('Invalid token:', token);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // useEffect para obtener datos al montar el componente
  useEffect(() => {
    fetchUserData();
  }, []);

  // Función para manejar la actualización de usuario
  const handleUserUpdate = async (updatedData) => {
    setUserData(updatedData); // Actualiza el estado local
    // O también podrías volver a llamar a fetchUserData si necesitas confirmar que la actualización fue exitosa
    // await fetchUserData();
  };

  if (!userData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between p-8">
      <section className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
        <h2 className="text-2xl font-bold mb-4">Datos del Usuario</h2>
        <p><strong>Nombres:</strong> {userData.nombres}</p>
        <p><strong>Apellidos:</strong> {userData.apellidos}</p>
        <p><strong>Correo Electrónico:</strong> {userData.correo}</p>
        <p><strong>Usuario:</strong> {userData.usuario}</p>
        <p><strong>Teléfono:</strong> {userData.telefono}</p>
        <p><strong>Dirección:</strong> {userData.direccion}</p>
        <p><strong>Edad:</strong> {userData.edad}</p>
        <p><strong>Rol:</strong> {userData.rol}</p>
        <p><strong>Nivel de Aprendizaje:</strong> {userData.nivel_aprendizaje}</p>
      </section>

      {/* Pasar la función handleUserUpdate al componente UpdateUser */}
      <UpdateUser userData={userData} onUserUpdate={handleUserUpdate} />
    </div>
  );
};

export default PerfilView;
