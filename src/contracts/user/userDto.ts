export interface UserDto {
    id: string; // UUID from Supabase Auth
    full_name: string | null;
    avatar_url: string | null;
    role: 'buyer' | 'seller';
    preferences?: Record<string, unknown>;
    created_at: string;
}
