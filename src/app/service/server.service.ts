import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Host } from '../modules/common.module';
import { ServerGroupModule } from '../modules/server/server.module';
import { Observable, of } from 'rxjs';
import { catchError, map, concatAll } from 'rxjs/operators';

const ServersUrl = Host + '/api/servers';
const SelectServerUrl = Host + '/api/server/select';
const RefreshSelectUrl = Host + '/api/server/select/refresh';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(
    private http: HttpClient,
  ) { }

  public getServers(): Observable<ServerGroupModule[]> {
    return this.http.get<Response<ServerGroupModule[]>>(ServersUrl)
    .pipe(
      catchError(this.handleError('getServers', {
        code: 1,
        message: '',
        data: [],
      }))
    ).pipe(
      map(resp => (resp as Response<ServerGroupModule[]>).data)
    );
  }

  public selectServer(group: string, server: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this.http.post <Response<any>>(SelectServerUrl, 'group=' + group + '&server=' + server, {headers})
    .pipe(
      catchError(this.handleError('selectServer', {
        code: 1,
        message: '',
        data: {}
      }))
    ).pipe(
      map(resp => (resp as Response<any>).data)
    );
  }

  public refleshSelect(group: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this.http.post <Response<any>>(RefreshSelectUrl, 'group=' + group, {headers})
    .pipe(
      catchError(this.handleError('refleshSelect', {
        code: 1,
        message: '',
        data: {}
      }))
    ).pipe(
      map(resp => (resp as Response<any>).data)
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
