// ===== Cart State =====
let cart = [];
let selectedCazuelaPrice = 10000;

// ===== WhatsApp Configuration =====
const WHATSAPP_NUMBER = '573001234567'; // Cambiar por el número real

// ===== Cart Functions =====
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    showToast(`${name} añadido`);
}

function addCazuela() {
    const size = selectedCazuelaPrice === 10000 ? 'Pequeña' : 'Grande';
    cart.push({
        name: `Cazuela de mariscos (${size})`,
        price: selectedCazuelaPrice
    });
    updateCartUI();
    showToast('Cazuela añadida');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function selectSize(btn, price) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedCazuelaPrice = price;
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge
    badge.textContent = cart.length;
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 300);

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Tu canasta está vacía</div>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">🗑️</button>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total.toLocaleString()}`;
}

// ===== Cart Modal =====
function openCart() {
    document.getElementById('cartModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close cart on overlay click
document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') {
        closeCart();
    }
});

// ===== WhatsApp Integration =====
function sendToWhatsApp() {
    if (cart.length === 0) {
        showToast('Añade productos primero');
        return;
    }

    const customerName = document.getElementById('customerName').value.trim();
    const orderNotes = document.getElementById('orderNotes').value.trim();

    let message = '🍚 *NUEVO PEDIDO - Arroces del Barrio*\n\n';

    if (customerName) {
        message += `👤 *Cliente:* ${customerName}\n\n`;
    }

    message += '*📋 Pedido:*\n';
    cart.forEach(item => {
        message += `• ${item.name} - $${item.price.toLocaleString()}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\n💰 *Total: $${total.toLocaleString()}*`;

    if (orderNotes) {
        message += `\n\n📝 *Notas:* ${orderNotes}`;
    }

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    // Clear cart after sending
    cart = [];
    updateCartUI();
    closeCart();
    showToast('¡Pedido enviado!');
}

// ===== Toast Notifications =====
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);

    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===== PWA Install =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'flex';
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            showToast('¡App instalada!');
        }
        deferredPrompt = null;
    } else {
        showToast('Abre en Chrome para instalar');
    }
});

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registrado'))
            .catch(err => console.log('SW error:', err));
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
