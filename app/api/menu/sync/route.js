import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request) {
    try {
        const { menuItems } = await request.json();

        if (!menuItems || !Array.isArray(menuItems)) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        // 1. Save to Supabase
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            );

            // Fetch current items from Supabase to find what to delete
            const { data: currentItems, error: fetchError } = await supabase
                .from('menu_items')
                .select('id');
            
            if (!fetchError && currentItems) {
                const newIds = menuItems.map(item => item.id);
                const itemsToDelete = currentItems.filter(item => !newIds.includes(item.id)).map(item => item.id);
                
                // Delete removed items
                if (itemsToDelete.length > 0) {
                    await supabase.from('menu_items').delete().in('id', itemsToDelete);
                }
            }

            // Upsert new and existing items
            const { error: upsertError } = await supabase
                .from('menu_items')
                .upsert(menuItems, { onConflict: 'id' });

            if (upsertError) {
                console.error('Error saving to Supabase:', upsertError);
            }
        }

        // 2. Save menu.json to Cloudflare R2
        if (
            process.env.R2_ACCOUNT_ID &&
            process.env.R2_ACCESS_KEY_ID &&
            process.env.R2_SECRET_ACCESS_KEY &&
            process.env.R2_BUCKET_NAME
        ) {
            const s3Client = new S3Client({
                region: 'auto',
                endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
                credentials: {
                    accessKeyId: process.env.R2_ACCESS_KEY_ID,
                    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
                },
            });

            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: 'menu.json',
                Body: JSON.stringify(menuItems),
                ContentType: 'application/json',
                CacheControl: 'no-cache', // Ensure people see new dish immediately
            });

            await s3Client.send(command);
        }

        return NextResponse.json({ success: true, message: 'Menú sincronizado exitosamente.' });
    } catch (error) {
        console.error('Sync Error:', error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}
