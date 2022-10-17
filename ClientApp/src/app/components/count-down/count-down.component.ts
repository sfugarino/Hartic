import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators'
import { CountDown } from '../../models/count-down';
import { CountDownService } from '../../services/count-down.service';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {

  public timeDifference: number = 0;
  public seconds: number = 0;
  public minutes: number = 0;
  public hours: number = 0;
  public days: number = 0;

  public isRunning: boolean = false;
  public countDownSubscription: Subscription | undefined;
  public timer: Subscription | undefined;
  public currentCountDownId: number = 0;

  constructor(private countDownService: CountDownService) { }

  ngOnInit(): void {
  }

  startStop() {
    if (this.isRunning) {
      this.complete();
    }
    else {
      this.isRunning = true;
      this.countDownSubscription = this.countDownService.start()
        .pipe(take(1))
        .subscribe(data => {
          this.setTimerUI(data.duration);
          this.currentCountDownId = data.countDownId;
        this.startTimer();
      });
    }
  }

  setTimerUI(totalSeconds: number) {
    this.seconds = Math.floor(totalSeconds % 60);
    this.minutes = Math.floor((totalSeconds % 3600) / 60);
    this.hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    this.days = Math.floor(totalSeconds / (3600 * 24));
    this.isRunning = true;
  }

  resetTimerUI() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.days = 0;
  }

  startTimer() {
    this.timer = interval(1000)
      .pipe(takeWhile(() => this.getTotalSecond() > 0))
      .subscribe({
        next: () => this.increment(),
        error: () => this.handleError(),
        complete: () => this.complete()
      });
  }

  private increment() : void {
    var totalSeconds = this.getTotalSecond() - 1;
    this.setTimerUI(totalSeconds);
    console.log('increment() : ' + totalSeconds.toString());
  }

  private handleError(): void {
    console.log('Error occurred');
    this.isRunning = false
  }

  private complete(): void {
    this.resetTimerUI();
    this.isRunning = false;
    this.countDownService.stop(this.currentCountDownId);
    console.log('Timer complete');
  }

  private getTotalSecond() : number {
    var sec = this.days * 3600 * 24;
    sec += this.hours * 3600;
    sec += this.minutes * 60;
    sec += this.seconds;
    return sec;
  }

  ngOnDestroy(): void {
    if (this.timer && !this.timer.closed) {
      this.timer.unsubscribe();
    }

    if (this.countDownSubscription && !this.countDownSubscription.closed) {
      this.countDownSubscription.unsubscribe();
    }
  }

}
