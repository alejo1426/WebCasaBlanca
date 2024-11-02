import { useEffect, useState } from 'react';
import Header from './Header';
import TitleWithVideo from './TituloVideo';
import HeroSection from './HeroSection';
import Footer from './Footer';
import Loading from './Loading/Loading';

const Home = () => {
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        const fetchData = async () => {
            // Simula la carga de datos (por ejemplo, desde una API)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(); // Resuelve la promesa después de 2 segundos
                }, 2000);
            });
        };

        const loadPage = async () => {
            await fetchData(); // Espera a que se completen los datos
            setLoading(false); // Cambia el estado a false cuando la carga termina
        };

        loadPage(); // Llama a la función para cargar la página

    }, []); // El array vacío asegura que esto se ejecute solo una vez

    return (
        <>
            {loading ? ( // Muestra el loading si loading es true
                <Loading />
            ) : ( // Muestra el contenido principal si loading es false
                <>
                    <Header />
                    <TitleWithVideo />
                    <HeroSection />
                    <Footer />
                </>
            )}
        </>
    );
};

export default Home;
