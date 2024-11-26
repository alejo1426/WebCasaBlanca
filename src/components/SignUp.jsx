import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Signup.css';

const Registro = () => {
    const navigate = useNavigate();
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [edad, setEdad] = useState('');

    const handleBackClick = () => {
        navigate(-1); // Volver a la pantalla anterior
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombres || !apellidos || !correo || !usuario || !password || !telefono || !direccion || !edad) {
            toast.error('Por favor, llena todos los campos para poder registrarte.');
            return;
        }

        if (parseInt(edad) < 15 || parseInt(edad) > 80) {
            toast.error('Debes tener al menos 15 y no mayor a 80 años para registrarte.');
            return;
        }

        // Validación de contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9\W]).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('La contraseña debe contener al menos 1 mayúscula, 1 minúscula, y 1 número o símbolo.');
            return;
        }

        const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombres,
                apellidos,
                correo,
                usuario,
                password,
                telefono,
                direccion,
                edad: parseInt(edad),
                rol: 'usuario',
                nivel_aprendizaje: 'principiante',
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            toast.error(data.message || 'Hubo un error en el registro. Intenta nuevamente.');
        } else {
            toast.success('¡Registro exitoso!');
            navigate('/Login');
        }
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {/* Botón de marcha atrás */}
            <button 
                onClick={handleBackClick} 
                className="absolute top-3 left-5 z-50 text-[#ffffff] bg-[#1d3557] p-2 rounded-full shadow-md focus:outline-none hover:bg-[#0059ff] transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Video de fondo */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover -z-10"
            >
                <source src="/video/Signup.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Contenedor del formulario */}
            <div className="flex flex-col w-full max-w-lg mx-auto p-6 md:p-10 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10">
                <div className="flex flex-col justify-center items-center gap-4 pb-4">
                    <div>
                        <img src="https://eojuwteklxhwwurpioyb.supabase.co/storage/v1/object/public/Img/logo.jpeg" width="150" alt="Logo" />
                    </div>
                    <h1 className="neon-text-titulo text-4xl font-bold text-[#1d3557] text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>CASA BLANCA</h1>
                </div>
                <div className="neon-text-subtitulo text-sm font-bold text-[#ffffff] pb-8 text-center">Regístrate con nosotros y disfruta!!</div>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {[
                        { label: 'Nombres', id: 'nombres', value: nombres, onChange: setNombres, type: 'text', placeholder: 'Ingrese sus nombres' },
                        { label: 'Apellidos', id: 'apellidos', value: apellidos, onChange: setApellidos, type: 'text', placeholder: 'Ingrese sus apellidos' },
                        { label: 'Correo', id: 'correo', value: correo, onChange: setCorreo, type: 'email', placeholder: 'Ingrese su correo' },
                        { label: 'Usuario', id: 'usuario', value: usuario, onChange: setUsuario, type: 'text', placeholder: 'Ingrese su usuario' },
                        { label: 'Password', id: 'password', value: password, onChange: setPassword, type: 'password', placeholder: '••••••••••' },
                        { label: 'Teléfono', id: 'telefono', value: telefono, onChange: setTelefono, type: 'text', placeholder: 'Ingrese su teléfono' },
                        { label: 'Dirección', id: 'direccion', value: direccion, onChange: setDireccion, type: 'text', placeholder: 'Ingrese su dirección' },
                        { label: 'Edad', id: 'edad', value: edad, onChange: setEdad, type: 'number', placeholder: 'Ingrese su edad' },
                    ].map(({ label, id, value, onChange, type, placeholder }) => (
                        <div key={id} className="pb-2 text-center">
                            <label htmlFor={id} className="label-text block mb-2 text-sm font-medium text-[#ffffff] text-center">{label}</label>
                            <input
                                type={type}
                                name={id}
                                id={id}
                                className="pl-12 mb-2 bg-white text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                                placeholder={placeholder}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                        </div>
                    ))}
                    <button className="register-button w-full" type="submit">
                        <span className="button__text">Registrarme</span>
                        <span className="button__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg">
                                <path d="M12 5a1 1 0 0 1 .71.29l6 6a1 1 0 1 1-1.42 1.42L13 8.41V20a1 1 0 1 1-2 0V8.41l-4.29 4.3a1 1 0 0 1-1.42-1.42l6-6A1 1 0 0 1 12 5z" />
                            </svg>
                        </span>
                    </button>
                    <div className="label-text text-sm font-light text-[#ffffff] text-center">
                        ¿Ya estás vinculado con nosotros? <span className="font-medium text-[#0059ff] hover:underline cursor-pointer" onClick={() => navigate('/Login')}>Iniciar Sesión</span>
                    </div>
                </form>
            </div>

            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar 
                newestOnTop 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
        </div>
    );
};

export default Registro;
