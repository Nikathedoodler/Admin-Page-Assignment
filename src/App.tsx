import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { Captions } from './components/Captions';

function App() {
    return (
        <div className="min-h-screen">
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/captions" element={<Captions />} />
            </Routes>
        </div>
    );
}

export default App;
