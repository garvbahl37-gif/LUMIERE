import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Check } from 'lucide-react';

interface StripePaymentFormProps {
    amount: number;
    onSuccess: () => void;
    onError: (error: string) => void;
}

const StripePaymentForm = ({ amount, onSuccess, onError }: StripePaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setIsProcessing(false);
            return;
        }

        // In demo mode, we simulate a successful payment
        // In production, you would create a PaymentIntent on your server
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setIsProcessing(false);
            onError(error.message || 'Payment failed');
            return;
        }

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Demo mode: simulate successful payment
        console.log('Demo payment successful:', paymentMethod);
        setIsComplete(true);
        setIsProcessing(false);

        // Wait a moment to show success state
        setTimeout(() => {
            onSuccess();
        }, 1000);
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424242',
                fontFamily: '"DM Sans", sans-serif',
                '::placeholder': {
                    color: '#9ca3af',
                },
                iconColor: '#c9a55c',
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
            },
        },
    };

    if (isComplete) {
        return (
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-xl mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground">Redirecting to order confirmation...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-3">
                    Card Details
                </label>
                <div className="p-4 border border-border rounded-md bg-background">
                    <CardElement options={cardElementOptions} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Demo mode: Use card 4242 4242 4242 4242, any future expiry, any CVC
                </p>
            </div>

            <div className="pt-4 border-t border-border">
                <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-display text-xl">${amount.toLocaleString()}</span>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!stripe || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay ${amount.toLocaleString()}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default StripePaymentForm;
