import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Host, Speed } from '../modules/common.module';
import { RecordsModule, DumpModule } from '../modules/records/records.module';
import { Observable, of } from 'rxjs';
import { catchError, map, concatAll } from 'rxjs/operators';

const shutdownUrl = Host + '/api/shutdown';
const reloadUrl = Host + '/api/reload';
const certUrl = Host + '/api/cert';
const modeUrl = Host + '/api/mode';
const speedUrl = Host + '/api/speed';
const mitmRulesUrl = Host + '/api/mitm/rules';
const enableSystemProxyUrl = Host + '/api/system/proxy/enable';
const disableSystemProxyUrl = Host + '/api/system/proxy/disable';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  public shutdown(): Observable<any> {
    return this.http.post <Response<any>>(shutdownUrl, {})
    .pipe(
      catchError(this.handleError('shutdown', {
        code: 1,
        message: '',
        data: {allow_dump: false, allow_mitm: false}
      }))
    ).pipe(
      map(resp => (resp as Response<any>).data)
    );
  }

  public reload(): Observable<any> {
    return this.http.post <Response<any>>(reloadUrl, {})
    .pipe(
      catchError(this.handleError('reload', {
        code: 1,
        message: '',
        data: {}
      }))
    ).pipe(
      map(resp => (resp as Response<any>).data)
    );
  }

  public generateCert(): Observable<any> {
    return this.http.post <Response<any>>(certUrl, {})
    .pipe(
      catchError(this.handleError('generateCert', {
        code: 1,
        message: '',
        data: {}
      }))
    ).pipe(
      map(resp => (resp as Response<any>).data)
    );
  }

  public downloadCert() {
    window.open(certUrl);
  }

  public getMode(): Observable<string> {
    return this.http.get <Response<any>>(modeUrl)
    .pipe(
      catchError(this.handleError('getMode', {
        code: 1,
        message: '',
        data: {}
      }))
    ).pipe(
      map(resp => (resp as Response<string>).data)
    );
  }

  public setMode(mode: string): Observable<string> {
    return this.http.post <Response<any>>(modeUrl + '/' + mode, {})
    .pipe(
      catchError(this.handleError('getMode', {
        code: 1,
        message: '',
        data: {}
      }))
    ).pipe(
      map(resp => (resp as Response<string>).data)
    );
  }

  public speed(): Observable<Speed> {
    return this.http.get <Response<Speed>>(speedUrl)
    .pipe(
      catchError(this.handleError('speed', {
        code: 1,
        message: '',
        data: {}
      }))
    ).pipe(
      map(resp => (resp as Response<Speed>).data)
    );
  }

  public getMitMRules(): Observable<string[]> {
    return this.http.get <Response<string[]>>(mitmRulesUrl)
    .pipe(
      catchError(this.handleError('getMitMRules', {
        code: 1,
        message: '',
        data: []
      }))
    ).pipe(
      map(resp => (resp as Response<string[]>).data)
    );
  }

  public appendMitMRules(domain: string): Observable<string[]> {
    return this.http.post <Response<string[]>>(mitmRulesUrl + '?domain=' + domain, {})
    .pipe(
      catchError(this.handleError('getMitMRules', {
        code: 1,
        message: '',
        data: []
      }))
    ).pipe(
      map(resp => (resp as Response<string[]>).data)
    );
  }

  public delMitMRules(domain: string): Observable<string[]> {
    return this.http.delete <Response<string[]>>(mitmRulesUrl + '?domain=' + domain)
    .pipe(
      catchError(this.handleError('getMitMRules', {
        code: 1,
        message: '',
        data: []
      }))
    ).pipe(
      map(resp => (resp as Response<string[]>).data)
    );
  }

  public enableSystemProxy(): Observable<any> {
    return this.http.get <Response<any>>(enableSystemProxyUrl)
    .pipe(
      catchError(this.handleError('enableSystemProxy', {
        code: 1,
        message: '',
        data: []
      }))
    ).pipe(
      map(resp => (resp as Response<any>).data)
    );
  }

  public disableSystemProxy(): Observable<any> {
    return this.http.get <Response<any>>(disableSystemProxyUrl)
    .pipe(
      catchError(this.handleError('disableSystemProxy', {
        code: 1,
        message: '',
        data: []
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
