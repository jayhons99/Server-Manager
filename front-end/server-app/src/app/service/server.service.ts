import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Status } from "../enum/status.enum";
import { CustomResponse } from "../interface/custom.response";
import { Server } from "../interface/server";

@Injectable({
    providedIn: 'root'
})

export class ServerService {
    private readonly apiUrl = 'any';
    // injected in service to make calls to back-end
    constructor(private http: HttpClient) { }

    // reactive approach
    // servers$ becomes an observable 
    servers$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );
    
    // takes a server parameter and saves it as body of the request 
    save$ = (server: Server) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    )

    ping$ = (ipAddress: string) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
        subscriber => {
            console.log(response);
            subscriber.next(
                // first case of filtering by all servers caught
                status === Status.ALL ? { ...response, message: `Servers filtered by ${status} status`} : 
                {
                    ...response,
                    // second case of filtering by SERVER_DOWN or SERVER_UP
                    message: response.data.servers
                    .filter(server => server.status === status).length > 0 ? 
                    `Servers filtered by ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status` :
                    `No servers of ${status} found`,
                    data : { servers: response.data.servers.filter(server => server.status === status)}
                }
            );
            subscriber.complete();
        }
    )
    .pipe(
        tap(console.log), 
        catchError(this.handleError)
    );

    delete$ = (serverId: number) => <Observable<CustomResponse>> 
    this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    private handleError(error: HttpErrorResponse): import("rxjs").Observable<never> {
        // used for debugging
        console.log(error);
        return throwError(() => new Error(`An error occurred- Error code: ${error.status}`));
    }
}