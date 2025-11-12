import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CartProvider } from "@/contexts/CartContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Licorice Ropes - Premium Quality Licorice",
  description:
    "Discover our wide range of premium licorice products, from classic black to fruity varieties. Made with authentic ingredients and traditional methods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get configuration from environment variables
  const apiUrl = process.env.NEXT_PUBLIC_TRACKDESK_API_URL || "";
  const websiteId = process.env.NEXT_PUBLIC_TRACKDESK_WEBSITE_ID || "";
  const debugMode = process.env.NEXT_PUBLIC_TRACKDESK_DEBUG === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Trackdesk Tracking Script */}
        <Script
          id="trackdesk-script"
          src="/trackdesk.js"
          strategy="afterInteractive"
          data-website-id={websiteId}
          data-auto-init="false"
        />

        {/* Initialize Trackdesk with configuration */}
        <Script id="trackdesk-init" strategy="afterInteractive">
          {`
            function initializeTrackdesk() {
              if (window.Trackdesk && window.Trackdesk.init) {
                window.Trackdesk.init({
                  apiUrl: '${apiUrl}',
                  websiteId: '${websiteId}',
                  debug: ${debugMode},
                  batchSize: 10,
                  flushInterval: 5000
                });
                console.log("[Trackdesk] Initialized with:", "${apiUrl}", "${websiteId}");
                
                // Referral code management - Use sessionStorage (tab-scoped)
                // This ensures referral codes are only valid for the current browser tab/session
                // and don't persist across different users on the same browser
                
                function getReferralCodeFromURL() {
                  const urlParams = new URLSearchParams(window.location.search);
                  return urlParams.get('ref') || 
                         urlParams.get('referral') || 
                         urlParams.get('aff') || 
                         urlParams.get('code') ||
                         null;
                }
                
                function storeReferralCode(code) {
                  if (code) {
                    // Use sessionStorage instead of localStorage
                    // sessionStorage is tab-scoped and clears when tab closes
                    // This prevents referral codes from persisting across different users
                    const sessionData = {
                      code: code,
                      timestamp: new Date().toISOString(),
                      sessionId: window.Trackdesk?.config?.sessionId || Date.now().toString(),
                    };
                    sessionStorage.setItem('trackdesk_referral_code', JSON.stringify(sessionData));
                    console.log('[Trackdesk] ✅ Referral code stored in session:', code);
                    return code;
                  }
                  return null;
                }
                
                function getStoredReferralCode() {
                  try {
                    const stored = sessionStorage.getItem('trackdesk_referral_code');
                    if (!stored) {
                      return null;
                    }
                    
                    const sessionData = JSON.parse(stored);
                    const code = sessionData.code;
                    
                    // Verify code exists and is valid
                    if (!code || typeof code !== 'string') {
                      sessionStorage.removeItem('trackdesk_referral_code');
                      return null;
                    }
                    
                    // Check if session is still valid (max 24 hours for same tab)
                    const timestamp = new Date(sessionData.timestamp);
                    const now = new Date();
                    const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
                    
                    if (hoursDiff > 24) {
                      // Session expired, clear it
                      sessionStorage.removeItem('trackdesk_referral_code');
                      console.log('[Trackdesk] ⚠️ Referral code session expired');
                      return null;
                    }
                    
                    return code;
                  } catch (error) {
                    console.error('[Trackdesk] Error reading referral code:', error);
                    sessionStorage.removeItem('trackdesk_referral_code');
                    return null;
                  }
                }
                
                // Get referral code from CURRENT URL only
                const refCode = getReferralCodeFromURL();
                
                if (refCode) {
                  // User came with referral code - store it and track click
                  storeReferralCode(refCode);
                  
                  // Track the click immediately
                  if ('${apiUrl}') {
                    fetch('${apiUrl}/tracking/click', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        referralCode: refCode,
                        websiteId: '${websiteId}',
                        storeId: '${websiteId}',
                        url: window.location.href,
                        referrer: document.referrer,
                        userAgent: navigator.userAgent,
                        timestamp: new Date().toISOString(),
                      }),
                    }).catch(error => {
                      console.error('[Trackdesk] Failed to track referral click:', error);
                    });
                  }
                } else {
                  // No referral code in URL - check if we should clear stored code
                  const storedCode = getStoredReferralCode();
                  if (storedCode) {
                    // Keep the stored code for this session (user might navigate within site)
                    console.log('[Trackdesk] ℹ️ No referral code in URL, keeping existing session code:', storedCode);
                  }
                }
                
                // Clean up old localStorage entries if they exist (migration)
                try {
                  if (localStorage.getItem('trackdesk_referral_code')) {
                    localStorage.removeItem('trackdesk_referral_code');
                    localStorage.removeItem('trackdesk_referral_code_expiry');
                    console.log('[Trackdesk] 🧹 Migrated from localStorage to sessionStorage');
                  }
                } catch (e) {
                  // Ignore errors during cleanup
                }
              } else {
                console.warn("[Trackdesk] Not ready yet — retrying...");
                setTimeout(initializeTrackdesk, 1000);
              }
            }
            initializeTrackdesk();
          `}
        </Script>

        <CartProvider>
          <FavoritesProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}

// Component to conditionally render layout based on route
function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
