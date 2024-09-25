import { useState, useRef, useEffect } from 'react';

const Sidebar = () => {
  const [active, setActive] = useState(null);
  const subMenuRefs = useRef({}); // Para manejar múltiples submenús
  const [heights, setHeights] = useState({}); // Almacenar alturas

  useEffect(() => {
    // Establece la altura de cada submenú según si está activo o no
    const newHeights = {};
    Object.keys(subMenuRefs.current).forEach((key) => {
      newHeights[key] = key === active ? `${subMenuRefs.current[key].scrollHeight}px` : '0px';
    });
    setHeights(newHeights);
  }, [active]);

  const handleToggle = (item) => {
    setActive(active === item ? null : item); // Alternar el submenú
  };

  return (
    <aside className="fixed top-6 left-6 bottom-11 w-64 p-4 bg-white bg-opacity-80 rounded-xl flex flex-col gap-2 shadow-lg">
      <header className="flex items-center h-18 pb-2 border-b border-gray-300"></header>
      <ul className="list-none p-0 m-0 w-full">
        {['dashboard', 'settings', 'create', 'profile', 'notifications', 'products', 'account'].map((item) => (
          <li key={item}>
            <input
              type="radio"
              id={item}
              name="sidebar"
              className="absolute scale-0"
              onChange={() => handleToggle(item)}
              checked={active === item}
            />
            <label
              htmlFor={item}
              className={`flex items-center h-12 w-full rounded-md p-4 cursor-pointer ${
                active === item ? 'bg-blue-400 text-white' : 'hover:bg-gray-200'
              }`}
            >
              <i className={`ai-${item === 'dashboard' ? 'dashboard' : item === 'settings' ? 'gear' : item === 'create' ? 'folder-add' : item === 'profile' ? 'person' : item === 'notifications' ? 'bell' : item === 'products' ? 'cart' : 'lock-on'}`}></i>
              <p className="flex-1 text-gray-800">{item.charAt(0).toUpperCase() + item.slice(1)}</p>
              {['settings', 'create', 'profile'].includes(item) && (
                <i className={`ai-chevron-down-small transform transition-transform duration-300 ${active === item ? 'rotate-180' : ''}`}></i>
              )}
            </label>
            {['settings', 'create', 'profile'].includes(item) && (
              <div
                ref={(el) => (subMenuRefs.current[item] = el)} // Guardar referencia de cada submenú
                style={{ height: heights[item] }}
                className={`sub-menu bg-white shadow-md rounded-md overflow-hidden transition-height duration-300 ease-in-out`}
              >
                <ul className="list-none p-0 m-0">
                  {item === 'settings' && (
                    <>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Display</button>
                      </li>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Appearance</button>
                      </li>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Preferences</button>
                      </li>
                    </>
                  )}
                  {item === 'create' && (
                    <>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Article</button>
                      </li>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Document</button>
                      </li>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Video</button>
                      </li>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Presentation</button>
                      </li>
                    </>
                  )}
                  {item === 'profile' && (
                    <>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Avatar</button>
                      </li>
                      <li>
                        <button className="w-full text-left pl-12 py-2 text-gray-800 hover:bg-gray-200">Theme</button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;