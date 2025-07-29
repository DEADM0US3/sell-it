import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://fojxkhpfaywvsyxpgipe.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvanhraHBmYXl3dnN5eHBnaXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTY1MjksImV4cCI6MjA2ODk5MjUyOX0.a4ugvR-smWLlG72sURDSraajq8P6nS20mKnF6crb6GY"

export const supabaseClient = createClient(
    SUPABASE_URL, // URL
    SUPABASE_KEY // KEY
)
