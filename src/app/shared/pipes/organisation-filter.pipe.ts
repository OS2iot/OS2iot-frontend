import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'organisationFilter'
})
export class OrganisationFilterPipe implements PipeTransform {

  transform(items: any[], term): any {
    console.log('term', term);

    return term
      ? items.filter(item => item.name.indexOf(term) !== -1)
      : items;
  }

}
