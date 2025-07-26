import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
    'https://xyzcompany.supabase.co', // URL
    'public-anon-key' // KEY
)
