import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile-raw',
  templateUrl: './userprofile-raw.component.html',
  styleUrls: ['./userprofile-raw.component.scss'],
  standalone: false,
})
export class UserprofileRawComponent implements OnInit {
  @Input()
  authHeaders: any;

  @Input()
  claims: any;

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
