import { Pipe, PipeTransform } from "@angular/core";
import { PermissionResponse, PermissionType } from "@app/admin/permission/permission.model";

@Pipe({
    name: "isGlobalAdmin",
    standalone: false
})
export class IsGlobalAdminPipe implements PipeTransform {
  transform(value: PermissionResponse[], ...args: any[]): boolean {
    const res = value?.some(({ type: response }) =>
      response?.some(pmTypes => pmTypes.type === PermissionType.GlobalAdmin)
    );

    return res;
  }
}
