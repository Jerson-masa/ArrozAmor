import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const { data: menuItems, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('id', { ascending: true }); // Opcional, o algún orden

        if (error) {
            throw error;
        }

        return NextResponse.json({ menuItems });
    } catch (error) {
        console.error('Error fetching menu:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
