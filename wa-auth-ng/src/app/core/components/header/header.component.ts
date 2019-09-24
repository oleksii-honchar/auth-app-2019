import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Version } from '@app/core/interfaces';
import { VersionService } from '@app/core/services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  serviceVersion: Version = this.versionService.version;

  constructor(private versionService: VersionService) {}

  ngOnInit() {
    console.log(this.serviceVersion);
  }
}
