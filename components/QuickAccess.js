export default function QuickAccess() {
    const items = [
        { href: '#arroz-mixto', icon: '🍛', label: 'Arroz Mixto' },
        { href: '#arroz-camaron', icon: '🦐', label: 'Arroz Camarón' },
        { href: '#arroz-cerdo', icon: '🥓', label: 'Arroz Cerdo' },
        { href: '#cazuela', icon: '🦞', label: 'Cazuela' }
    ];

    return (
        <section className="quick-access">
            <div className="quick-cards">
                {items.map((item, index) => (
                    <a key={index} href={item.href} className="quick-card">
                        <span className="quick-icon">{item.icon}</span>
                        <span className="quick-label">{item.label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
