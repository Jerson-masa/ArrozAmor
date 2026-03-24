'use client';

import { useState, useEffect, useRef } from 'react';
import { getDepartments, getCitiesByDepartment } from '@/data/colombiaRegions';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function TopBar() {
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const regionRef = useRef(null);
    const loginRef = useRef(null);

    const departments = getDepartments();
    const { cart } = useCart();
    const { showToast } = useToast();
    const cartCount = cart.length;

    // Cargar datos guardados del localStorage
    useEffect(() => {
        const savedDepartment = localStorage.getItem('selectedDepartment');
        const savedCity = localStorage.getItem('selectedCity');
        const savedFavorites = localStorage.getItem('favorites');
        const savedUser = localStorage.getItem('loggedInUser');

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
        if (savedUser) {
            setLoggedInUser(savedUser);
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

                {/* Botón Ver Menú */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <a 
                        href="#menu-section" 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' }); 
                        }} 
                        style={{ 
                            background: '#F97316', color: 'white', padding: '8px 20px', 
                            borderRadius: '20px', fontWeight: '800', fontSize: '0.95rem',
                            textDecoration: 'none', display: 'flex', alignItems: 'center', 
                            gap: '8px', boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3)',
                            transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            <line x1="8" y1="7" x2="16" y2="7" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        Mirar el Menú
                    </a>
                </div>

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
                            <span className="action-label">{loggedInUser ? (loggedInUser.split('@')[0].substring(0, 8) + '...') : 'Entrar'}</span>
                        </button>

                        {isLoginOpen && (
                            <div className="login-dropdown">
                                {loggedInUser ? (
                                    <>
                                        <div className="login-dropdown-header">
                                            <h4>Hola, {loggedInUser}</h4>
                                            <p>¡Bienvenido de vuelta!</p>
                                        </div>
                                        <button className="login-submit-btn" onClick={() => { 
                                            localStorage.removeItem('loggedInUser');
                                            setLoggedInUser(null);
                                            setIsLoginOpen(false); 
                                            showToast('Sesión cerrada'); 
                                        }}>
                                            Cerrar Sesión
                                        </button>
                                        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
                                            <a href="/admin" style={{ color: '#F97316', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>🛡️ Ingreso para Administradores</a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="login-dropdown-header">
                                            <h4>Bienvenido a LocaleComer</h4>
                                            <p>Ingresa tus datos para continuar</p>
                                        </div>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                                            <input 
                                                type="email" 
                                                placeholder="Correo electrónico" 
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', boxSizing: 'border-box' }}
                                            />
                                            <input 
                                                type="password" 
                                                placeholder="Contraseña" 
                                                value={passwordInput}
                                                onChange={(e) => setPasswordInput(e.target.value)}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', boxSizing: 'border-box' }}
                                            />
                                        </div>

                                        <button className="login-submit-btn" onClick={() => { 
                                            if (emailInput && passwordInput) {
                                                localStorage.setItem('loggedInUser', emailInput);
                                                setLoggedInUser(emailInput);
                                                setIsLoginOpen(false);
                                                showToast('Sesión iniciada correctamente');
                                            } else {
                                                showToast('Por favor ingresa tu correo y contraseña');
                                            }
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                                <polyline points="10 17 15 12 10 7" />
                                                <line x1="15" y1="12" x2="3" y2="12" />
                                            </svg>
                                            Iniciar Sesión
                                        </button>
                                        
                                        <button className="register-btn" onClick={() => { setIsLoginOpen(false); showToast('El registro de usuarios nuevos estará disponible próximamente'); }}>
                                            Crear cuenta nueva
                                        </button>

                                        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee', textAlign: 'center' }}>
                                            <a href="/admin" style={{ color: '#F97316', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>🛡️ Ingreso para Restaurantes (Admin)</a>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>



                    {/* Carrito */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ff6b00', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Mirar mi pedido 👉
                        </span>
                        <button className="action-btn cart-btn" aria-label="Carrito" onClick={() => window.openCart && window.openCart()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1.5" />
                                <circle cx="20" cy="21" r="1.5" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="action-badge">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
