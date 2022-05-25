import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { MeService } from '@shared/services/me.service';

@Pipe({
  name: 'canEditApplication',
})
export class CanEditApplicationPipe implements PipeTransform {
  constructor(private meService: MeService) {}

  transform(id: number | undefined): boolean {
    return this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      id
    );
  }
}
