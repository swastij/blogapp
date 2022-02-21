import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  // loggedIn = false;
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor( private http : HttpClient) { }
  register(user : {username: string, email: string, password: string}){
    return this.http.post<any>('http://localhost:1337/api/auth/local/register',
     user, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  login(user : {identifier: string, password: string}){
    return this.http.post<any>('http://localhost:1337/api/auth/local',
     user, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  loggedIn(): boolean{
    return localStorage.getItem('user')?true:false;
  }
}
