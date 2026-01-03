import { useState } from 'react';
import { Save, User, Lock, Store } from 'lucide-react';
import { authService } from '../services/api';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin_user') || '{}'));

    // Password states
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const updates = {
                name: formData.get('name')
            };

            const response = await authService.updateProfile(updates);
            if (response.success) {
                localStorage.setItem('admin_user', JSON.stringify(response.data));
                setUser(response.data);
                alert('Profile updated successfully');
            }
        } catch (error) {
            console.error("Profile update failed", error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match");
            return;
        }

        if (passwords.new.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            // Note: Backend currently doesn't verify current password on update, 
            // but in a real app check it. For now we just update.
            const response = await authService.updateProfile({
                password: passwords.new
            });

            if (response.success) {
                setPasswords({ current: '', new: '', confirm: '' });
                alert('Password updated successfully');
            }
        } catch (error) {
            console.error("Password update failed", error);
            alert('Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your account and store preferences</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'profile' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:bg-white/50'}`}
                    >
                        <User size={18} /> Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'security' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:bg-white/50'}`}
                    >
                        <Lock size={18} /> Security
                    </button>
                    <button
                        onClick={() => setActiveTab('store')}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'store' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:bg-white/50'}`}
                    >
                        <Store size={18} /> Store
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                    {activeTab === 'profile' && (
                        <div className="max-w-xl">
                            <h2 className="text-lg font-semibold text-slate-800 mb-6">Profile Settings</h2>
                            <form onSubmit={handleProfileSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        defaultValue={user.name || "Admin User"}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue={user.email || "admin@lumiere.com"}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                                <div className="pt-4">
                                    <button type="submit" disabled={loading} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50">
                                        {loading ? <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" /> : <Save size={18} />}
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="max-w-xl">
                            <h2 className="text-lg font-semibold text-slate-800 mb-6">Security</h2>
                            <form onSubmit={handlePasswordSave} className="space-y-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={passwords.current}
                                        onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={passwords.new}
                                        onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                        placeholder="Min 6 characters"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={passwords.confirm}
                                        onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                                        placeholder="Repeat new password"
                                    />
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <input
                                        type="checkbox"
                                        id="showPass"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                        className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                                    />
                                    <label htmlFor="showPass" className="text-sm text-slate-600 select-none cursor-pointer">Show Passwords</label>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" disabled={loading} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50">
                                        {loading ? <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" /> : <Save size={18} />}
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'store' && (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <Store size={48} className="mb-4 opacity-20" />
                            <p>Store settings configuration coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
