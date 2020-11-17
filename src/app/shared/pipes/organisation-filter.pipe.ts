import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'organisationFilter'
})
export class OrganisationFilterPipe implements PipeTransform {

  transform(value: string, keyName: string, parentId: any,): string {
    return _.filter(value, (o) => {
      return o[keyName] === +parentId;
    });
  }

}
