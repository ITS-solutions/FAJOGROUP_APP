export interface Lottery {
    id: number;
    name: string;
    imageUrl?: string;
}

export interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface LotteryGetAllResponse {
    status: string;
    message: string | null;
    data: PaginatedResponse<Lottery>;
}
