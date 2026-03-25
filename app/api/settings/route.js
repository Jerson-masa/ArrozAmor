import { NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

// GET: Read settings (WhatsApp, address) from Netlify Blobs
export async function GET() {
    try {
        const store = getStore('arroz-amor');
        const settings = await store.get('settings', { type: 'json' });

        return NextResponse.json({
            whatsapp_number: settings?.whatsapp_number || '',
            restaurant_address: settings?.restaurant_address || ''
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({
            whatsapp_number: '',
            restaurant_address: ''
        });
    }
}

// POST: Save settings to Netlify Blobs
export async function POST(request) {
    try {
        const { whatsapp_number, restaurant_address } = await request.json();

        const store = getStore('arroz-amor');
        
        // Read current settings and merge
        let currentSettings = {};
        try {
            currentSettings = await store.get('settings', { type: 'json' }) || {};
        } catch (e) {
            // No existing settings, start fresh
        }

        const updatedSettings = {
            ...currentSettings,
            ...(whatsapp_number !== undefined && { whatsapp_number }),
            ...(restaurant_address !== undefined && { restaurant_address }),
            updated_at: new Date().toISOString()
        };

        await store.setJSON('settings', updatedSettings);

        return NextResponse.json({ success: true, message: 'Configuración guardada.' });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
    }
}
