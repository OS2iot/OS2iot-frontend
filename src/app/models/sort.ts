export type SortDir = 'ASC' | 'DESC';
export type SortCol = 'createdAt' | 'updatedAt' | 'name';

export interface Sort {
    id: number;
    dir: SortDir;
    col: SortCol;
    label: string;
}