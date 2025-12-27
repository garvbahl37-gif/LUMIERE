import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        const result = await register(name, email, password);

        if (result.success) {
            toast.success("Account created successfully!");
            navigate("/");
        } else {
            toast.error(result.message || "Registration failed");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
                <div className="max-w-md mx-auto w-full">
                    <Link
                        to="/"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-smooth mb-8"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to home
                    </Link>

                    <h2 className="font-display text-3xl mb-2">Create Account</h2>
                    <p className="text-muted-foreground mb-8">
                        Join us and discover curated collections for modern living
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-12"
                            />
                        </div>

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

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="h-12"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="text-center text-muted-foreground mt-8">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-foreground hover:text-accent transition-smooth underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470"
                    alt="Shopping experience"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-background/80 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center p-12 ml-auto text-right">
                    <h1 className="font-display text-5xl text-foreground mb-4">
                        Join LUMIÈRE
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md ml-auto">
                        Create an account to save your favorites, track orders, and enjoy exclusive member benefits.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
