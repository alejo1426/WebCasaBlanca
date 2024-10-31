import logo from '../assets/logo.jpeg'; // Asegúrate de que esta ruta sea correcta
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="footer-logo mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="w-32" />
        </div>
        <div className="footer-links mb-4 md:mb-0">
          <ul className="flex space-x-6">
            <li>
              <a 
                href="/" 
                className="hover:text-gray-400 transform transition-transform duration-200 hover:scale-110"
              >
                Inicio
              </a>
            </li>
            <li>
              <a 
                href="/Torneos" 
                className="hover:text-gray-400 transform transition-transform duration-200 hover:scale-110"
              >
                Torneos
              </a>
            </li>
            <li>
              <a 
                href="/Clases" 
                className="hover:text-gray-400 transform transition-transform duration-200 hover:scale-110"
              >
                Clases
              </a>
            </li>
            <li>
              <a 
                href="/About" 
                className="hover:text-gray-400 transform transition-transform duration-200 hover:scale-110"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <ul className="flex space-x-4">
            <li>
              <a 
                href="#" 
                className="hover:text-gray-400 transform transition-transform duration-200 hover:scale-110"
              >
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:text-gray-400 transform transition-transform duration-200 hover:scale-110"
              >
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:text-gray-400 transform transition-transform duration-200 hover:scale-110"
              >
                <FaTwitter size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-sm">© 2024 Academia de Tenis Casa Blanca. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
