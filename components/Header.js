'use client';

import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function Header() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
    const { incrementAppDownloads } = useAdmin();

    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        // Register Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .catch(err => console.log('SW registration failed', err));
        }

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        incrementAppDownloads();
        if (!deferredPrompt) {
            // Fallback or instructions for iOS
            alert('Para instalar: \niOS: Pulsa compartir y "Añadir a inicio" \nAndroid: "Añadir a pantalla de inicio" en el menú');
            return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    const scrollToMenu = (e) => {
        e.preventDefault();
        const menuSection = document.getElementById('menu-section');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="header header-video header-video-large">
            {/* Video de fondo */}
            <video
                ref={videoRef}
                className="header-video-bg"
                autoPlay
                muted
                loop
                playsInline
                poster="https://res.cloudinary.com/divyzn2hg/video/upload/q_auto,f_auto,w_800/v1769295579/WhatsApp_Video_2026-01-24_at_1.24.28_PM_f3oyyb.jpg"
            >
                <source src="https://res.cloudinary.com/divyzn2hg/video/upload/q_auto,f_auto,w_800/v1769295579/WhatsApp_Video_2026-01-24_at_1.24.28_PM_f3oyyb.mp4" type="video/mp4" />
            </video>

            <div className="header-video-overlay"></div>

            {/* Botón de sonido */}
            <button className="video-sound-btn" onClick={toggleSound} aria-label="Toggle sound">
                {isMuted ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                )}
            </button>

            <div className="header-content">
                <div className="logo-section">
                    <h1 className="logo">
                        <img src="/lobster-chef-v2.webp" alt="Chef Langosta - Arroz Amor" className="logo-full" />
                        {/* Arroz Amor */}
                    </h1>
                    <p className="tagline tagline-gourmet">
                        <em>Calidad y Sazón Gourmet</em> <span className="price-badge">desde $6.000</span>
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline" id="installBtn" onClick={handleInstallClick}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Descargar</span>
                    </button>
                    <a href="#menu-section" className="btn-outline" onClick={scrollToMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            <line x1="8" y1="7" x2="16" y2="7" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>Menú</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
