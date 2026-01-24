'use client';

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <a href="#menu-section" className="nav-item">
                <span className="nav-icon">📋</span>
                <span className="nav-label">Menú</span>
            </a>
            <a
                href="https://maps.app.goo.gl/575iF12ogpKgKcz87"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
            >
                <span className="nav-icon">📍</span>
                <span className="nav-label">Ubicación</span>
            </a>
        </nav>
    );
}

