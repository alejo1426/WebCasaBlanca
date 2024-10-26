/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/logo.jpeg';

const Sidebar = ({ setSelectedView, setSelectedItem }) => {
  const [active, setActive] = useState(null); // Inicialmente null, sin submenús abiertos
  const [selectedSubItem, setSelectedSubItem] = useState('Agregar'); // Estado para el submenú seleccionado
  const subMenuRefs = useRef({});
  const [heights, setHeights] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    // Asegúrate de que active esté en null al cargar
    setActive(null);
  }, []);

  useEffect(() => {
    // Establece las alturas de los submenús según el estado activo
    const newHeights = Object.fromEntries(
      Object.keys(subMenuRefs.current).map((key) => [
        key,
        key === active ? `${subMenuRefs.current[key].scrollHeight}px` : '0px',
      ])
    );
    setHeights(newHeights);
  }, [active]);

  const handleToggle = (item) => {
    setActive((prev) => (prev === item ? null : item)); // Alterna el submenú al hacer clic
  };

  const handleCloseSidebar = (e) => {
    if (e.target.id === 'overlay') setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubItemSelect = (subItem) => {
    setSelectedSubItem(subItem);
    setSelectedView('ajustes');
    setSelectedItem(subItem.toLowerCase());
  };

  const menuItems = [
    { name: 'Dashboard', icon: 'icons/dashboard.png' },
    { name: 'Inscripciones', icon: 'icons/inscripcion.png' },
    { name: 'Perfil', icon: 'icons/persona.png' },
    { name: 'Torneos', icon: 'icons/torneo.png' },
    { name: 'Gestion', icon: 'icons/gestion.png' }, // Nueva categoría
    {
      name: 'Ajustes',
      icon: 'icons/gear.png',
      subMenu: ['Agregar', 'Modificar', 'Eliminar'],
    },
  ].filter(item => {
    // Filtrar "Ajustes" solo si el rol es admin
    if (item.name === 'Ajustes' && role !== 'admin') return false;
    // Filtrar "Resultados" solo si es visible
    if (item.name === 'Gestion' && role !== 'instructor') return false;
    return true; // Mostrar otros elementos
  });

  const handleSelect = (name) => {
    const views = {
      Dashboard: 'dashboard',
      Inscripciones: 'inscripciones',
      Torneos: 'torneos',
      Gestion: 'gestion', // Mapeo de Resultados
      Perfil: 'perfil',
      Ajustes: 'ajustes',
    };
    setSelectedView(views[name]);
    if (name === 'Ajustes') {
      setSelectedSubItem('Agregar'); // Establecer "Agregar" como el submenú seleccionado por defecto
      setSelectedItem('agregar'); // Cambiar el ítem seleccionado en ajustes a "agregar"
    }
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#b7bbc0] text-white p-3 rounded-full shadow-md"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <i className="ai-menu text-xl"></i>
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 p-4 bg-[rgba(183,187,192,0.7)] rounded-xl shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:inset-y-0 lg:fixed lg:left-0 lg:top-0 z-40 flex flex-col`}
        style={{
          backgroundImage: `url(${logo})`, // Imagen de fondo
          backgroundSize: '90%', // Ajusta el tamaño de la imagen al 50%
          backgroundPosition: 'center 75%', // Posición en la parte inferior derecha
          backgroundRepeat: 'no-repeat', // No repetir la imagen
        }}
      >
        <header className="flex items-center h-18 pb-2 border-b border-black"></header>

        <div className="flex-1 overflow-y-auto">
          <ul className="list-none p-0 m-0 w-full flex-1 mt-8 lg:mt-4">
            {menuItems.map(({ name, icon, subMenu }) => (
              <li key={name}>
                <input
                  type="radio"
                  id={name}
                  name="sidebar"
                  className="absolute scale-0"
                  onChange={() => {
                    handleToggle(name);
                    handleSelect(name);
                  }}
                  checked={active === name}
                />
                
                <label
                  htmlFor={name}
                  className={`flex items-center h-12 w-full rounded-md p-4 cursor-pointer ${active === name ? 'bg-[#457b9d] text-white' : 'hover:bg-gray-200'}`}
                >
                  <img src={`/${icon}`} alt={name} className="w-6 h-6" />
                  <p className="flex-1 font-semibold text-black">{name}</p>
                  {subMenu && (
                    <i
                      className={`ai-chevron-down-small transition-transform duration-300 ${active === name ? 'rotate-180' : ''}`}
                    ></i>
                  )}
                </label>

                {subMenu && (
                  <div
                    ref={(el) => (subMenuRefs.current[name] = el)}
                    style={{ height: heights[name], zIndex: '2' }} // Asegúrate de que el submenú esté por encima
                    className="sub-menu bg-[rgba(183,187,192,0.7)] shadow-md rounded-md overflow-hidden transition-height duration-300 ease-in-out"
                  >
                    <ul className="list-none p-0 m-0">
                      {subMenu.map((subItem) => (
                        <li key={subItem}>
                          <button
                            className={`w-full text-left pl-12 py-2 font-semibold text-black hover:bg-[#457b9d] ${
                              selectedSubItem === subItem ? 'bg-[#68b9eb] text-white' : ''
                            }`}
                            onClick={() => handleSubItemSelect(subItem)}
                          >
                            {subItem}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="w-full py-3 text-center bg-[#f1faee] font-semibold text-black rounded-md hover:bg-red-600 mt-auto"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </aside>

      {isSidebarOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleCloseSidebar}
          style={{ pointerEvents: 'all' }} // Asegúrate de que el overlay no intercepte clics en la sidebar
        ></div>
      )}
    </>
  );
};

export default Sidebar;
