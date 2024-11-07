/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/logo.jpeg';
import { GiHamburgerMenu } from 'react-icons/gi'; // Icono de tres rayas
import { IoClose } from 'react-icons/io5';  // Icono de X

const Sidebar = ({ setSelectedView, setSelectedItem }) => {
  const [active, setActive] = useState(null); 
  const [selectedSubItem, setSelectedSubItem] = useState('Agregar');
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
    setActive(null);
  }, []);

  useEffect(() => {
    const newHeights = Object.fromEntries(
      Object.keys(subMenuRefs.current).map((key) => [
        key,
        key === active ? `${subMenuRefs.current[key].scrollHeight}px` : '0px',
      ])
    );
    setHeights(newHeights);
  }, [active]);

  const handleToggle = (item) => {
    setActive((prev) => (prev === item ? null : item)); 
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
    { name: 'Gestion', icon: 'icons/gestion.png' }, 
    {
      name: 'Ajustes',
      icon: 'icons/gear.png',
      subMenu: ['Agregar', 'Modificar', 'Eliminar'],
    },
  ].filter(item => {
    if (item.name === 'Ajustes' && role !== 'admin') return false;
    if (item.name === 'Gestion' && role !== 'instructor') return false;
    return true; 
  });

  const handleSelect = (name) => {
    const views = {
      Dashboard: 'dashboard',
      Inscripciones: 'inscripciones',
      Torneos: 'torneos',
      Gestion: 'gestion',
      Perfil: 'perfil',
      Ajustes: 'ajustes',
    };
    setSelectedView(views[name]);
    if (name === 'Ajustes') {
      setSelectedSubItem('Agregar');
      setSelectedItem('agregar');
    }
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0b448a] text-white p-3 rounded-full shadow-md"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {/* Cambia el ícono entre tres rayas y X */}
        {isSidebarOpen ? (
          <IoClose className="text-xl" />
        ) : (
          <GiHamburgerMenu className="text-xl" />
        )}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 p-4 bg-[rgba(183,187,192,0.7)] rounded-xl shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:inset-y-0 lg:fixed lg:left-0 lg:top-0 z-40 flex flex-col`}
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: '90%',
          backgroundPosition: 'center 75%',
          backgroundRepeat: 'no-repeat',
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
                    style={{ height: heights[name], zIndex: '2' }}
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
        ></div>
      )}
    </>
  );
};

export default Sidebar;
