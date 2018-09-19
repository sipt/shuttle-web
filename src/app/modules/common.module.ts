import {environment} from '../../environments/environment';

export class Response<T> {
    code: number;
    message: string;
    data: T;
}

export class Speed {
    up_speed: string;
    down_speed: string;
}
export const WSHost = environment.production ? 'ws://' + document.location.host : 'http://localhost:8082';
export const Host = environment.production ? '' : 'http://localhost:8082';
