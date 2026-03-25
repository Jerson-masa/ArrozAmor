import { NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

export async function POST(request) {
    try {
        const { menuItems } = await request.json();

        if (!menuItems || !Array.isArray(menuItems)) {
            return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
        }

        const store = getStore('arroz-amor');
        await store.setJSON('menu_items', menuItems);

        return NextResponse.json({ success: true, message: 'Menú sincronizado exitosamente.' });
    } catch (error) {
        console.error('Sync Error:', error);
        return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
    }
}
