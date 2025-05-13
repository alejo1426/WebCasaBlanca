import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistroClick = () => {
        navigate('/signup');
    };
    
    const [showPassword, setShowPassword] = useState(false);

    const handleBackClick = () => {
        navigate(-1); // Volver a la pantalla anterior
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario || !password) {
            toast.error('Por favor completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('https://backend-jwt-vt2o.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usuario, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || 'Error al acceder, verifica los datos e inténtalo de nuevo.');
                return;
            }

            localStorage.setItem('token', data.token);
            toast.success('¡Inicio de sesión exitoso!');
            navigate('/Dashboard');

        } catch (error) {
            toast.error(`Error en la conexión: ${error.message}`);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {/* Botón de marcha atrás */}
            <button 
                onClick={handleBackClick} 
                className="absolute top-3 left-5 z-50 text-[#ffffff] bg-[#1d3557] p-2 rounded-full shadow-md focus:outline-none hover:bg-[#0059ff] transition-colors"
            >
                {/* Icono de flecha hacia atrás */}
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
                <source src="/video/Login.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Contenido del formulario */}
            <div className="flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 md:p-10 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10">
                <div className="flex flex-col justify-center items-center gap-4 pb-4">
                    <div>
                        <img src="https://eojuwteklxhwwurpioyb.supabase.co/storage/v1/object/public/Img/logo.jpeg" width="150" alt="Logo" />
                    </div>
                    <h1 className="neon-text-titulo text-3xl font-bold text-[#1d3557]" style={{ fontFamily: 'Roboto, sans-serif' }}>CASA BLANCA</h1>
                </div>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="usuario" className="label-text block mb-2 text-sm font-medium text-[#ffffff] text-center">Usuario</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-1 flex items-center p-1 pl-3">
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
                        <label htmlFor="password" className="label-text block mb-2 text-sm font-medium text-[#ffffff] text-center">Password</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-1 flex items-center p-1 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-[#006aff]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </span>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                name="password" 
                                id="password" 
                                placeholder="••••••••••" 
                                className="pl-12 pr-10 mb-2 bg-white text-gray-600 border border-gray-300 rounded-lg focus:border-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none block w-full p-2.5" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                autoComplete="current-password" 
                            />
                            {/* Botón mostrar/ocultar */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-[#006aff] focus:outline-none"
                            >
                                {showPassword ? (
                                    // Icono de ojo tachado
                                    <svg width="21px" height="21px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 10)">
                                        <path d="m0 .5c2.53705308 3.66666667 5.37038642 5.5 8.5 5.5 3.1296136 0 5.9629469-1.83333333 8.5-5.5"/>
                                        <path d="m2.5 3.423-2 2.077"/><path d="m14.5 3.423 2 2.077"/><path d="m10.5 6 1 2.5"/>
                                        <path d="m6.5 6-1 2.5"/></g>
                                    </svg>
                                ) : (
                                    // Icono de ojo abierto
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12zm9.75 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button className="login-button w-full" type="submit">
                        <span className="button__text">Ingresar</span>
                        <span className="button__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg">
                                <path d="M3 12a1 1 0 0 1 1-1h13.59l-4.3-4.29a1 1 0 1 1 1.42-1.42l6 6a1 1 0 0 1 0 1.42l-6 6a1 1 0 0 1-1.42-1.42l4.3-4.29H4a1 1 0 0 1-1-1z" />
                            </svg>
                        </span>
                    </button>
                    <div className="label-text text-sm font-light text-[#ffffff] text-center">
                        No tienes una cuenta? <span className="font-medium text-[#0059ff] hover:underline cursor-pointer" onClick={handleRegistroClick}>Registrarse</span>
                    </div>
                </form>
                <div className='pt-5 label-text text-sm font-roboto text-[#ffffff] text-center font-bold'>
                    <h3>NOTA:</h3>
                    <h2>~* USER: Prueba</h2>
                    <h2>PASSWORD: Prueba1234 *~</h2>
                </div>
            </div>

            <ToastContainer 
                position="top-right" 
                autoClose={2000} 
                hideProgressBar={false} 
                newestOnTop={false} 
            />
        </div>
    );
};

export default Login;
