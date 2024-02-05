import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData, RTN } from '../interfaces/consRTN.interfaces';
import { VentasData } from '../interfaces/ventas.interface';
import { sumaVVB } from '../interfaces/sumaVenta.interfaces';
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

  //suma de ventas brutas con los siguientes parametros RTN, nombreEmpresa, sumaAMDC, sumaSar, anio, usuario a la rura urlSumVB
  saveSumaVB(data:sumaVVB): Observable<sumaVVB>{
    console.log(data.RTN, data.nombreEmpresa, data.sumaAMDC, data.sumaSar, data.anio, data.usuario, data.userId)
    return this.http.post<sumaVVB>(`${environment.urlSumaVB}/sumaVentaBruta`,{
      // `${environment.urLogin}/signin`
      userId: data.userId,
      RTN: data.RTN,
      nombreEmpresa: data.nombreEmpresa,
      sumaAMDC: data.sumaAMDC,
      sumaSar: data.sumaSar,
      anio: data.anio,
      usuario: data.usuario
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  // obtener todas las sumas de ventas brutas
  getSumaVB(): Observable<sumaVVB[]>{
    return this.http.get<sumaVVB[]>(`${environment.urlSumaVB}/getSumaVVB`).pipe(
      catchError(this.errorHandler)
    );
  }

  // obtener todas las sumas de ventas brutas por el idUSer
  getSumaVBIdUser(userId: string): Observable<sumaVVB[]>{
    return this.http.get<sumaVVB[]>(`${environment.urlSumaVB}/getSumaVVB/${userId}`).pipe(
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
