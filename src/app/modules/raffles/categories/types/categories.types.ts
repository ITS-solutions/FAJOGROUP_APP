export interface Category {
    id?: number;
    name: string;
    description: string;
    status: number;
    icon: string;
    created_at?: string;
    updated_at?: string;
}

export interface CategoryResponse {
    status: string;
    message: string | null;
    data: {
        current_page: number;
        data: Category[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: any[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    }
}
