import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  template: '',
})
export class ExternalRedirectComponent implements OnInit {
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const url = this.route.snapshot.data['externalUrl'];
    if (url) {
      window.location.href = url;
    }
  }
}
