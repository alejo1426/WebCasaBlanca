import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Torneos from './components/Torneos';
import Formulario from './components/Form/Formulario';
import Clases from './components/Clases/Clases';
import ClasesFormulario from './components/Clases/ClasesInfo';
import Home from './components/Home'; // Importar el nuevo componente Home
import './App.css';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/torneos" element={<Torneos />} />
                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/clases" element={<Clases />} />
                    <Route path="/ClasesFormulario" element={<ClasesFormulario />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/Sidebar" element={<Sidebar />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
