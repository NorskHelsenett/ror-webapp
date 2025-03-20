import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-userprofile-raw',
  templateUrl: './userprofile-raw.component.html',
  styleUrls: ['./userprofile-raw.component.scss'],
  imports: [TranslateModule, JsonPipe],
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
