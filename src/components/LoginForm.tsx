const LoginForm = () => {
    return (
        <div className="h-2/5 w-1/4 flex flex-col items-center justify-center border rounded-xl shadow shadow-lg">
            <div className="w-4/5">
                <div className="font-bold mb-10">Login in your account</div>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <label className="font-semi-bold">Email</label>
                            <input
                                className="border rounded-lg shadow shadow-xs outline-4 outline-offset-2 outline-gray-300 py-2 px-4"
                                placeholder="abc@gexample.com"
                                type="email"
                            />
                        </div>
                        <div className="grid gap-3">
                            <label className="font-semi-bold">Password</label>
                            <input
                                className="border rounded-lg shadow shadow-xs outline-4 outline-offset-2 outline-gray-300 py-2 px-4"
                                type="password"
                            />
                        </div>
                        <div>
                            <button
                                className="bg-black text-white w-full py-2 px-4 border rounded-lg"
                                type="submit"
                            >
                                Login
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
