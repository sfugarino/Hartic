import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { CountDown } from '../models/count-down';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountDownService {

  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'countdown';

  }


  start(): Observable<CountDown> {
    return this.http.post<CountDown>(this.apiUrl, null, { headers: this.headers });
  }

  stop(countDownId: number): void {
    this.http.put<string>(this.apiUrl, countDownId)
      .pipe(take(1))
      .subscribe();
  }
}
