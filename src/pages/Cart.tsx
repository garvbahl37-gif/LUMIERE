import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
    const navigate = useNavigate();
    const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-32 pb-20">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-6" />
                        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link to="/shop">
                            <Button size="lg">
                                Start Shopping
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
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

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
                    <h1 className="font-display text-3xl lg:text-4xl mb-8">Shopping Cart</h1>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex gap-6 p-6 bg-secondary/30 rounded-lg"
                                >
                                    {/* Image */}
                                    <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-32 object-cover rounded-sm"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col">
                                        <Link to={`/product/${item.productId}`}>
                                            <h3 className="font-display text-lg hover:text-accent transition-smooth">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-lg font-medium mt-1">${item.price.toLocaleString()}</p>

                                        <div className="mt-auto flex items-center justify-between">
                                            {/* Quantity */}
                                            <div className="flex items-center border border-border rounded bg-background">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="p-2 hover:bg-muted transition-smooth"
                                                    disabled={item.quantity <= 1 || isLoading}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="p-2 hover:bg-muted transition-smooth"
                                                    disabled={isLoading}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-muted-foreground hover:text-destructive transition-smooth p-2"
                                                disabled={isLoading}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Subtotal</p>
                                        <p className="font-display text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart */}
                            <div className="flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={clearCart}
                                    disabled={isLoading}
                                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Clear Cart
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:sticky lg:top-32 lg:self-start">
                            <div className="bg-secondary/30 rounded-lg p-6 space-y-6">
                                <h2 className="font-display text-xl">Order Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
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
                                    <div className="border-t border-border pt-4 flex justify-between font-display text-lg">
                                        <span>Total</span>
                                        <span>${orderTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {shippingCost > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Add ${(500 - totalPrice).toLocaleString()} more for free shipping
                                    </p>
                                )}

                                <Button
                                    size="lg"
                                    className="w-full"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>

                                <Link
                                    to="/shop"
                                    className="block text-center text-sm text-muted-foreground hover:text-foreground transition-smooth"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
