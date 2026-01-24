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
                {isMuted ? '🔇' : '🔊'}
            </button>

            <div className="header-content">
                <div className="logo-section">
                    <h1 className="logo">🍚 Arroz Amor</h1>
                    <p className="tagline">Pedidos rápidos · Precios en COP</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline" id="installBtn">
                        <span className="icon">⬇️</span> Descargar
                    </button>
                    <a href="#menu" className="btn-outline">
                        <span className="icon">📋</span> Menú
                    </a>
                </div>
            </div>
        </header>
    );
}
