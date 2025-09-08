import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const getUser = () => {
        try {
            const userData = sessionStorage.getItem('user');
            if (!userData || userData === 'undefined' || userData === 'null') {
                return {};
            }
            return JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing user data:', error);
            sessionStorage.removeItem('user');
            return {};
        }
    };

    const user = getUser();

    const handleLogout = () => {
        sessionStorage.removeItem('jwt_token');
        sessionStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <nav className="flex gap-4">
                    <Link to="/captions" className="hover:text-gray-300">
                        Captions
                    </Link>
                    <Link to="/countries" className="hover:text-gray-300">
                        Countries
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <span>Welcome, {user.name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
