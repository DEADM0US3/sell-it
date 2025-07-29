import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_URL, // URL
    import.meta.env.VITE_SUPABASE_KEY // KEY
)
