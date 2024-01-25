import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData, RTN } from '../interfaces/consRTN.interfaces';
import { VentasData } from '../interfaces/ventas.interface';
import { errorHandlerInterceptor } from '../interceptors/error-handler.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ApirtnService {
  public errorMessages!: string;

  constructor(private http: HttpClient) { }

  getconsultaRTN(data:any): Observable<ResponseData>{
    console.log(data.rtn)
    return this.http.post<ResponseData>(`${environment.RTNurl}`,{
      rtn: data.rtn
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  //
  getVentaBruta(data:any): Observable<any>{
    console.log(data.Rtn, data.PeriodoDesde, data.PeriodoHasta)
    return this.http.post<any>(`${environment.Ventaurl}`,{
      Rtn: data.Rtn,
      PeriodoDesde: data.PeriodoDesde,
      PeriodoHasta: data.PeriodoHasta
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    // console.log(error.error.message);
    console.error('Error en la petición:', error);
    return throwError({ error: error || "Server Error" });
  }
}

/* }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error de RTN:', error);

        return throwError(error.error);
      })
    );
*/
