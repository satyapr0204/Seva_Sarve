"use client";

import StoreProvider from "@/store/StoreProvider";
import QueryProvider from "@/providers/QueryProvider";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // 1. IMPORTED: To watch for route transitions 
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LoginModal from "@/components/modals/LoginModal";
import OtpModal from "@/components/modals/OtpModal";
import WelcomeModal from "@/components/modals/WelcomeModal";
import LocationModal from "@/components/modals/LocationModal";
import AddCardModal from "@/components/modals/AddCardModal";
import AddAddressModal from "@/components/modals/AddAddressModal";
import SevaServeWorkModal from "@/components/modals/SevaServeWorkModal";
import LogOutModal from "@/components/modals/LogOutModal";
import DeleteMyAccountModal from "@/components/modals/DeleteMyAccountModal";
import NewServiceRejectionModal from "@/components/modals/bookingmodals/NewServiceRejectionModal";
import RateSevaServe from "@/components/modals/bookingmodals/RateSevaServe";
import { Toaster } from "react-hot-toast";
import DeleteAccountModal from "@/components/modals/deleteAccountModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const pathname = usePathname(); // 2. CAPTURED: Tracks current path change

  useEffect(() => {
    // Clean up any previously appended script instances on path change
    // to prevent piling up dozens of duplicate script nodes in the <head>
    const existingCustomScripts = document.querySelectorAll(".dynamic-script");
    existingCustomScripts.forEach((script) => script.remove());

    // 1. Create and inject jQuery Core
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "/js/jquery.min.js";
    jqueryScript.className = "dynamic-script";
    jqueryScript.async = false;

    jqueryScript.onload = () => {
      // 2. Map Window Bindings Safely
      if (typeof window !== "undefined") {
        (window as any).$ = (window as any).jQuery =
          (window as any).jQuery || (window as any).$;
      }

      // 3. Chain dependent plugins
      const bootstrapScript = document.createElement("script");
      bootstrapScript.src =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
      bootstrapScript.className = "dynamic-script";
      bootstrapScript.async = false;

      const jqueryUiScript = document.createElement("script");
      jqueryUiScript.src = "https://code.jquery.com/ui/1.13.2/jquery-ui.min.js";
      jqueryUiScript.className = "dynamic-script";
      jqueryUiScript.async = false;

      const slickScript = document.createElement("script");
      slickScript.src = "/js/slick.min.js";
      slickScript.className = "dynamic-script";
      slickScript.async = false;

      slickScript.onload = () => {
        // 4. Run custom execution scripts every single time the route updates
        const progressScript = document.createElement("script");
        progressScript.src = "/js/circle-progress.min.js";
        progressScript.className = "dynamic-script";
        progressScript.type = "module";

        const customScript = document.createElement("script");
        customScript.src = `/js/custom.js?v=${Date.now()}`; // Added cache-buster to instantly bust hard browser caching
        customScript.className = "dynamic-script";
        customScript.type = "module";

        document.head.appendChild(progressScript);
        document.head.appendChild(customScript);
        setScriptsLoaded(true);
      };

      document.head.appendChild(bootstrapScript);
      document.head.appendChild(jqueryUiScript);
      document.head.appendChild(slickScript);
    };

    document.head.appendChild(jqueryScript);
  }, [pathname]); // 3. FIXED: Re-executes scripts cleanly whenever user switches pages!

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/styles/bootstrap.min.css" />
        <link rel="stylesheet" href="/styles/all.min.css" />
        <link rel="stylesheet" href="/styles/slick.css" />
        <link rel="stylesheet" href="/styles/style.css" />
        <link rel="stylesheet" href="/styles/responsive.css" />
        <link
          rel="stylesheet"
          href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"
        />

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
      </head>
      <body>
        <StoreProvider>
          <QueryProvider>
           <Header />
            {children}
            <Footer />

            {/* Global Modals */}
            <LoginModal />
            <OtpModal />
            <WelcomeModal />
            <LocationModal />
            <AddCardModal />
            <AddAddressModal />
            <SevaServeWorkModal />
            <LogOutModal />
            <DeleteAccountModal />
            <DeleteMyAccountModal />
            <NewServiceRejectionModal />
            <RateSevaServe 
            feedback={"abcdefghijklmnopqrstuvwxyz"}
            />

            
            </QueryProvider>
        </StoreProvider>
        <Toaster position="top-right" />

      </body>
    </html>
  );
}
