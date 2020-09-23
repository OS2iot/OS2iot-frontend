import { Pipe, PipeTransform } from '@angular/core';
import {
  PermissionResponse,
  PermissionType,
} from '@app/admin/permission/permission.model';

@Pipe({
  name: 'isGlobalAdmin',
})
export class isGlobalAdminPipe implements PipeTransform {
  transform(value: PermissionResponse[], ...args: any[]): any {
    return value.some((x) => x.type == PermissionType.GlobalAdmin);
  }
}
