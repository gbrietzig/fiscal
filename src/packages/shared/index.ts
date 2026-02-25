export interface Deputy {
    id: number;
    name: string;
    party: string;
    state: string;
    photo_url: string;
    metadata?: {
        email?: string;
        legislatura?: number;
    };
}

export interface Expense {
    id: string;
    deputy_id: number;
    category: string;
    supplier_name: string;
    supplier_id: string;
    supplier_type: 1 | 2;
    net_value: number;
    glosed_value: number;
    issue_date: string;
    sync_source: 'api' | 'bulk';
}

export const SHARED_VERSION = '1.0.0';
