'use client';

import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function MenuItem({ id, name, emoji, description, price, image }) {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const handleAdd = () => {
        addToCart(name, price);
        showToast(`${name} añadido`);
    };

    return (
        <div className="menu-item-card" id={id}>
            <img
                className="menu-item-img"
                src={image}
                alt={name}
            />
            <div className="menu-item-content">
                <div className="menu-item-info">
                    <h4 className="item-name">{emoji} {name}</h4>
                    <p className="item-description">{description}</p>
                </div>
                <div className="menu-item-action">
                    <span className="item-price">${price.toLocaleString()}</span>
                    <button className="btn-add" onClick={handleAdd}>
                        <span>+</span> Añadir
                    </button>
                </div>
            </div>
        </div>
    );
}
