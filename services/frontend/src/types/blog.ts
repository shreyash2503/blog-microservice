export interface Blog {
    id: number;
    title: string;
    author: string;
    content: string;
    is_paid?: boolean;
    cover_image: string;
    category_id: number;
    created_at?: string;
    last_modified_at?: string
}