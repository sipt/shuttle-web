export class Response<T> {
    code: number;
    message: string;
    data: T;
}

export class Speed {
    up_speed: string;
    down_speed: string;
}

// export const Host = 'http://localhost:8082';
// export const WSHost = 'ws://localhost:8082';
export const WSHost = 'ws://' + document.location.host;
export const Host = '';
