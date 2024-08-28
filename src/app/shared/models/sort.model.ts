export type SortDir = "ASC" | "DESC" | "asc" | "desc" | "";
export type SortCol = "active" | "updatedAt" | "name" | "createdAt" | string;

export interface Sort {
    id: number;
    dir: SortDir;
    col: SortCol;
    label: string;
}
