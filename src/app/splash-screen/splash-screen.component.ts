import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ApplicationRef,
  ChangeDetectionStrategy, ViewEncapsulation,
} from '@angular/core';
import { PwaService } from '../pwa.service';
import {
  trigger,
  transition,
  query,
  animateChild,
  animate,
  style,
} from '@angular/animations';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        query(':leave', animateChild(), { optional: true }),
        animate(100, style({ opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashScreenComponent implements OnInit {

  showSplash = true;

  constructor(
    private pwaService: PwaService,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.pwaService.checkForUpdate().subscribe((result) => {
      this.showSplash = result;
      this.cdr.detectChanges();
    });
  }

}


