import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { authService } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Real login call
            const response = await authService.login({ email, password });

            if (response.success && response.data.role === 'admin') {
                localStorage.setItem('admin_token', response.data.token);
                localStorage.setItem('admin_user', JSON.stringify(response.data));
                navigate('/');
            } else {
                setError('Access denied. Admin privileges required.');
                setLoading(false);
            }
        } catch (err: any) {
            console.error('Login Failed:', err);
            setError(err.response?.data?.message || 'Invalid credentials');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="bg-slate-950/80 p-8 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-md relative z-10 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <div className="mb-6 flex justify-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 bg-clip-text text-transparent tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                            Lumiere
                        </h1>
                    </div>
                    <h2 className="text-xl font-medium text-slate-300 tracking-wide">Admin Workspace</h2>
                    <p className="text-slate-500 text-sm mt-2">Authentic Luxury Management</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-amber-500/80 ml-1 uppercase tracking-wider">Email Access</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all placeholder:text-slate-700"
                                placeholder="admin@lumiere.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-amber-500/80 ml-1 uppercase tracking-wider">Secure Passkey</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all placeholder:text-slate-700"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-700 to-rose-900 hover:from-amber-600 hover:to-rose-800 text-amber-50 font-semibold py-3.5 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-black/40 flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Enter Portal <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
                    <p className="text-slate-600 text-xs">Restricted System • Authorized Global Personnel Only</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
