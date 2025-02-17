export interface TableColumn {
  id: string;
  display: string;
  default: boolean;
  toggleable: boolean;
  sort?: "asc" | "desc";
}
