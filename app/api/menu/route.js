import { NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

export async function GET() {
    try {
        const store = getStore('arroz-amor');
        const menuItems = await store.get('menu_items', { type: 'json' });

        if (menuItems && menuItems.length > 0) {
            return NextResponse.json({ menuItems });
        }

        // Return empty if no data saved yet
        return NextResponse.json({ menuItems: [] });
    } catch (error) {
        console.error('Error fetching menu:', error);
        // If blobs not available (local dev), return empty
        return NextResponse.json({ menuItems: [] });
    }
}
