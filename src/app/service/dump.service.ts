import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Host } from '../modules/common.module';
import { Observable, of } from 'rxjs';
import { catchError, map, concatAll } from 'rxjs/operators';

const AllowDumpUrl = Host + '/api/dump/allow';

@Injectable({
  providedIn: 'root'
})
export class DumpService {

  constructor(private http: HttpClient) { }

  public dumpStatus(): Observable<DumpStatus> {
    return this.http.get <Response<DumpStatus>>(AllowDumpUrl)
    .pipe(
      catchError(this.handleError('getCache', {
        code: 1,
        message: '',
        data: {allow_dump: false, allow_mitm: false}
      }))
    ).pipe(
      map(resp => (resp as Response<DumpStatus>).data)
    );
  }

  public allowDump(allow: boolean): Observable<DumpStatus> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this.http.post <Response<DumpStatus>>(AllowDumpUrl, 'allow_dump=' + allow, {headers})
    .pipe(
      catchError(this.handleError('getCache', {
        code: 1,
        message: '',
        data: {allow_dump: false, allow_mitm: false}
      }))
    ).pipe(
      map(resp => (resp as Response<DumpStatus>).data)
    );
  }

  public allowMitm(allow: boolean): Observable<DumpStatus> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this.http.post <Response<DumpStatus>>(AllowDumpUrl, 'allow_mitm=' + allow, {headers})
    .pipe(
      catchError(this.handleError('getCache', {
        code: 1,
        message: '',
        data: {allow_dump: false, allow_mitm: false}
      }))
    ).pipe(
      map(resp => (resp as Response<DumpStatus>).data)
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

class DumpStatus {
  allow_dump: boolean;
  allow_mitm: boolean;
}
