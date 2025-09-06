import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password || !name || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await register(
                username,
                password,
                confirmPassword
            );

            sessionStorage.setItem(
                'user',
                JSON.stringify({
                    username,
                    name,
                    // Add other user data from response if available
                })
            );

            console.log('Registration successful:', response);
            setSuccess('Registration successful! You can now login.');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-[420px] flex flex-col items-center justify-center border rounded-xl shadow shadow-lg p-6">
            <div className="w-full">
                <div className="font-bold mb-10 text-center">
                    Create Your Account
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <label className="font-semi-bold">Name</label>
                            <input
                                className="border rounded-lg shadow shadow-xs outline-4 outline-offset-2 outline-gray-300 py-2 px-4 w-full"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <label className="font-semi-bold">Email</label>
                            <input
                                className="border rounded-lg shadow shadow-xs outline-4 outline-offset-2 outline-gray-300 py-2 px-4 w-full"
                                placeholder="abc@gexample.com"
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <label className="font-semi-bold">Password</label>
                            <input
                                className="border rounded-lg shadow shadow-xs outline-4 outline-offset-2 outline-gray-300 py-2 px-4 w-full"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <label className="font-semi-bold">
                                Confrim Password
                            </label>
                            <input
                                className="border rounded-lg shadow shadow-xs outline-4 outline-offset-2 outline-gray-300 py-2 px-4 w-full"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            {error && (
                                <div className="text-red-500 text-sm text-center mb-4">
                                    {error}
                                </div>
                            )}
                            <button
                                className="bg-black text-white w-full py-2 px-4 border rounded-lg"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Registering ...' : 'Register'}
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </div>
                    {success && (
                        <div className="text-green-500 text-sm text-center mb-4">
                            {success}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
