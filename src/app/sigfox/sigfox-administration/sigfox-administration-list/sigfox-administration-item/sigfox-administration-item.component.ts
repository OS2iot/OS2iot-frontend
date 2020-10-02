import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SigFoxGroup } from '@app/sigfox/sigfox-group.model';

@Component({
  selector: 'app-sigfox-administration-item',
  templateUrl: './sigfox-administration-item.component.html',
  styleUrls: ['./sigfox-administration-item.component.scss']
})
export class SigfoxAdministrationItemComponent implements OnInit {

  @Input() sigfoxGroup: SigFoxGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onEditServiceProfile() {
    this.router.navigate([this.sigfoxGroup.id, 'edit'], { relativeTo: this.route });
  }

}
