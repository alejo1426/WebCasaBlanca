import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import { supabase } from '../../../supabaseClient';
import '../../css/Formulario.css'; // Asegúrate de que esta ruta sea correcta
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  // Función para volver a la pantalla anterior
  const handleBackClick = () => {
    navigate(-1); // Regresar a la pantalla anterior
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phoneNumber, message } = formData;

    if (!firstName) {
      toast.error('El nombre es obligatorio.');
      return false;
    }
    if (firstName.length < 2) {
      toast.error('El nombre debe tener al menos 2 caracteres.');
      return false;
    }

    if (!lastName) {
      toast.error('El apellido es obligatorio.');
      return false;
    }
    if (lastName.length < 2) {
      toast.error('El apellido debe tener al menos 2 caracteres.');
      return false;
    }

    if (!email) {
      toast.error('El correo es obligatorio.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('El formato del correo no es válido.');
      return false;
    }

    if (!phoneNumber) {
      toast.error('El número telefónico es obligatorio.');
      return false;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      toast.error('El número telefónico solo debe contener dígitos.');
      return false;
    }

    if (!message) {
      toast.error('El mensaje es obligatorio.');
      return false;
    }
    if (message.length < 10) {
      toast.error('El mensaje debe tener al menos 10 caracteres.');
      return false;
    }

    return true; // Devuelve true si no hay errores
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Si hay errores, no continuar
    }

    const { firstName, lastName, email, phoneNumber, message } = formData;

    // Insertar datos en Supabase
    const { data, error } = await supabase
      .from('contactos')
      .insert([{
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        message
      }]);

    if (error) {
      console.error('Error al insertar datos:', error);
      toast.error('Hubo un problema al enviar la información. Inténtalo de nuevo.');
    } else {
      console.log('Formulario enviado', data);
      toast.success('Información enviada con éxito.');

      // Limpiar el formulario
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    }
  };

  return (
    <div className="relative isolate bg-slate-400 px-6 py-24 sm:py-32 lg:px-8">
      {/* Botón de regreso */}
      <button 
        onClick={handleBackClick} 
        className="absolute top-3 left-5 z-50 text-[#ffffff] bg-[#1d3557] p-2 rounded-full shadow-md focus:outline-none hover:bg-[#0059ff] transition-colors"
      >
        {/* Icono de flecha hacia atrás */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="https://eojuwteklxhwwurpioyb.supabase.co/storage/v1/object/public/Videos/Form.mp4?t=2024-10-12T00%3A28%3A59.759Z" type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>

      <div className="mx-auto max-w-2xl text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl neon-text-top">INFORMACION DE CONTACTO</h2>
        <p className="font-semibold mt-2 text-lg leading-8 text-gray-200 sm:text-lg neon-text-top">Si quieres conocer más sobre el campo y sus servicios, bríndanos tu información.</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20 relative z-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white neon-text-label">Nombres</label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 px-3.5 py-2 ${formData.firstName && formData.firstName.length < 2 ? 'bg-red-200' : 'bg-pastelPink'} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                style={{ backgroundColor: '#ffebee' }} // Color pastel
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white neon-text-label">Apellidos</label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 px-3.5 py-2 ${formData.lastName && formData.lastName.length < 2 ? 'bg-red-200' : 'bg-pastelPink'} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                style={{ backgroundColor: '#ffebee' }} // Color pastel
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white neon-text-label">Correo de Contacto</label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 px-3.5 py-2 ${formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'bg-red-200' : 'bg-pastelPink'} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                style={{ backgroundColor: '#ffebee' }} // Color pastel
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-white neon-text-label">Número Telefónico</label>
            <div className="mt-2.5">
              <input
                type="tel"
                name="phoneNumber"
                id="phone-number"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 px-3.5 py-2 ${formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber) ? 'bg-red-200' : 'bg-pastelPink'} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                style={{ backgroundColor: '#ffebee' }} // Color pastel
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white neon-text-label">Mensaje</label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 px-3.5 py-2 ${formData.message && formData.message.length < 10 ? 'bg-red-200' : 'bg-pastelPink'} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                style={{ backgroundColor: '#ffebee' }} // Color pastel
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="form-button rounded-lg">
            <div className="text">
              <span>Enviar</span>
              <span>Informacion</span>
              <span>!!</span>
            </div>
            <div className="clone">
              <span>Enviar</span>
              <span>Informacion</span>
              <span>!!</span>
            </div>
            <svg
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Formulario;
