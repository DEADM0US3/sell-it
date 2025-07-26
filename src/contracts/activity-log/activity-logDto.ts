export interface ActivityLogDto {
    id: string;
    user_id: string;
    action: string;
    metadata?: Record<string, undefined>;
    created_at: string;
}