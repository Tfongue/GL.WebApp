import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private rootUrl: string = 'https://localhost:7008/calculator';

  constructor(private http: HttpClient) { }

  performAddition(start: number, amount: number): Observable<number> {
    const url = `${this.rootUrl}/add/start/${start}/amount/${amount}`;
    return this.http.get<number>(url).pipe(
      map((response => {
        console.log(response)
        return response;
      }))
    );
  }

  performSubtraction(start: number, amount: number): Observable<number> {
    const url = `${this.rootUrl}/subtract/start/${start}/amount/${amount}`;
    return this.http.get<number>(url).pipe(
      map((response => {
        console.log(response)
        return response;
      }))
    );
  }

}
