'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/context/ToastContext';
import TopBar from '@/components/TopBar';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { showToast } = useToast();

    const { 
        menuItems, updateMenuItems, 
        whatsappNumber, updateWhatsappNumber,
        restaurantAddress, updateRestaurantAddress,
        syncSettingsToCloud,
        whatsappOrdersCount, appDownloadsCount,
        isLoaded
    } = useAdmin();

    const [formWhatsapp, setFormWhatsapp] = useState('');
    const [formAddress, setFormAddress] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const cleanUser = username.trim().toLowerCase();
        const cleanPass = password.trim().toLowerCase();
        if (cleanUser === 'auner masa' && cleanPass === 'arroz amor') {
            setIsLoggedIn(true);
            setFormWhatsapp(whatsappNumber);
            setFormAddress(restaurantAddress);
            showToast('Sesión iniciada correctamente');
        } else {
            showToast('Credenciales incorrectas. Intenta nuevamente.');
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        updateWhatsappNumber(formWhatsapp);
        updateRestaurantAddress(formAddress);
        
        // Sync to cloud so ALL users see the new settings
        const result = await syncSettingsToCloud(formWhatsapp, formAddress);
        if (result.success) {
            showToast('✅ Configuración guardada en la nube para todos los usuarios');
        } else {
            showToast('⚠️ Guardado local OK, pero error al sincronizar: ' + (result.error || 'Desconocido'));
        }
        setIsSaving(false);
    };

    const handleUpdateMenuItem = (id, field, value) => {
        const newItems = menuItems.map(item => {
            if (item.id === id) {
                return { ...item, [field]: field === 'price' ? parseInt(value) || 0 : value };
            }
            return item;
        });
        updateMenuItems(newItems);
    };

    const handleAddMenuItem = () => {
        const newItem = {
            id: 'plato-' + Date.now(),
            name: 'Nuevo Plato',
            emoji: '🍽️',
            description: 'Descripción básica',
            price: 5000,
            image: '/images/menu-icon.webp'
        };
        updateMenuItems([...menuItems, newItem]);
        showToast('Plato agregado');
    };

    const handleDeleteMenuItem = (id) => {
        // Confirmación removida temporalmente en caso de que el navegador esté bloqueando pop-ups
        updateMenuItems(menuItems.filter(item => item.id !== id));
        showToast('Plato eliminado');
    };

    const handleSyncToCloud = async () => {
        setIsSaving(true);
        try {
            // Sync menu items
            const menuRes = await fetch('/api/menu/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ menuItems })
            });
            const menuData = await menuRes.json();

            // Also sync settings (WhatsApp + Address)
            const settingsResult = await syncSettingsToCloud(formWhatsapp || whatsappNumber, formAddress || restaurantAddress);

            if (menuRes.ok && settingsResult.success) {
                showToast('✅ Menú y configuración guardados en la nube para todos');
            } else if (menuRes.ok) {
                showToast('⚠️ Menú guardado, pero error al sincronizar configuración');
            } else {
                showToast('Error al guardar: ' + (menuData.error || 'Desconocido'));
            }
        } catch (error) {
            console.error(error);
            showToast('Error de conexión al guardar cambios');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isLoaded) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>;

    if (!isLoggedIn) {
        return (
            <>
                <TopBar />
                <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#ff6b00' }}>Admin Login</h2>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Usuario</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Contraseña</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <button 
                            type="submit"
                            style={{ padding: '0.75rem', background: '#ff6b00', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </>
        );
    }

    return (
        <>
            <TopBar />
            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
                <h1 style={{ marginBottom: '2rem', color: '#333' }}>Panel de Administración</h1>

                {/* Dashboard Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #25D366' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>Pedidos por WhatsApp</h3>
                        <p style={{ margin: 0, fontSize: '2.8rem', fontWeight: 'bold', color: '#25D366' }}>{whatsappOrdersCount}</p>
                    </div>
                    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #F97316' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase' }}>Descargas de App</h3>
                        <p style={{ margin: 0, fontSize: '2.8rem', fontWeight: 'bold', color: '#F97316' }}>{appDownloadsCount}</p>
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ marginBottom: '1rem', color: '#ff6b00' }}>Configuración del Domicilio</h2>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>WhatsApp del Domiciliario</label>
                        <input 
                            type="text" 
                            value={formWhatsapp} 
                            onChange={(e) => setFormWhatsapp(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <small style={{ color: '#666' }}>Ej: 573001234567 (Código de país + número, sin espacios)</small>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dirección del Restaurante</label>
                        <input 
                            type="text" 
                            value={formAddress} 
                            onChange={(e) => setFormAddress(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <button 
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        style={{ padding: '0.75rem 1.5rem', background: '#ff6b00', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
                    >
                        {isSaving ? 'Guardando en la nube...' : '☁️ Guardar Configuración'}
                    </button>
                </div>

                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ margin: 0, color: '#ff6b00' }}>Platos Registrados</h2>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                type="button"
                                onClick={handleAddMenuItem}
                                style={{ padding: '0.5rem 1rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                + Agregar Nuevo Plato
                            </button>
                            <button 
                                type="button"
                                onClick={handleSyncToCloud}
                                disabled={isSaving}
                                style={{ padding: '0.5rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
                            >
                                {isSaving ? 'Guardando...' : '💾 Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {menuItems.map(item => (
                            <div key={item.id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                                    <div style={{ flex: '1 1 200px' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Nombre</label>
                                        <input 
                                            type="text" 
                                            value={item.name} 
                                            onChange={(e) => handleUpdateMenuItem(item.id, 'name', e.target.value)}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div style={{ flex: '1 1 100px' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Precio ($)</label>
                                        <input 
                                            type="number" 
                                            value={item.price} 
                                            onChange={(e) => handleUpdateMenuItem(item.id, 'price', e.target.value)}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div style={{ flex: '2 1 250px' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Descripción</label>
                                        <input 
                                            type="text" 
                                            value={item.description} 
                                            onChange={(e) => handleUpdateMenuItem(item.id, 'description', e.target.value)}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div style={{ flex: '1 1 200px' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>URL de Imagen</label>
                                        <input 
                                            type="text" 
                                            value={item.image || ''} 
                                            onChange={(e) => handleUpdateMenuItem(item.id, 'image', e.target.value)}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                    <div style={{ flex: '0 0 auto', marginLeft: 'auto' }}>
                                        <button 
                                            type="button"
                                            onClick={() => handleDeleteMenuItem(item.id)}
                                            style={{ padding: '0.5rem 1rem', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                            title="Eliminar Plato"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button 
                        onClick={() => setIsLoggedIn(false)}
                        style={{ padding: '0.5rem 1rem', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cerrar Sesión
                    </button>
                    <div style={{ marginTop: '1rem' }}>
                        <a href="/" style={{ color: '#ff6b00', textDecoration: 'none' }}>Volver a la tienda</a>
                    </div>
                </div>
            </div>
        </>
    );
}
