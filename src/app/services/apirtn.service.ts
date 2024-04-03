import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData, RTN } from '../interfaces/consRTN.interfaces';
import { VentasData } from '../interfaces/ventas.interface';
import { sumaVVB } from '../interfaces/sumaVenta.interfaces';
import { AmdcData } from '../interfaces/amdcData.interfaces';
import { errorHandlerInterceptor } from '../interceptors/error-handler.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ApirtnService {
  public errorMessages!: string;

  constructor(private http: HttpClient) { }

  getconsultaRTN(data:any): Observable<any>{
    console.log(data.rtn)
    return this.http.post<any>(`${environment.RTNurl}`,{
      rtn: data.rtn
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  //
  getVentaBruta(data:any): Observable<any>{
    // console.log(data.Rtn, data.PeriodoDesde, data.PeriodoHasta)
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
    // console.log(data.RTN, data.nombreEmpresa, data.sumaAMDC, data.sumaSar, data.anio, data.usuario, data.userId)
    return this.http.post<sumaVVB>(`${environment.urlSumaVB}/sumaVentaBruta`,{
      // `${environment.urLogin}/signin`
      userId: data.userId,
      RTN: data.RTN,
      nombreEmpresa: data.nombreEmpresa,
      sumaAMDC: data.sumaAMDC,
      sumaSar: data.sumaSar,
      diferencia: data.diferencia,
      anio: data.anio,
      usuario: data.usuario
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  //* obtener todas las sumas de ventas brutas
  getSumaVB(data:any): Observable<any>{
    return this.http.post<any>(`${environment.urlSumaVB}/getSumaVVB`, {
        page: data.page,
        limit: data.limit
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  //* obtener todas las sumas de ventas brutas por el idUSer
  getSumaVBIdUser(data: any): Observable<any>{
    return this.http.post<any>(`${environment.urlSumaVB}/getSumaVVB/${data.userId}`, {
      page: data.page,
      limit: data.limit
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  // obtener todas las sumas de ventas brutas por el
  getAmdcDatos(data2:any): Observable<any>{
    //convertir a number el data2.ANIO y sumarle 1
    const anio = Number(data2.ANIO) + 1;
    // console.log(data2.RTN, anio)

    return this.http.post<any>(`${environment.urlAmdcData}`,{
      RTN: data2.RTN,
      ANIO: anio
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  // obtener todas las sumas de ventas brutas por el
  getAmdcDatoscS(data2:any): Observable<any>{
    const anio = Number(data2.ANIO) + 1;
    console.log(data2.RTN, anio)
    return this.http.post<any>(`${environment.urlAmdcDatoscS}`,{
      RTN: data2.RTN,
      ANIO: anio
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
