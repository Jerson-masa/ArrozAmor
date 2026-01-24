'use client';

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <a href="#menu-section" className="nav-item">
                <span className="nav-icon">📋</span>
                <span className="nav-label">Menú</span>
            </a>
            <a
                href="https://maps.google.com/?q=Riohacha,La+Guajira,Colombia"
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

