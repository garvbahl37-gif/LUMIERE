import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StripePaymentForm from "@/components/StripePaymentForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

// Stripe publishable key (test mode)
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

interface ShippingAddress {
    fullName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

const Checkout = () => {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { getToken } = useClerkAuth();
    const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
    const [isLoading, setIsLoading] = useState(false);

    const [shipping, setShipping] = useState<ShippingAddress>({
        fullName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
    });

    // Redirect if cart is empty
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-32 pb-20">
                    <div className="container mx-auto px-4 lg:px-8 text-center">
                        <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-6" />
                        <h1 className="font-display text-3xl mb-4">Your Cart is Empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Add some items to your cart before checking out.
                        </p>
                        <Link to="/shop">
                            <Button size="lg">Continue Shopping</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const shippingCost = totalPrice > 500 ? 0 : 25;
    const tax = totalPrice * 0.08;
    const orderTotal = totalPrice + shippingCost + tax;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShipping(prev => ({ ...prev, [name]: value }));
    };

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate shipping address
        const required: (keyof ShippingAddress)[] = ['fullName', 'email', 'street', 'city', 'state', 'zipCode', 'country', 'phone'];
        for (const field of required) {
            if (!shipping[field]) {
                toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        // Email validation
        if (!shipping.email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }

        setStep('payment');
    };

    const handlePaymentSuccess = async () => {
        setIsLoading(true);

        try {
            // If user is authenticated, save to MongoDB
            if (isAuthenticated) {
                // Get fresh token and update localStorage (so axios interceptor picks it up)
                const token = await getToken();
                if (token) {
                    localStorage.setItem('token', token);
                }

                const response = await orderService.createOrderDirect({
                    items: items.map(item => ({
                        _id: item._id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    shippingAddress: shipping,
                    paymentMethod: 'card',
                    itemsPrice: totalPrice,
                    shippingPrice: shippingCost,
                    taxPrice: tax,
                    totalPrice: orderTotal
                });

                if (response.success) {
                    // Clear cart
                    clearCart();
                    toast.success('Order placed successfully!');
                    // Navigate to success page with MongoDB order ID
                    navigate(`/order-success/${response.data._id}`);
                    return;
                }
            }
        } catch (error) {
            console.error('Failed to save order to database:', error);
            // Fall through to localStorage fallback
        }

        // Fallback: Save order to localStorage (for guests or if API fails)
        const orderId = `ORD-${Date.now()}`;
        const order = {
            id: orderId,
            items,
            shipping,
            subtotal: totalPrice,
            shippingCost,
            tax,
            total: orderTotal,
            date: new Date().toISOString(),
            status: 'confirmed'
        };

        const existingOrders = JSON.parse(localStorage.getItem('lumiere-orders') || '[]');
        localStorage.setItem('lumiere-orders', JSON.stringify([order, ...existingOrders]));

        // Clear cart
        clearCart();

        setIsLoading(false);

        // Navigate to success page
        navigate(`/order-success/${orderId}`);
    };

    const handlePaymentError = (error: string) => {
        toast.error(error);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
                    <button
                        onClick={() => step === 'payment' ? setStep('shipping') : navigate('/cart')}
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-smooth mb-8"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        {step === 'payment' ? 'Back to Shipping' : 'Back to Cart'}
                    </button>

                    <h1 className="font-display text-3xl lg:text-4xl mb-2">Checkout</h1>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-foreground' : 'text-muted-foreground'}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'shipping' ? 'bg-accent text-accent-foreground' : 'bg-muted'}`}>1</span>
                            <span className="text-sm font-medium">Shipping</span>
                        </div>
                        <div className="w-8 h-px bg-border" />
                        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-foreground' : 'text-muted-foreground'}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'payment' ? 'bg-accent text-accent-foreground' : 'bg-muted'}`}>2</span>
                            <span className="text-sm font-medium">Payment</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            {step === 'shipping' ? (
                                <form onSubmit={handleShippingSubmit}>
                                    <div className="bg-secondary/30 rounded-lg p-6 space-y-6">
                                        <h2 className="font-display text-xl">Shipping Address</h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="sm:col-span-2">
                                                <Label htmlFor="fullName">Full Name</Label>
                                                <Input
                                                    id="fullName"
                                                    name="fullName"
                                                    value={shipping.fullName}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={shipping.email}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <Label htmlFor="street">Street Address</Label>
                                                <Input
                                                    id="street"
                                                    name="street"
                                                    value={shipping.street}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="123 Main St"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    value={shipping.city}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="New York"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="state">State / Province</Label>
                                                <Input
                                                    id="state"
                                                    name="state"
                                                    value={shipping.state}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="NY"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                                                <Input
                                                    id="zipCode"
                                                    name="zipCode"
                                                    value={shipping.zipCode}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="10001"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="country">Country</Label>
                                                <Input
                                                    id="country"
                                                    name="country"
                                                    value={shipping.country}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="United States"
                                                    required
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={shipping.phone}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="+1 (555) 123-4567"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" size="lg" className="w-full">
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-secondary/30 rounded-lg p-6">
                                    <h2 className="font-display text-xl mb-6">Payment Details</h2>
                                    <Elements stripe={stripePromise}>
                                        <StripePaymentForm
                                            amount={Math.round(orderTotal * 100) / 100}
                                            onSuccess={handlePaymentSuccess}
                                            onError={handlePaymentError}
                                        />
                                    </Elements>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:sticky lg:top-32 lg:self-start">
                            <div className="bg-secondary/30 rounded-lg p-6 space-y-6">
                                <h2 className="font-display text-xl">Order Summary</h2>

                                {/* Items */}
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item._id} className="flex gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-20 object-cover rounded-sm"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                <p className="text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-border pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-border pt-2 flex justify-between font-display text-lg">
                                        <span>Total</span>
                                        <span>${orderTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {totalPrice < 500 && (
                                    <p className="text-xs text-muted-foreground text-center">
                                        Add ${(500 - totalPrice).toLocaleString()} more for free shipping
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
