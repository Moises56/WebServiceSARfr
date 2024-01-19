import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData, RTN } from '../interfaces/consRTN.interfaces';
import { VentasData } from '../interfaces/ventas.interface';

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
      catchError((error: string) => {
        this.errorMessages = error;
        return EMPTY;
      }));
  }

  // 
  getVentaBruta(data:any): Observable<VentasData>{
    console.log(data.Rtn, data.PeriodoDesde, data.PeriodoHasta)
    return this.http.post<VentasData>(`${environment.Ventaurl}`,{
      Rtn: data.Rtn,
      PeriodoDesde: data.PeriodoDesde,
      PeriodoHasta: data.PeriodoHasta

    }).pipe(
      catchError((error: string) => {
        this.errorMessages = error;
        return EMPTY;
      }));
  }
}
