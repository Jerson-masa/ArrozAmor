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
        <div style={{ marginTop: '15px' }}>
            <h3 className="form-title" style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px' }}>📱 Datos del domicilio</h3>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <label htmlFor="customerName" style={{ fontSize: '0.85rem' }}>Tu nombre (opcional)</label>
                <input
                    type="text"
                    id="customerName"
                    placeholder="Ej: María"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <label htmlFor="customerPhone" style={{ fontSize: '0.85rem' }}>Tu teléfono (para contacto)</label>
                <input
                    type="tel"
                    id="customerPhone"
                    placeholder="Ej: 3001234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <label htmlFor="customerAddress" style={{ fontSize: '0.85rem' }}>Tu dirección (para el envío)</label>
                <input
                    type="text"
                    id="customerAddress"
                    placeholder="Ej: Calle 1 #2-3 Barrio Centro"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '10px' }}>
                <label htmlFor="orderNotes" style={{ fontSize: '0.85rem' }}>Agrega detalles de tu ubicación</label>
                <input
                    type="text"
                    id="orderNotes"
                    placeholder="Ej: Al frente de la tienda Éxito..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
            </div>
        </div>
    );
}
