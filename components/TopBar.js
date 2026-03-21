'use client';

import { useState, useEffect, useRef } from 'react';
import { getDepartments, getCitiesByDepartment } from '@/data/colombiaRegions';

export default function TopBar() {
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const regionRef = useRef(null);
    const loginRef = useRef(null);

    const departments = getDepartments();

    // Cargar datos guardados del localStorage
    useEffect(() => {
        const savedDepartment = localStorage.getItem('selectedDepartment');
        const savedCity = localStorage.getItem('selectedCity');
        const savedFavorites = localStorage.getItem('favorites');

        if (savedDepartment) {
            setSelectedDepartment(savedDepartment);
            setCities(getCitiesByDepartment(savedDepartment));
        }
        if (savedCity) {
            setSelectedCity(savedCity);
        }
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Cerrar menús al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (regionRef.current && !regionRef.current.contains(event.target)) {
                setIsRegionOpen(false);
            }
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                setIsLoginOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDepartmentChange = (department) => {
        setSelectedDepartment(department);
        setSelectedCity('');
        setCities(getCitiesByDepartment(department));
        localStorage.setItem('selectedDepartment', department);
        localStorage.removeItem('selectedCity');
    };

    const handleCityChange = (city) => {
        setSelectedCity(city);
        localStorage.setItem('selectedCity', city);
        setIsRegionOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Implementar lógica de búsqueda
            console.log('Buscando:', searchQuery);
            // Aquí puedes agregar la lógica de búsqueda
        }
    };

    const getLocationDisplay = () => {
        if (selectedCity && selectedDepartment) {
            return `${selectedCity}, ${selectedDepartment}`;
        } else if (selectedDepartment) {
            return selectedDepartment;
        }
        return 'Selecciona ubicación';
    };

    return (
        <nav className="topbar">
            <div className="topbar-container">
                {/* Logo */}
                <a href="/" className="topbar-logo">
                    <span className="logo-local">Local</span>
                    <span className="logo-ecomer">eComer</span>
                </a>

                {/* Botón de Región */}
                <div className="topbar-region" ref={regionRef}>
                    <button
                        className="region-btn"
                        onClick={() => setIsRegionOpen(!isRegionOpen)}
                        aria-label="Seleccionar región"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="region-text">{getLocationDisplay()}</span>
                        <svg className={`region-arrow ${isRegionOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    {/* Dropdown de Región */}
                    {isRegionOpen && (
                        <div className="region-dropdown">
                            <div className="region-dropdown-header">
                                <h4>🇨🇴 Selecciona tu ubicación</h4>
                            </div>

                            <div className="region-select-group">
                                <label>Departamento</label>
                                <select
                                    value={selectedDepartment}
                                    onChange={(e) => handleDepartmentChange(e.target.value)}
                                    className="region-select"
                                >
                                    <option value="">Selecciona departamento...</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>

                            {cities.length > 0 && (
                                <div className="region-select-group">
                                    <label>Ciudad / Municipio</label>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => handleCityChange(e.target.value)}
                                        className="region-select"
                                    >
                                        <option value="">Selecciona ciudad...</option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Buscador */}
                <form className="topbar-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Busca lo que se te ocurra"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-btn" aria-label="Buscar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </form>

                {/* Acciones */}
                <div className="topbar-actions">
                    {/* Login */}
                    <div className="topbar-login" ref={loginRef}>
                        <button
                            className="action-btn login-btn"
                            onClick={() => setIsLoginOpen(!isLoginOpen)}
                            aria-label="Iniciar sesión"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span className="action-label">Entrar</span>
                        </button>

                        {isLoginOpen && (
                            <div className="login-dropdown">
                                <div className="login-dropdown-header">
                                    <h4>Bienvenido a LocaleComer</h4>
                                    <p>Inicia sesión para una mejor experiencia</p>
                                </div>
                                <button className="login-submit-btn">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Iniciar Sesión
                                </button>
                                <button className="register-btn">
                                    Registrarse
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Favoritos */}
                    <button className="action-btn" aria-label="Favoritos">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {favorites.length > 0 && (
                            <span className="action-badge">{favorites.length}</span>
                        )}
                    </button>

                    {/* Regalos / Promociones */}
                    <button className="action-btn" aria-label="Promociones">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 12 20 22 4 22 4 12" />
                            <rect x="2" y="7" width="20" height="5" />
                            <line x1="12" y1="22" x2="12" y2="7" />
                            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                        </svg>
                    </button>

                    {/* Carrito */}
                    <button className="action-btn cart-btn" aria-label="Carrito">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="action-badge">{cartCount}</span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
