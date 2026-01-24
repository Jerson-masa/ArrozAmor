'use client';

export default function Header() {
    return (
        <header
            className="header header-video"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="header-video-overlay"></div>

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
