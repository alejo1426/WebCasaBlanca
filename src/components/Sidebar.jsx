/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';

const Sidebar = ({ setSelectedView, setSelectedItem }) => {
  const [active, setActive] = useState(null);
  const subMenuRefs = useRef({});
  const [heights, setHeights] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const menuItems = [
    { name: 'Dashboard', icon: 'Dashboard' },
    { name: 'Clases', icon: 'lock-on' },
    { name: 'Perfil', icon: 'person', subMenu: ['Información personal', 'Seguridad'] },
    { name: 'Torneos', icon: 'lock-on' },
    {
      name: 'Ajustes',
      icon: 'gear',
      subMenu: ['Agregar', 'Modificar', 'Eliminar'],
    },
  ];

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
                    setSelectedView('dashboard'); // Cambiar a la vista de dashboard
                    setSelectedItem(null); // Reiniciar el elemento seleccionado
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
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">
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

        <button className="w-full py-3 text-center bg-red-500 text-white rounded-md hover:bg-red-600 mt-auto">
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

