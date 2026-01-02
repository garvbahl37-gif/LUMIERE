import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = () => (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
        <div className="mb-8 p-2">
            <h1 className="text-2xl font-bold tracking-wider text-rose-400">LUMIERE</h1>
            <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">Admin Portal</p>
        </div>

        <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem to="/products" icon={<Package size={20} />} label="Products" />
            <NavItem to="/orders" icon={<ShoppingCart size={20} />} label="Orders" />
            <NavItem to="/customers" icon={<Users size={20} />} label="Customers" />
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="pt-4 border-t border-slate-700">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
            </button>
        </div>
    </div>
);

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Link to={to} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">
        {icon}
        <span className="font-medium">{label}</span>
    </Link>
);

const Layout = () => {
    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
