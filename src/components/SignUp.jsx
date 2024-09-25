import { useNavigate } from 'react-router-dom'; 

const SignUp = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/Login');
    };

    return (
        <div className="flex flex-col w-full max-w-lg mx-auto p-30 md:p-20 2xl:p-30 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className="flex flex-col justify-center items-center gap-4 pb-4">
                <div>
                    <img src="/src/assets/logo.jpeg" width="200" alt="Logo" />
                </div>
                <h1 className="text-4xl font-bold text-[#006aff]">CASA BLANCA</h1>
            </div>
            <div className="text-sm font-light text-[#6B7280] pb-8 text-center">Regístrate con nosotros y disfruta!!</div>
            <form className="flex flex-col">
                {['Nombres', 'Apellidos', 'Cédula', 'Correo', 'Usuario', 'Contraseña', 'Teléfono', 'Dirección', 'Edad'].map((field, index) => (
                    <div className="pb-2" key={index}>
                        <label htmlFor={field.toLowerCase()} className="block mb-2 text-sm font-medium text-[#111827]">{field}</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                {/* Icono genérico, puedes cambiarlo según el campo */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>
                            </span>
                            <input
                                type={field === 'Contraseña' ? 'password' : field === 'Correo' ? 'email' : 'text'}
                                name={field.toLowerCase()}
                                id={field.toLowerCase()}
                                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5"
                                placeholder={field === 'Contraseña' ? '••••••••••' : `Ingrese su ${field}`}
                                autoComplete={field === 'Contraseña' ? 'new-password' : 'off'}
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Registrarse</button>
                <div className="text-sm font-light text-[#6B7280]">
                    ¿Ya estás vinculado con nosotros? <span className="font-medium text-[#4F46E5] hover:underline cursor-pointer" onClick={handleSignUpClick}>Iniciar Sesión</span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;