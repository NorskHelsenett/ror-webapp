import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { AclV2 } from '../../../core/models/aclv2';
import { AclService } from '../../../core/services/acl.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AclCreateUpdateComponent } from '../../component';

@Component({
  selector: 'app-acl-create-update-page',
  templateUrl: './acl-create-update.component.html',
  styleUrls: ['./acl-create-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, AclCreateUpdateComponent],
})
export class AclCreateUpdatePageComponent implements OnInit, OnDestroy {
  id: string;
  acl: AclV2;
  fetchError: any;

  private subscriptions = new Subscription();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private aclService: AclService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((param) => {
        this.id = param?.['id'];
        if (this.id) {
          this.fetch();
          this.changeDetector.detectChanges();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetch(): void {
    this.fetchError = undefined;
    this.subscriptions.add(
      this.aclService
        .getById(this.id)
        .pipe(
          catchError((error: any) => {
            this.fetchError = error;
            this.changeDetector.detectChanges();
            throw error;
          }),
        )
        .subscribe((acl: AclV2) => {
          this.acl = acl;
          this.changeDetector.detectChanges();
        }),
    );
  }
}
