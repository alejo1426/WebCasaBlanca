import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { jwtDecode } from 'jwt-decode';
import UpdateUser from '../Form/FormUpdateUser'; // Importar el nuevo componente

const PerfilView = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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

    fetchUserData();
  }, []);

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
        <p><strong>Fecha de Registro:</strong> {new Date(userData.fecha_registro).toLocaleString()}</p>
      </section>

      {/* Renderizar el componente para actualizar los datos */}
      <UpdateUser userData={userData} setUserData={setUserData} />
    </div>
  );
};

export default PerfilView;
