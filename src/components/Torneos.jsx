import { useEffect, useState } from 'react';
import { FaClock, FaCalendarAlt, FaDollarSign, FaBookReader, FaSortAmountDown, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../css/Torneos.css';
import { supabase } from '../../supabaseClient';
import Loading from '../components/Loading/Loading';

const Torneos = () => {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTorneos = async () => {
    try {
      const { data, error } = await supabase.from('torneos').select('*');
      
      if (error) {
        console.error('Error fetching torneos:', error);
      } else {
        setTorneos(data);
      }
    } catch (error) {
      console.error('Unexpected error fetching torneos:', error);
    } finally {
      setLoading(false); // Cambia el estado a false al finalizar la carga
    }
  };

  useEffect(() => {
    fetchTorneos();
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

      <div className="torneos-page relative p-6 backdrop-blur-xl bg-gray-100 bg-opacity-80 rounded-lg shadow-lg mt-40 flex-grow">
        <h1 className="text-4xl font-bold text-[#1d3557] font-roboto text-center mb-6">Algunos Torneos Aqui!!</h1>
        <p className="font-bold text-[#000000] font-roboto text-center mb-6">Aqui podras pedir informacion por medio del formulario</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {torneos.map(torneo => (
            <div
              key={torneo.id}
              className="torneo p-4 border backdrop-blur-xl rounded-lg shadow-xl hover:shadow-[#415a77] hover:bg-gray-200 transition-shadow duration-300"
            >
              <h2 className="text-2xl text-[#1d3557] font-bold text-center mb-4">{torneo.nombre}</h2>
              <p className="flex items-center"><FaCalendarAlt className="mr-2" /> <strong>Fecha: </strong> {torneo.fecha}</p>
              <p className="flex items-center"><FaClock className="mr-2" /> <strong>Horario: </strong> {torneo.horario}</p>
              <p className="flex items-center"><FaDollarSign className="mr-2" /> <strong>Precio: </strong> COP {torneo.precio_torneo.toLocaleString('es-CO')}</p>
              <p className="flex items-center"><FaBookReader className="mr-2" /> <strong>Categoría:</strong> {torneo.categoria}</p>
              <p className="flex items-center"><FaSortAmountDown className="mr-2" /> <strong>Cupo Máximo: </strong> {torneo.cupo_maximo}</p>
              <p className="flex items-center"><FaAward className="mr-2" /> <strong>Premios: </strong> {torneo.premios || "No especificado"}</p>
              <div className="flex justify-center mt-4">
                <Link to="/formulario">
                  <button className="torneo-button btn-shine font-roboto px-4 py-2 hover:bg-[#1d3557] hover:text-white">Formulario</button>
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

export default Torneos;
