'use client';

import { useCart } from '@/context/CartContext';

export default function OrderForm() {
    const { 
        customerName, setCustomerName, 
        customerPhone, setCustomerPhone,
        customerAddress, setCustomerAddress,
        orderNotes, setOrderNotes 
    } = useCart();

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
                    <label htmlFor="customerPhone">Tu teléfono (para el domicilio)</label>
                    <input
                        type="tel"
                        id="customerPhone"
                        placeholder="Ej: 3001234567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customerAddress">Tu dirección (para el envío)</label>
                    <input
                        type="text"
                        id="customerAddress"
                        placeholder="Ej: Calle 1 #2-3 Barrio Centro"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
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
