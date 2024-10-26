import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import UpdateUser from '../Form/FormUpdateUser';
import perfilview from '../../assets/images/perfilview.png'

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
      <section 
        className="w-full md:w-1/2 bg-white p-6 rounded-lg transition-shadow mb-4 md:mb-0 md:mr-4 flex flex-col items-center justify-center"
        style={{ 
          boxShadow: '0 8px 16px rgba(69, 123, 157, 0.4)', // Sombra azul personalizada
          transition: 'box-shadow 0.3s ease-in-out' 
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 102, 204, 0.8)'} // Sombra más azul al pasar el cursor
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(69, 123, 157, 0.4)'} // Vuelve a la sombra original
      >
        {/* Agregar imagen aquí */}
        <img 
        src={perfilview} // Reemplaza con la URL de la imagen
          alt="Perfil del Usuario" 
          className="w-28 h-28 rounded-full mb-4" // Ajusta tamaño y estilo de la imagen
        />
        
        <h2 className="text-2xl font-bold mb-4 text-center">Datos del Usuario</h2>
        <div className="flex flex-col items-center">
          <p className="text-center"><strong>Nombres:</strong> {userData.nombres}</p>
          <p className="text-center"><strong>Apellidos:</strong> {userData.apellidos}</p>
          <p className="text-center"><strong>Correo Electrónico:</strong> {userData.correo}</p>
          <p className="text-center"><strong>Usuario:</strong> {userData.usuario}</p>
          <p className="text-center"><strong>Teléfono:</strong> {userData.telefono}</p>
          <p className="text-center"><strong>Dirección:</strong> {userData.direccion}</p>
          <p className="text-center"><strong>Edad:</strong> {userData.edad}</p>
          <p className="text-center"><strong>Rol:</strong> {userData.rol}</p>
          <p className="text-center"><strong>Nivel de Aprendizaje:</strong> {userData.nivel_aprendizaje}</p>
        </div>
      </section>

      {/* Pasar la función handleUserUpdate al componente UpdateUser */}
      <UpdateUser userData={userData} onUserUpdate={handleUserUpdate} />
    </div>
  );
};

export default PerfilView;
