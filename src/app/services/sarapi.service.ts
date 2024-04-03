import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ResponseData } from '../interfaces/consRTN.interfaces';
@Injectable({
  providedIn: 'root'
})
export class SarapiService {

  constructor(private http: HttpClient) { }

  // consumir api de sar que tiene credenciales de acceso basicas (usuario y contraseña)
  // url = 'http://172.20.11.52:7075/int-middleware-gateway/api/v1/AMDC/ConsultaRTN';

  public username: string = '';
  public password: string = '';

  // obtener la consulta de RTN pasandole el numero de identidad como parametro en el body de la peticion post y las credenciales de acceso basicas en el header de la peticion post
  // getDataWithCredentials(): Observable<ResponseData> {
  //   const credentials = btoa(`${this.username}:${this.password}`); // Codifica las credenciales a Base64
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'POST',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //     'Access-Control-Allow-Credentials': 'true',
  //     'Authorization': `Basic ${credentials}` // Agrega las credenciales al encabezado
  //   });

  //   return this.http.post<ResponseData>(`${environment.conRTNUrl}`,  {
  //     rtn: "08019998379342"
  //   }, { headers }
  //  );
  // }




}
