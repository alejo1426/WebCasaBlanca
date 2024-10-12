import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-transparent fixed w-full z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-32 w-32" src={logo} alt="Logo" loading="lazy" />
          </Link>
        </div>
        {/* Menú en pantallas grandes con mayor tamaño de texto */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-lg font-bold leading-6 text-white">Inicio</Link>
          <Link to="/Torneos" className="text-lg font-bold leading-6 text-white">Torneos</Link>
          <Link to="/Clases" className="text-lg font-bold leading-6 text-white">Clases</Link>
          <Link to="/About" className="text-lg font-bold leading-6 text-white">About</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-lg font-bold leading-6 text-white">Log in <span aria-hidden="true">&rarr;</span></Link>
        </div>
        {/* Botón del menú móvil */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil con animación */}
      {isMenuOpen && (
        <div 
          ref={menuRef} 
          className={`lg:hidden fixed inset-0 z-10 bg-transparent backdrop-blur-xl px-6 py-6 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center justify-between">
            <button onClick={toggleMenu} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6">
            {/* Enlaces del menú móvil con mayor tamaño de texto */}
            <div className="space-y-2">
              <Link to="/features" className="block rounded-lg py-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</Link>
              <Link to="/marketplace" className="block rounded-lg py-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</Link>
              <Link to="/company" className="block rounded-lg py-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</Link>
              <Link to="/login" className="block rounded-lg py-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
