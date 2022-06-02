import { Pipe, PipeTransform } from '@angular/core';
import { PermissionTypes } from '@app/admin/permission/permission.model';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translatePermissions',
})
export class TranslatePermissionsPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(permissions: PermissionTypes[] | undefined): string {
    const formattedPermissions = permissions
      .map(({ type }) => this.translate.instant('PERMISSION-TYPE.' + type))
      .sort()
      .join(', ');

    return formattedPermissions;
  }
}
