import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de react-toastify
import '../css/Login.css'; // Importar estilos

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistroClick = () => {
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones simples
        if (!usuario || !password) {
            toast.error('Por favor completa todos los campos.'); // Notificación de error
            return;
        }

        try {
            const response = await fetch('https://backend-jwt-ashy.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usuario, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || 'Error al acceder, verifica los datos e inténtalo de nuevo.'); // Notificación de error
                return;
            }

            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', data.token);

            // Decodificar el token para obtener el rol del usuario
            const decodedToken = jwtDecode(data.token);

            toast.success('¡Inicio de sesión exitoso!'); // Notificación de éxito
            navigate('/Dashboard');

        } catch (error) {
            toast.error(`Error en la conexión: ${error.message}`); // Notificación de error
        }
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center">
            {/* Video de fondo */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover -z-10"
            >
                <source src="/video/Login.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Contenido del formulario */}
            <div className="flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 md:p-10 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10">
                <div className="flex flex-col justify-center items-center gap-4 pb-4">
                    <div>
                        <img src="https://eojuwteklxhwwurpioyb.supabase.co/storage/v1/object/public/Img/logo.jpeg" width="150" alt="Logo" />
                    </div>
                    <h1 className="neon-text-titulo text-3xl font-bold text-[#006aff]">CASA BLANCA</h1>
                </div>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="usuario" className="label-text block mb-2 text-sm font-medium text-[#ffffff]">Usuario</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-1 flex items-center p-1 pl-3">
                                {/* Icono de usuario */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-[#006aff]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                name="usuario" 
                                id="usuario" 
                                className="pl-12 mb-2 bg-white text-gray-600 border border-gray-300 rounded-lg focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none block w-full p-2.5" 
                                placeholder="user123" 
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)} 
                                autoComplete="off" 
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="label-text block mb-2 text-sm font-medium text-[#ffffff]">Password</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-1 flex items-center p-1 pl-3">
                                {/* Icono de candado */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-[#006aff]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </span>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••••" 
                                className="pl-12 mb-2 bg-white text-gray-600 border border-gray-300 rounded-lg focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none block w-full p-2.5" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                autoComplete="current-password" 
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full text-[#ffffff] bg-[#1c8be6] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">Ingresar</button>
                    <div className="text-sm font-light text-[#ffffff] text-center">
                        No tienes una cuenta? <span className="font-medium text-[#0059ff] hover:underline cursor-pointer" onClick={handleRegistroClick}>Registrarse</span>
                    </div>
                </form>
            </div>

            {/* Componente ToastContainer para las notificaciones */}
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

export default Login;
