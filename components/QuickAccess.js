export default function QuickAccess() {
    const items = [
        { href: '#arroz-mixto', image: '/images/arroz-mixto.webp', label: 'Arroz Mixto' },
        { href: '#arroz-camaron', image: '/images/arroz-camaron.webp', label: 'Arroz con Camarón' },
        { href: '#arroz-cerdo', image: '/images/arroz-cerdo.webp', label: 'Arroz con Cerdo' },
        { href: '#cazuela', image: '/images/cazuela.webp', label: 'Cazuela' }
    ];

    return (
        <section className="quick-access">
            <div className="quick-cards">
                {items.map((item, index) => (
                    <a key={index} href={item.href} className="quick-card">
                        <img src={item.image} alt={item.label} className="quick-img" />
                        <span className="quick-label">{item.label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
