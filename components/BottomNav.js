'use client';

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <a href="#menu-section" className="nav-item">
                <span className="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        <line x1="8" y1="7" x2="16" y2="7" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </span>
                <span className="nav-label">Menú</span>
            </a>
            <a
                href="https://maps.app.goo.gl/575iF12ogpKgKcz87"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
            >
                <span className="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </span>
                <span className="nav-label">Ubicación</span>
            </a>
        </nav>
    );
}

