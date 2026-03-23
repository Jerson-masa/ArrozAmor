'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useAdmin } from '@/context/AdminContext';
import OrderForm from './OrderForm';

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { 
        cart, removeFromCart, clearCart, total, 
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
            message += `• ${item.name} - $${item.price.toLocaleString()}\n`;
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
                            <div key={index} className="cart-item">
                                <div className="cart-item-info">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price">${item.price.toLocaleString()}</div>
                                </div>
                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(index)}
                                    title="Eliminar"
                                    style={{ 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: '#fee2e2', color: '#ef4444', border: 'none', 
                                        borderRadius: '6px', width: '32px', height: '32px', 
                                        cursor: 'pointer', transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 5px rgba(239, 68, 68, 0.2)'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.transform = 'scale(1)'; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-total">
                    <span>Total:</span>
                    <span id="cartTotal">${total.toLocaleString()}</span>
                </div>

                {cart.length > 0 && <OrderForm />}

                <button className="btn-whatsapp" onClick={sendToWhatsApp}>
                    <span>💬</span> Enviar pedido por WhatsApp
                </button>
            </div>
        </div>
    );
}
