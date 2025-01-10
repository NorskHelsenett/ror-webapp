import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchError, finalize, Observable, share, tap } from 'rxjs';
import { AboutService } from '../core/services/apihealthcheck.service';
import { environment } from '../../environments/environment';
import { Version } from '../core/models/version';
import { VersionService } from '../core/services/version.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  appVersion = environment.appVersion;
  commit = environment.commit;

  health$: Observable<any> | undefined;
  healthError: any;

  version$: Observable<any>;
  version: Version | undefined;
  versionError: any;

  constructor(
    private aboutService: AboutService,
    private versionService: VersionService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.healthError = undefined;
    this.health$ = this.aboutService.getHealth().pipe(
      share(),
      catchError((error) => {
        this.healthError = error;
        return error;
      }),
      finalize(() => {
        this.changeDetector.detectChanges();
      }),
    );

    this.version$ = this.versionService.getVersion().pipe(
      share(),
      tap((data: any) => {
        this.version = {
          version: data?.Version,
          commit: data?.Commit,
          libVer: data?.LibVer,
        };
      }),
      catchError((error) => {
        this.versionError = error;
        return error;
      }),
      finalize(() => {
        this.changeDetector.detectChanges();
      }),
    );
  }
}
