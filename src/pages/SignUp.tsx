import { SignUp } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SignUpPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <h1 className="font-display text-3xl mb-8 text-center">Create Account</h1>
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "mx-auto",
                                card: "bg-secondary/50 shadow-xl border border-border",
                                headerTitle: "font-display text-foreground",
                                headerSubtitle: "text-muted-foreground",
                                formButtonPrimary: "bg-accent hover:bg-accent/90 text-accent-foreground",
                                formFieldInput: "bg-background border-border focus:border-accent",
                                formFieldLabel: "text-foreground",
                                footerActionLink: "text-accent hover:text-accent/80",
                                identityPreviewEditButton: "text-accent",
                                dividerLine: "bg-border",
                                dividerText: "text-muted-foreground",
                                socialButtonsBlockButton: "bg-background border-border hover:bg-secondary",
                                socialButtonsBlockButtonText: "text-foreground",
                            },
                        }}
                        routing="path"
                        path="/sign-up"
                        signInUrl="/sign-in"
                        forceRedirectUrl="/"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SignUpPage;
