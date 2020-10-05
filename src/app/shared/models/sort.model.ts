export type SortDir = 'ASC' | 'DESC';
export type SortCol = 'active' | 'updatedAt' | 'name';

export interface Sort {
    id: number;
    dir: SortDir;
    col: SortCol;
    label: string;
}