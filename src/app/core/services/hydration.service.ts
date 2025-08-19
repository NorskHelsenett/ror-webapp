import { Injectable, ApplicationRef, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HydrationService {
  private hydrationComplete = new BehaviorSubject<boolean>(false);

  constructor(
    private applicationRef: ApplicationRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeHydrationDetection();
    } else {
      // On server, mark as complete immediately
      this.hydrationComplete.next(true);
    }
  }

  get isHydrationComplete$(): Observable<boolean> {
    return this.hydrationComplete.asObservable();
  }

  get isHydrationComplete(): boolean {
    return this.hydrationComplete.value;
  }

  /**
   * Returns an observable that emits when hydration is complete
   */
  whenHydrationComplete(): Observable<boolean> {
    return this.hydrationComplete.pipe(
      filter((complete) => complete),
      take(1),
    );
  }

  /**
   * Executes a callback after hydration is complete, optionally with a delay
   */
  afterHydration(callback: () => void, delay: number = 0): void {
    this.whenHydrationComplete()
      .pipe(switchMap(() => (delay > 0 ? timer(delay) : timer(0))))
      .subscribe(() => {
        this.ngZone.runOutsideAngular(callback);
      });
  }

  private initializeHydrationDetection(): void {
    // Wait for Angular to become stable
    this.applicationRef.isStable
      .pipe(
        filter((stable) => stable),
        take(1),
      )
      .subscribe(() => {
        // Add a small delay to ensure hydration is truly complete
        timer(500).subscribe(() => {
          this.hydrationComplete.next(true);
        });
      });
  }
}
