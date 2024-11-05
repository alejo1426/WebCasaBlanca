import { useEffect, useState } from 'react';
import { FaClock, FaCalendarAlt, FaDollarSign, FaBookReader } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../css/Clases.css';
import { supabase } from '../../supabaseClient';
import Loading from '../components/Loading/Loading';

const Clases = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClases = async () => {
    try {
      const { data, error } = await supabase.from('clases').select('*');
      
      if (error) {
        console.error('Error fetching clases:', error);
      } else {
        setClases(data);
      }
    } catch (error) {
      console.error('Unexpected error fetching clases:', error);
    } finally {
      setLoading(false); // Cambia el estado a false al finalizar la carga
    }
  };

  useEffect(() => {
    fetchClases();
  }, []);

  if (loading) {
    return <div><Loading /></div>; // Muestra el componente Loading mientras se carga
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
      >
        <source src="/video/InfoCards.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      <Header />

      <div className="clases-page relative p-6 backdrop-blur-xl bg-gray-100 bg-opacity-80 rounded-lg shadow-lg mt-40 flex-grow">
        <h1 className="text-4xl font-bold text-[#1d3557] font-roboto text-center mb-6">Tipos De Clases Disponibles</h1>
        <p className="font-bold text-[#000000] font-roboto text-center mb-6">Aqui podras pedir informacion por medio del formulario</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clases.map(clase => (
            <div
              key={clase.id}
              className="clase p-4 border backdrop-blur-xl rounded-lg shadow-lg hover:shadow-[#415a77] hover:bg-gray-200 transition-shadow duration-300"
            >
              <h2 className="text-2xl text-[#1d3557] font-bold text-center mb-4">{clase.nombre || "Nombre no disponible"}</h2>
              <p className="flex items-center"><FaCalendarAlt className="mr-2" /> <strong>Fecha Inicio: </strong> {clase.fecha_inicio || "Fecha no disponible"}</p>
              <p className="flex items-center"><FaCalendarAlt className="mr-2" /> <strong>Fecha Fin: </strong> {clase.fecha_fin || "Fecha no disponible"}</p>
              <p className="flex items-center"><FaClock className="mr-2" /> <strong>Horario: </strong> {clase.horario || "Horario no disponible"}</p>
              <p className="flex items-center"><FaDollarSign className="mr-2" /> <strong>Precio: </strong> COP {clase.precio_clase ? clase.precio_clase.toLocaleString('es-CO') : 'No disponible'}</p>
              <p className="flex items-center"><FaBookReader className="mr-2" /><strong>Categoría:</strong> {clase.nivel || "Categoría no disponible"}</p>
              <div className="flex justify-center mt-4">
                <Link to="/formulario">
                  <button className="clase-button hover:shadow-xl px-4 py-2">Formulario</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Clases;
