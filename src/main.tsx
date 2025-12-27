import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

// Get Clerk publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key");
}

// Clerk appearance customization to match Lumière theme
const clerkAppearance = {
    layout: {
        socialButtonsPlacement: "bottom" as const,
        socialButtonsVariant: "iconButton" as const,
    },
    variables: {
        colorPrimary: "hsl(10, 55%, 68%)",
        colorText: "hsl(350, 10%, 15%)",
        colorBackground: "hsl(20, 25%, 97%)",
        colorInputBackground: "hsl(15, 20%, 98%)",
        colorInputText: "hsl(350, 10%, 15%)",
        borderRadius: "0.5rem",
        fontFamily: "'DM Sans', sans-serif",
    },
    elements: {
        formButtonPrimary: {
            backgroundColor: "hsl(10, 55%, 68%)",
            color: "hsl(350, 10%, 15%)",
            "&:hover": {
                backgroundColor: "hsl(10, 50%, 60%)",
            },
        },
        card: {
            boxShadow: "0 25px 60px -10px rgba(205, 145, 130, 0.2)",
            border: "1px solid hsl(15, 18%, 88%)",
        },
        headerTitle: {
            fontFamily: "'Playfair Display', serif",
        },
    },
};

createRoot(document.getElementById("root")!).render(
    <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={clerkAppearance}
        afterSignInUrl="/"
        afterSignUpUrl="/"
    >
        <App />
    </ClerkProvider>
);
