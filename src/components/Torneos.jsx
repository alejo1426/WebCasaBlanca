import { useEffect, useState } from 'react';
import { FaClock, FaCalendarAlt, FaDollarSign, FaBookReader, FaSortAmountDown, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../css/Torneos.css';
import { supabase } from '../../supabaseClient';

const Torneos = () => {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTorneos = async () => {
    const { data, error } = await supabase.from('torneos').select('*');

    if (error) {
      console.error('Error fetching torneos:', error);
      return;
    }

    setTorneos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTorneos();
  }, []);

  if (loading) {
    return <div>Cargando torneos...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
      >
        <source src="/video/Torneos.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>

      <Header />

      <div className="torneos-page relative p-6 bg-gray-200 bg-opacity-80 rounded-lg shadow-lg mt-40 flex-grow">
        <h1 className="text-4xl font-bold text-[#1d3557] font-roboto text-center mb-6">Próximos Torneos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {torneos.map(torneo => (
            <div
              key={torneo.id}
              className="torneo p-4 border backdrop-blur-xl rounded-lg shadow-xl hover:shadow-[0_6px_12px_rgba(25,130,196,0.7)] hover:bg-gray-200 transition-shadow duration-300"
            >
              <h2 className="text-2xl text-[#1d3557] font-bold text-center mb-4">{torneo.nombre}</h2>
              <p className="flex items-center"><FaCalendarAlt className="mr-2" /> <strong>Fecha: </strong> {torneo.fecha}</p>
              <p className="flex items-center"><FaClock className="mr-2" /> <strong>Horario: </strong> {torneo.horario}</p>
              <p className="flex items-center"><FaDollarSign className="mr-2" /> <strong>Precio: </strong> COP {torneo.precio_torneo}</p>
              <p className="flex items-center"><FaBookReader className="mr-2" /> <strong>Categoría:</strong> {torneo.categoria}</p>
              <p className="flex items-center"><FaSortAmountDown className="mr-2" /> <strong>Cupo Máximo: </strong> {torneo.cupo_maximo}</p>
              <p className="flex items-center"><FaAward className="mr-2" /> <strong>Premios: </strong> {torneo.premios || "No especificado"}</p>
              <div className="flex justify-center mt-4">
                <Link to="/formulario">
                  <button className="form-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Formulario</button>
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
