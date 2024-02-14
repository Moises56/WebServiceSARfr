import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ResponseData, RTN } from '../../interfaces/consRTN.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VentasData } from '../../interfaces/ventas.interface';
import { sumaVVB } from '../../interfaces/sumaVenta.interfaces';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { AmdcData } from '../../interfaces/amdcData.interfaces';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-ventabruta',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbAlertModule,
    ErrorAlertComponent,
  ],
  templateUrl: './ventabruta.component.html',
  styleUrl: './ventabruta.component.css',
})
export class VentabrutaComponent implements OnInit {
  [x: string]: any;
  ventasData!: VentasData;
  NOMBRE_COMERCIAL: any = '';
  CANTIDAD_DECLARADA: any = '';
  isLoadding: boolean = false;
  regionVisible: String = '';
  i: number = 0;
  RTNI: any = '';
  public sumasVentasBrutas: sumaVVB[] = [];
  public idCounter = 1; // Contador para generar IDs únicos
  Anio: any = '';
  Year: any = '';
  selectedYear: number = 0;
  User: any = '';
  UserId: any = '';

  public VentaBruta$!: Observable<ResponseData>;
  public TventaBrutas: string = '';

  public errorMessages!: string;
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
  errorMessage1: string = ''; // Variable para almacenar el mensaje de error
  errorMessage2: string = ''; // Variable para almacenar el mensaje de error

  responseData!: ResponseData;

  alerts!: Alert[];

  mostrarMensajeDeError: boolean = false;
  mensajeDeError: string = 'Este es un mensaje de error.';

  constructor(private apiRTN: ApirtnService) {}

  formRtn = new FormGroup({
    Rtn: new FormControl(''),
    PeriodoDesde: new FormControl(''),
    PeriodoHasta: new FormControl(''),
    Anio: new FormControl(''),
  });



  ngOnInit(): void {}

  close() {
    //limpiar la variable de error errorMessage1 
    this.errorMessage1 = '';
    this.errorMessage = '';
  }


  mostrarError() {
    this.mostrarMensajeDeError = true;
    setTimeout(() => {
      this.mostrarMensajeDeError = false;
    }, 3000); // Desaparecerá después de 3 segundos
  }

  sendData() {
    // recuperar el año seleccionado en la localstorage
    this.Year = localStorage.getItem('Year');
    this.RTNI = this.formRtn.value.Rtn;
    this.Anio = this.formRtn.value.Anio;

    this.onSelecAnio(this.Anio);

    const data = {
      Rtn: this.formRtn.value.Rtn,
      PeriodoDesde: this.formRtn.value.PeriodoDesde,
      PeriodoHasta: this.formRtn.value.PeriodoHasta,
    };

    const data2 = {
      RTN: this.formRtn.value.Rtn,
      ANIO:  this.Anio,
    }
    // console.log(data2);
    this.apiRTN.getAmdcDatos(data2).subscribe(
      (responseData) => {
        // console.log(responseData.message)
        this.errorMessage2 = responseData.message;
        this.NOMBRE_COMERCIAL = responseData.NOMBRE_COMERCIAL || responseData.message 
        this.CANTIDAD_DECLARADA = responseData.CANTIDAD_DECLARADA || 0

        //separar por comas los miles y decimales CANTIDAD_DECLARADA y con la moneda Lempiras
        this.CANTIDAD_DECLARADA = this.CANTIDAD_DECLARADA.toLocaleString('es-HN', {
          style: 'currency',
          currency: 'HNL',
        });
      },
      (error) => {
        console.error('Error: ', error);
      }
    );




    this.isLoadding = true;

    this.apiRTN.getVentaBruta(data).subscribe(

      (responseData) => {
        try {

          if (responseData.customError !== undefined) {

            this.errorMessage1 = responseData.customError.message;
            this.isLoadding = false;

            //abrir el alert
          } else if (responseData.data !== undefined) {

            this.ventasData = responseData;
            this.regionVisible = 'data';
            this.isLoadding = false;
            localStorage.setItem('ventasData', JSON.stringify(this.ventasData));

            // Calcular suma del volumen de ventas
            let totalVentas = 0;
            const ventasBrutas = responseData.data.ventasBrutas;

            for (const key in ventasBrutas) {
              if (ventasBrutas.hasOwnProperty(key)) {
                const value = ventasBrutas[key];
                // Verificar si el valor es numérico antes de sumarlo
                if (typeof value === 'number') {
                  totalVentas += value;
                }
              }
            }

            const uniqueId = this.idCounter++;

            // separar por comas los miles y decimales de la suma de ventas brutas en lempiras
            this.TventaBrutas = totalVentas.toLocaleString('es-HN', {
              style: 'currency',
              currency: 'HNL',
            });

            //obtener al usuario logueado
            const userDataString = localStorage.getItem('auth-user');

            // Verificar si los datos existen
            if (userDataString) {
              // Parsear los datos del usuario desde formato JSON a un objeto de TypeScript
              const userData = JSON.parse(userDataString);

              // Obtener el nombre de usuario
              const username = userData.username;
              this.User = username;

              const userId = userData.id;
              this.UserId = userId;
            } else {
              console.error('Error: data not found ');
            }

            // save database

            const data = {
              userId: this.UserId,
              RTN: this.RTNI,
              nombreEmpresa: this.NOMBRE_COMERCIAL || this.errorMessage2,
              sumaAMDC: this.CANTIDAD_DECLARADA || 0,
              sumaSar: this.TventaBrutas,
              anio: this.Anio,
              usuario: this.User,
            };

            this.apiRTN.saveSumaVB(data).subscribe(
              (responseData) => {
                // console.log(responseData);
              },
              (error) => {
                this.errorMessage =
                error?.error?.message || 'Error desconocido';
                this.regionVisible = 'error';

                this.isLoadding = false;
                console.error('Error de RTN:', error);
              }
            );

            // Agregar la suma al arreglo con el formato adecuado
            this.sumasVentasBrutas.push({
              id: uniqueId,
              RTN: this.RTNI,
              nombreEmpresa: this.NOMBRE_COMERCIAL || this.errorMessage2,
              sumaAMDC: this.CANTIDAD_DECLARADA || 0,
              sumaSar: this.TventaBrutas,
              anio: this.Anio,
              usuario: this.User, // Reemplaza 'nombre_de_usuario' con la variable o valor correcto del usuario
            });

            // Guardar el arreglo en LocalStorage
            localStorage.setItem(
              'sumasVentasBrutas',
              JSON.stringify(this.sumasVentasBrutas)
            );

            let sumasVentasBrutasLS = localStorage.getItem('sumasVentasBrutas');
            this.sumasVentasBrutas = JSON.parse(sumasVentasBrutasLS || '[]');
          }
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        this.errorMessage = error?.error?.message || 'Error desconocido';
        //this.regionVisible = 'error';
        this.regionVisible = 'data';
        this.isLoadding = false;
        console.error('Error: ', error);
      }
    );
  }

  onSelecAnio(even: any) {
    // console.log(even);
    this.selectedYear = even;
    // si el valor es 1 entonces es el año 2018 y se enviaria desde:201801 y hasta:201812

    const yearMappings: { [key: number]: { desde: string; hasta: string } } = {
      // 2018: { desde: '201801', hasta: '201812' },
      2019: { desde: '201901', hasta: '201912' },
      2020: { desde: '202001', hasta: '202012' },
      2021: { desde: '202101', hasta: '202112' },
      2022: { desde: '202201', hasta: '202212' },
      2023: { desde: '202301', hasta: '202312' },
      2024: { desde: '202401', hasta: '202412' },
    };

    const selectedYear = yearMappings[even];

    if (selectedYear) {
      this.formRtn.controls['PeriodoDesde'].setValue(selectedYear.desde);
      this.formRtn.controls['PeriodoHasta'].setValue(selectedYear.hasta);
    } else {
      this.formRtn.controls['PeriodoDesde'].setValue('');
      this.formRtn.controls['PeriodoHasta'].setValue('');
    }
  }

  saveSumaVVB() {
    // console.log(this.sumasVentasBrutas);
  }
}
