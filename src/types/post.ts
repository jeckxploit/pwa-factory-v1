export interface Post {
    id: string;
    title: string;
    content: string;
    status: 'draft' | 'published';
    user_id: string;
    created_at: string;
}
