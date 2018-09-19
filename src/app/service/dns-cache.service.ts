import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Host } from '../modules/common.module';
import { DnsCacheModule } from '../modules/dns-cache.module';
import { Observable, of } from 'rxjs';
import { catchError, map, concatAll } from 'rxjs/operators';

const DnsCacheUrl = Host + '/api/dns';

@Injectable({
  providedIn: 'root'
})
export class DnsCacheService {
  constructor(
    private http: HttpClient,
  ) { }

  public getCache(): Observable<DnsCacheModule[]> {
    return this.http.get<Response<DnsCacheModule[]>>(DnsCacheUrl)
    .pipe(
      catchError(this.handleError('getCache', {
        code: 1,
        message: '',
        data: [],
      }))
    ).pipe(
      map(resp => (resp as Response<DnsCacheModule[]>).data)
    );
  }

  public clearCache(): Observable<any> {
    return this.http.delete(DnsCacheUrl).pipe(
      catchError(this.handleError('getCache', {
        code: 1,
        message: '',
        data: [],
      }))
    ).pipe(
      map(
        resp => {
          const r = (resp as Response<any> );
          if (r.code === 1) {
            console.error(r.message);
          }
          return 1;
        }
      )
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


