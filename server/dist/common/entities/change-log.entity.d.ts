export declare class ChangeLog {
    id: number;
    table_name: string;
    action: string;
    row_id?: number;
    old_value?: string;
    new_value?: string;
    changed_at: Date;
}
