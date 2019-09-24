import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Version } from '@app/core/interfaces';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  serviceVersion: Version = this.route.snapshot.data.todos;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }

}
