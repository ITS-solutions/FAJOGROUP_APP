export interface User {
    id: number;
    name: string;
    lastname: string;
    identification: string;
    phone_number: string;
    address: string | null;
    email: string;
    email_verified_at: string | null;
    type_identification_id: number;
    created_at: string;
    updated_at: string;
}
