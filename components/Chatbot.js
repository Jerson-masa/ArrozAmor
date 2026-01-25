'use client';

import { useState, useEffect } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Initial greeting with typing effect
            setTimeout(() => {
                setMessages([
                    { type: 'bot', text: '¡Hola! 👋 Soy el asistente de Arroz Amor' }
                ]);
            }, 300);
            setTimeout(() => {
                setMessages(prev => [...prev,
                { type: 'bot', text: '¿Qué te gustaría hacer hoy?' }
                ]);
                setShowOptions(true);
            }, 1000);
        }
    }, [isOpen, messages.length]);

    const handleOption = (option) => {
        switch (option) {
            case 'menu':
                setMessages(prev => [...prev,
                { type: 'user', text: '🍚 Ver menú' },
                { type: 'bot', text: '¡Claro! Te llevo al menú... 🍛' }
                ]);
                setTimeout(() => {
                    const menuSection = document.getElementById('menu-section');
                    if (menuSection) {
                        menuSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsOpen(false);
                }, 1000);
                break;
            case 'location':
                setMessages(prev => [...prev,
                { type: 'user', text: '📍 Cómo llegar' },
                { type: 'bot', text: '¡Te esperamos en Riohacha! 🏪' },
                { type: 'bot', text: 'Abriendo Google Maps...' }
                ]);
                setTimeout(() => {
                    window.open('https://maps.app.goo.gl/575iF12ogpKgKcz87', '_blank');
                }, 1500);
                break;
            case 'reset':
                setMessages([]);
                setShowOptions(false);
                setTimeout(() => {
                    setMessages([
                        { type: 'bot', text: '¡Hola de nuevo! 👋' }
                    ]);
                }, 300);
                setTimeout(() => {
                    setMessages(prev => [...prev,
                    { type: 'bot', text: '¿En qué más puedo ayudarte?' }
                    ]);
                    setShowOptions(true);
                }, 800);
                break;
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className={`chatbot-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir chat"
            >
                {isOpen ? '✕' : <img src="/lobster-chef-v2.png" alt="Chat" className="chatbot-icon-img" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-avatar">
                            <img src="/lobster-chef-v2.png" alt="Chef Avatar" className="chatbot-avatar-img" />
                        </div>
                        <div className="chatbot-info">
                            <h4>Arroz Amor</h4>
                            <span className="chatbot-status">En línea</span>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${msg.type}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {showOptions && (
                        <div className="chatbot-options">
                            <button
                                className="chatbot-option"
                                onClick={() => handleOption('menu')}
                            >
                                🍚 Ver menú
                            </button>
                            <button
                                className="chatbot-option"
                                onClick={() => handleOption('location')}
                            >
                                📍 Cómo llegar
                            </button>
                            <button
                                className="chatbot-option reset"
                                onClick={() => handleOption('reset')}
                            >
                                🔄 Empezar de nuevo
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
