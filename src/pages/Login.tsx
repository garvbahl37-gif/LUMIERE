import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            toast.success("Welcome back!");
            navigate("/");
        } else {
            toast.error(result.message || "Login failed");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470"
                    alt="Luxury shopping"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center p-12">
                    <h1 className="font-display text-5xl text-foreground mb-4">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md">
                        Sign in to access your account, view orders, and continue your shopping journey.
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
                <div className="max-w-md mx-auto w-full">
                    <Link
                        to="/"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-smooth mb-8"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to home
                    </Link>

                    <h2 className="font-display text-3xl mb-2">Sign In</h2>
                    <p className="text-muted-foreground mb-8">
                        Enter your credentials to access your account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-muted-foreground mt-8">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-foreground hover:text-accent transition-smooth underline underline-offset-4"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
