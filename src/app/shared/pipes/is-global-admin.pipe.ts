import { Pipe, PipeTransform } from '@angular/core';
import {
  PermissionResponse,
  PermissionType,
} from '@app/admin/permission/permission.model';

@Pipe({
  name: 'isGlobalAdmin',
})
export class IsGlobalAdminPipe implements PipeTransform {
  transform(value: PermissionResponse[], ...args: any[]): any {
    return value?.some(({ type: response }) =>
      response.some(({ type }) => type === PermissionType.GlobalAdmin)
    );
  }
}
