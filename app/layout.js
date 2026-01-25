import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arroz Amor",
  description: "Pide tu arroz favorito por WhatsApp en segundos",
  manifest: "/manifest.json",
  themeColor: "#FFD700",
  verification: {
    google: "zDiIwQLSQenw4K04qNCq1aubnnUJbHI2VBEmGIJP5Wo",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Arroces",
  },
  icons: {
    icon: "/icons/icon-192.png?v=4",
    apple: "/icons/icon-192.png?v=4",
    shortcut: "/icons/icon-192.png?v=4",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFD700",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <CartProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
