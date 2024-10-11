/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener esto instalado

const Sidebar = ({ setSelectedView, setSelectedItem }) => {
  const [active, setActive] = useState(null);
  const subMenuRefs = useRef({});
  const [heights, setHeights] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // Estado para almacenar el rol del usuario

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role); // Asignar el rol del token al estado
      } catch (error) {
        console.error("Error decoding token:", error);
        setRole(null); // Si hay un error, establecer el rol como null
      }
    }
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

  // Modificamos los elementos del menú para incluir una verificación del rol
  const menuItems = [
    { name: 'Dashboard', icon: 'Dashboard' },
    { name: 'Clases', icon: 'lock-on' },
    { name: 'Perfil', icon: 'person' },
    { name: 'Torneos', icon: 'lock-on' },
    {
      name: 'Ajustes',
      icon: 'gear',
      subMenu: ['Agregar', 'Modificar', 'Eliminar'],
    },
  ].filter(item => {
    // Filtrar según el rol del usuario
    if (item.name === 'Ajustes' && role !== 'admin') {
      return false; // Ocultar 'Ajustes' si el rol no es admin
    }
    return true; // Mostrar los demás elementos
  });

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-md"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <i className="ai-menu text-xl"></i>
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 p-4 bg-white bg-opacity-80 rounded-xl shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:inset-y-0 lg:fixed lg:left-0 lg:top-0 z-40 flex flex-col`}
      >
        <header className="flex items-center h-18 pb-2 border-b border-gray-300"></header>

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

                    if (name === 'Dashboard') {
                      setSelectedView('dashboard');
                    } else if (name === 'Clases') {
                      setSelectedView('clases');
                    } else if (name === 'Torneos') {
                      setSelectedView('torneos');
                    } else if (name === 'Perfil') {
                      setSelectedView('perfil');
                    } else if (name === 'Ajustes') {
                      setSelectedView('ajustes');
                      setSelectedItem('agregar');
                    }
                  }}
                  checked={active === name}
                />
                
                <label
                  htmlFor={name}
                  className={`flex items-center h-12 w-full rounded-md p-4 cursor-pointer ${
                    active === name ? 'bg-blue-400 text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  <i className={`ai-${icon}`}></i>
                  <p className="flex-1 text-gray-800">{name}</p>
                  {subMenu && (
                    <i
                      className={`ai-chevron-down-small transform transition-transform duration-300 ${
                        active === name ? 'rotate-180' : ''
                      }`}
                    ></i>
                  )}
                </label>

                {subMenu && (
                  <div
                    ref={(el) => (subMenuRefs.current[name] = el)}
                    style={{ height: heights[name] }}
                    className="sub-menu bg-white shadow-md rounded-md overflow-hidden transition-height duration-300 ease-in-out"
                  >
                    <ul className="list-none p-0 m-0">
                      {subMenu.map((subItem) => (
                        <li key={subItem}>
                          <button
                            className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200"
                            onClick={() => {
                              setSelectedView('ajustes');
                              setSelectedItem(subItem.toLowerCase());
                            }}
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

        <div className="flex justify-center mt-4 mb-4">
          <img src="../assets/logo.jpeg" alt="Logo" className="w-auto h-auto" />
        </div>

        <button className="w-full py-3 text-center bg-red-500 text-white rounded-md hover:bg-red-600 mt-auto" onClick={handleLogout}>
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
