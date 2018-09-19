import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Host } from '../modules/common.module';
import { RecordsModule, DumpModule } from '../modules/records/records.module';
import { Observable, of } from 'rxjs';
import { catchError, map, concatAll } from 'rxjs/operators';
import { UTF8 } from '../utils/utils';

const RecordsUrl = Host + '/api/records';
const DumpDataUrl = Host + '/api/dump/data/';
const utf8 = new UTF8();

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor(
    private http: HttpClient,
  ) { }

  public getCache(): Observable<RecordsModule[]> {
    return this.http.get<Response<RecordsModule[]>>(RecordsUrl)
    .pipe(
      catchError(this.handleError('getCache', {
        code: 1,
        message: '',
        data: [],
      }))
    ).pipe(
      map(resp => (resp as Response<RecordsModule[]>).data)
    );
  }

  public clearCache(): Observable<any> {
    return this.http.delete(RecordsUrl).pipe(
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

  public getDumpData(id: string): Observable<DumpModule> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(DumpDataUrl + id, {headers}).pipe(
      catchError(this.handleError('getDumpData', {
        code: 1,
        message: '',
        data: {},
      }))
    ).pipe(
      map(
        resp => {
          const r = (resp as Response<DumpModule> );
          if (r.code === 1) {
            console.error(r.message);
          }
          const dump = new DumpModule();
          if (r.data.ReqHeader !== '') {
            dump.ReqHeader = utf8.decode(atob(r.data.ReqHeader));
          }
          if (r.data.ReqBody !== '') {
            dump.ReqBody = utf8.decode(atob(r.data.ReqBody));
          }
          if (r.data.RespHeader !== '') {
            dump.RespHeader = utf8.decode(atob(r.data.RespHeader));
          }
          if (r.data.RespBody !== '') {
            dump.RespBody = utf8.decode(atob(r.data.RespBody));
          }
          return dump;
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
