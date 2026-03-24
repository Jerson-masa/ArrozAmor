'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useAdmin } from '@/context/AdminContext';
import OrderForm from './OrderForm';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { 
        cart, updateQuantity, removeFromCart, clearCart, total, 
        customerName, customerPhone, customerAddress, orderNotes 
    } = useCart();
    const { showToast } = useToast();
    const { whatsappNumber, restaurantAddress, incrementWhatsappOrders } = useAdmin();

    const openCart = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('cart-modal')) {
            closeCart();
        }
    };

    const sendToWhatsApp = () => {
        if (cart.length === 0) {
            showToast('Añade productos primero');
            return;
        }

        if (!customerPhone || !customerAddress) {
            showToast('Por favor, ingresa tu teléfono y dirección en el formulario');
            return;
        }

        let message = '🛵 *NUEVO DOMICILIO - Arroz Amor*\n\n';
        
        message += '📍 *De (Restaurante):*\n';
        message += `${restaurantAddress}\n\n`;

        message += '🏠 *Para (Cliente):*\n';
        if (customerName) message += `Nombre: ${customerName}\n`;
        message += `Dirección: ${customerAddress}\n`;
        message += `Teléfono: ${customerPhone}\n\n`;

        message += '*📋 Pedido:*\n';
        cart.forEach(item => {
            const qty = item.quantity || 1;
            message += `• *${qty}x* ${item.name} - $${(item.price * qty).toLocaleString()}\n`;
        });

        message += `\n💰 *Total: $${total.toLocaleString()}*`;

        if (orderNotes) {
            message += `\n\n📝 *Notas:* ${orderNotes}`;
        }

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        incrementWhatsappOrders();
        clearCart();
        closeCart();
        showToast('¡Pedido enviado al domiciliario!');
    };

    // Expose openCart globally for BottomNav
    if (typeof window !== 'undefined') {
        window.openCart = openCart;
    }

    return (
        <div
            className={`cart-modal ${isOpen ? 'open' : ''}`}
            id="cartModal"
            onClick={handleOverlayClick}
        >
            <div className="cart-content">
                <div className="cart-header">
                    <h3>🛒 Tu Canasta</h3>
                    <button className="close-btn" onClick={closeCart}>✕</button>
                </div>

                <div className="cart-items" id="cartItems">
                    {cart.length === 0 ? (
                        <div className="cart-empty">Tu canasta está vacía</div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div className="cart-item-info" style={{ flex: 1 }}>
                                        <div className="cart-item-name" style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#1f2937' }}>{item.name}</div>
                                        <div className="cart-item-price" style={{ color: '#4b5563' }}>${item.price.toLocaleString()} un.</div>
                                    </div>
                                    <div style={{ fontWeight: '800', color: '#FF6B00', fontSize: '1.1rem' }}>
                                        ${(item.price * (item.quantity || 1)).toLocaleString()}
                                    </div>
                                </div>
                                <div className="cart-item-quantity" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                                    <button onClick={() => updateQuantity(item.name, -1)} style={{ background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '6px', padding: '8px 12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s', flex: 1, justifyContent: 'center' }} onMouseOver={(e) => { e.currentTarget.style.background = '#fecaca'; }} onMouseOut={(e) => { e.currentTarget.style.background = '#fee2e2'; }}>
                                        <span style={{ fontSize: '1.1rem' }}>-</span> Quitar
                                    </button>
                                    <span style={{ fontWeight: '900', fontSize: '1.2rem', minWidth: '40px', textAlign: 'center', color: '#111827' }}>{item.quantity || 1}</span>
                                    <button onClick={() => updateQuantity(item.name, 1)} style={{ background: '#dcfce7', color: '#22c55e', border: '1px solid #86efac', borderRadius: '6px', padding: '8px 12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s', flex: 1, justifyContent: 'center' }} onMouseOver={(e) => { e.currentTarget.style.background = '#bbf7d0'; }} onMouseOut={(e) => { e.currentTarget.style.background = '#dcfce7'; }}>
                                        <span style={{ fontSize: '1.1rem' }}>+</span> Pedir más
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-total">
                    <span>Total:</span>
                    <span id="cartTotal">${total.toLocaleString()}</span>
                </div>

                {cart.length > 0 && <OrderForm />}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                    <button className="btn-whatsapp" onClick={sendToWhatsApp} style={{ marginTop: '0' }}>
                        <span>💬</span> Enviar pedido por WhatsApp
                    </button>
                    <button onClick={closeCart} style={{ 
                        padding: '12px', background: 'transparent', border: '2px solid #FF6B00', color: '#FF6B00', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', width: '100%' 
                    }} onMouseOver={(e) => { e.currentTarget.style.background = '#fff4ed'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                        Seguir pidiendo más platos
                    </button>
                </div>
            </div>
        </div>
    );
}
