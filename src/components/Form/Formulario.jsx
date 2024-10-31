import { useState } from 'react';
import '../../css/Formulario.css'; // Asegúrate de que esta ruta sea correcta

const Formulario = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const { firstName, lastName, email, phoneNumber, message } = formData;
    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    console.log('Formulario enviado', formData);
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    });

    alert('Información enviada con éxito.');
  };

  return (
    <div className="relative isolate bg-slate-400 px-6 py-24 sm:py-32 lg:px-8">
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
                className="block w-full rounded-md border-0 px-3.5 py-2 bg-pastelPink text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 px-3.5 py-2 bg-pastelPink text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 px-3.5 py-2 bg-pastelPink text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 px-3.5 py-2 bg-pastelPink text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: '#ffebee' }} // Color pastel
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white neon-text-label">Bríndanos información de por qué quieres conocernos y qué te interesa saber</label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 bg-pastelPink text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ backgroundColor: '#ffebee' }} // Color pastel
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-32 ">
          <a href="#" className="button">
            Enviar Información
          </a>
        </div> 
      </form>
    </div>
  );
};

export default Formulario;
