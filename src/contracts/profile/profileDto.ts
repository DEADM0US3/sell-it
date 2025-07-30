export interface ProfileDto{
    id: string,
    full_name: string,
    avatar_url: string,
    role: string,
    preferences: JSON,
    created_at: string
}