'use client';

import { useCart } from '@/context/CartContext';

export default function OrderForm() {
    const { customerName, setCustomerName, orderNotes, setOrderNotes } = useCart();

    return (
        <section className="order-form">
            <div className="form-card">
                <h3 className="form-title">📱 Datos del pedido</h3>
                <div className="form-group">
                    <label htmlFor="customerName">Tu nombre (opcional)</label>
                    <input
                        type="text"
                        id="customerName"
                        placeholder="Ej: María"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="orderNotes">Notas adicionales</label>
                    <input
                        type="text"
                        id="orderNotes"
                        placeholder="Ej: Sin cebolla, para llevar..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
}
