'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

const WHATSAPP_NUMBER = '573001234567'; // Cambiar por el número real

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, removeFromCart, clearCart, total, customerName, orderNotes } = useCart();
    const { showToast } = useToast();

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

        let message = '🍚 *NUEVO PEDIDO - Arroz Amor*\n\n';

        if (customerName) {
            message += `👤 *Cliente:* ${customerName}\n\n`;
        }

        message += '*📋 Pedido:*\n';
        cart.forEach(item => {
            message += `• ${item.name} - $${item.price.toLocaleString()}\n`;
        });

        message += `\n💰 *Total: $${total.toLocaleString()}*`;

        if (orderNotes) {
            message += `\n\n📝 *Notas:* ${orderNotes}`;
        }

        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        clearCart();
        closeCart();
        showToast('¡Pedido enviado!');
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
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-total">
                    <span>Total:</span>
                    <span id="cartTotal">${total.toLocaleString()}</span>
                </div>

                <button className="btn-whatsapp" onClick={sendToWhatsApp}>
                    <span>💬</span> Enviar pedido por WhatsApp
                </button>
            </div>
        </div>
    );
}
