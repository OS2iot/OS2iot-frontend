import { Pipe, PipeTransform } from '@angular/core';
import { PermissionResponse } from '@app/admin/permission/permission.model';

@Pipe({
  name: 'uniquePermissionOrganizations',
})
export class UniquePermissionOrganizationsPipe implements PipeTransform {
  transform(
    value: PermissionResponse[],
    ..._: unknown[]
  ): PermissionResponse[] {
    // Ensure that no element appears twice. Orders it so that the duplicate (second match) takes priority
    const uniqueArr = Array.from(
      new Map(value.map((item) => [item.organization?.id, item])).values()
    );

    return uniqueArr;
  }
}
