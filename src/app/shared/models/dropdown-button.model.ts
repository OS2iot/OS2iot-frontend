import { PermissionType } from "@app/admin/permission/permission.model";

export interface ExtraDropdownOption {
  id: string | number;
  label: string;
}

export interface DropdownButton {
    label: string;
    editRouterLink: string | string[];
    isErasable: boolean;
    /**
     * Show extra dropdown options
     *
     * **NB**: This interface does not scale well. It doesn't work for generic options and it's used in many components.
     *
     * By representing any new options in a separate property, this avoids changes in all dependent components and thus merge conflicts.
     */
    extraOptions?: ExtraDropdownOption[];
}
