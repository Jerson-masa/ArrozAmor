// import { Inter } from "next/font/google"; // Temporalmente deshabilitado para evitar errores de red en el build
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { AdminProvider } from "@/context/AdminContext";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "LocaleComer - Tu Marketplace Local de Colombia",
  description: "Encuentra productos y servicios locales cerca de ti. Compra y vende en tu ciudad con LocaleComer.",
  manifest: "/manifest.json",
  themeColor: "#F97316",
  verification: {
    google: "zDiIwQLSQenw4K04qNCq1aubnnUJbHI2VBEmGIJP5Wo",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LocaleComer",
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
  themeColor: "#F97316",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-inter">
        <AdminProvider>
          <CartProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
