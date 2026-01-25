'use client';

import { useState, useRef } from 'react';

export default function Header() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
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
                poster="https://res.cloudinary.com/divyzn2hg/video/upload/so_0/v1769295579/WhatsApp_Video_2026-01-24_at_1.24.28_PM_f3oyyb.jpg"
            >
                <source src="https://res.cloudinary.com/divyzn2hg/video/upload/v1769295579/WhatsApp_Video_2026-01-24_at_1.24.28_PM_f3oyyb.mp4" type="video/mp4" />
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
                    <h1 className="logo">🍚 Arroz Amor</h1>
                    <p className="tagline">Pedidos rápidos · Precios en COP</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline" id="installBtn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Descargar</span>
                    </button>
                    <a href="#menu" className="btn-outline">
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
