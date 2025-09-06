import { useState } from 'react';
import { login } from '../api/auth';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(
            'Sending request to:',
            'https://lexiconapi.onrender.com/Api/Client/Login'
        );
        console.log('Request body:', { username, password });
        console.log('Request headers:', {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });

        if (!username || !password) {
            setError('please fill in all fields');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await login(username, password);

            sessionStorage.setItem('jwt_token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));

            // TODO: Redirect to dashboard or captions page
            console.log('Login successful:', response);
        } catch (err) {
            setError('Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-[420px] flex flex-col items-center justify-center border rounded-xl shadow shadow-lg p-6">
            <div className="w-full">
                <div className="font-bold mb-10 text-center">
                    Login in your account
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
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
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <a href="#" className="underline underline-offset-4">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
