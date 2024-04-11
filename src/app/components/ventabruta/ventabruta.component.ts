import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ResponseData, RTN } from '../../interfaces/consRTN.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VentasData } from '../../interfaces/ventas.interface';
import { datosAMdc, sumaVVB } from '../../interfaces/sumaVenta.interfaces';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { AmdcData } from '../../interfaces/amdcData.interfaces';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


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
  CANTIDAD_DECLARADA!: any;
  suAmdc!: any;
  STATUS!: any;
  FECHA!: any;
  ANIO!: any;

  DataAmdc: any[] = [];

  public TventaBrutas!: any;
  suSar!: any;
  diferencia!: any;
  isLoadding: boolean = false;
  regionVisible: String = '';
  i: number = 0;
  RTNI: any = '';
  public sumasVentasBrutas: sumaVVB[] = [];
  public datosAMdc: datosAMdc[] = [];
  public idCounter = 1; // Contador para generar IDs únicos
  Anio: any = '';
  Year: any = '';
  selectedYear: number = 0;
  User: any = '';
  UserId: any = '';

  
  public VentaBruta$!: Observable<ResponseData>;
  public errorMessages!: string;
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
  errorMessage1: string = ''; // Variable para almacenar el mensaje de error
  errorMessage2: string = ''; // Variable para almacenar el mensaje de error
  statusMessage: string = ''; // Variable para almacenar el mensaje de error
  // stado!: any;

  responseData!: ResponseData;

  alerts!: Alert[];

  mostrarMensajeDeError: boolean = false;
  mensajeDeError: string = 'Este es un mensaje de error.';

  progress = 0;

    // mostrar fecha y hora
    fecha = new Date();
    fechaActual: string = '';
  
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
    this.statusMessage = '';
  }

  

  mostrarError() {
    this.mostrarMensajeDeError = true;
    setTimeout(() => {
      this.mostrarMensajeDeError = false;
    }, 3000); // Desaparecerá después de 3 segundos
  }

  sendData() {
    this.saveSumaVVB();

    // recuperar el año seleccionado en la localstorage
    this.Year = localStorage.getItem('Year');
    this.RTNI = this.formRtn.value.Rtn;
    this.Anio = this.formRtn.value.Anio;

    // mostrar la fecha y hora actual
    this.fechaActual = this.fecha.getDate() + '/' + (this.fecha.getMonth() + 1) + '/' + this.fecha.getFullYear() + ' ' + this.fecha.getHours() + ':' + this.fecha.getMinutes();
  
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

    this.progress = 0; // reiniciar el progreso al comenzar una nueva solicitud

    // Calcular el progreso de la barra simulando una espera
    const startTime = Date.now(); // tiempo de inicio de la solicitud

    // Iniciar el temporizador para actualizar el progreso
    const progressInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const estimatedProgress = Math.min((elapsedTime / 300000 ) * 100, 100); // 3000 es un tiempo estimado de respuesta máximo
      
      this.progress = estimatedProgress;
      //redondear el progreso
      
      // Detener el temporizador si el progreso alcanza el 100% o si se establece en 0 al finalizar la suscripción
      if (this.progress >= 100 || this.progress === 0) {
        clearInterval(progressInterval);
      }
    }, 1000); // Intervalo de actualización del progreso

    this.apiRTN.getAmdcDatos(data2).subscribe(
      (responseData) => {
        console.log('getAmdcDatos: ' , responseData)
        this.errorMessage2 = responseData.message;
      },
      (error) => {
        console.error('Error: ', error);
      }
    );

  ///**** */

    this.isLoadding = true;

    this.apiRTN.getVentaBruta(data).subscribe(
      (responseData) => {
        try {

          if (responseData.customError !== undefined) {

            this.errorMessage1 = responseData.customError.message;
            this.isLoadding = false;
             // Detener el temporizador y ocultar la barra de progreso
            clearInterval(progressInterval);

            //abrir el alert
          } else if (responseData.data !== undefined) {

            this.ventasData = responseData;
            console.log('ventasData: ', this.ventasData);
            this.regionVisible = 'data';
            this.isLoadding = false;
            localStorage.setItem('ventasData', JSON.stringify(this.ventasData));

            // Calcular suma del volumen de ventas
            let totalVentas = 0;
            const ventasBrutas = responseData.data.ventasBrutas;
             // Detener el temporizador y ocultar la barra de progreso
            clearInterval(progressInterval);

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

            // console.log('SumaSAR: ', totalVentas);
            this.suSar = totalVentas;
            // console.log('SumaSAR: ', this.suSar);

            //separar en miles y decimales la suma de ventas brutas sin la moneda
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


              //***  */Rectificacion de datos urlAmdcDatoscS
                this.apiRTN.getAmdcDatoscS(data2).subscribe(
                  (responseData) => {
                    // console.log('getAmdcDatoscS: ' , responseData)
                    this.errorMessage2 = responseData.message;

                    //recorrer el objeto para obtener los datos
                    for (const key in responseData) {
                      if (responseData.hasOwnProperty(key)) {
                        const element = responseData[key];
                        this.RTNI = element.RTN;
                        this.NOMBRE_COMERCIAL = element.NOMBRE_COMERCIAL;
                        this.CANTIDAD_DECLARADA = element.CANTIDAD_DECLARADA;
                        this.suAmdc = element.CANTIDAD_DECLARADA;
                        this.STATUS = element.ESTATUS;
                        this.FECHA = element.FECHA;
                        this.ANIO = element.ANIO;
                      }
                      
                      //convertir a tipo de numerico la cantidad declarada
                      this.CANTIDAD_DECLARADA = parseFloat(this.CANTIDAD_DECLARADA);
                      //separar por comas los miles y decimales CANTIDAD_DECLARADA y con la moneda Lempiras
                      this.CANTIDAD_DECLARADA = this.CANTIDAD_DECLARADA.toLocaleString('es-HN', {
                        style: 'currency',
                        currency: 'HNL',
                      });

                      // diferncia entre la suma de ventas brutas y la suma de AMDC convertir a numero 
                      this.diferencia = this.suAmdc - this.suSar;

                      // this.sumaSar es mayor que this.suAmdc entonces la diferencia es positiva y se muestra en verde
                      if (this.suAmdc > this.suSar) {
                        this.diferencia = this.diferencia.toLocaleString('es-HN', {
                          style: 'currency',
                          currency: 'HNL',
                        });
                        this.statusMessage = 'El volumen de ventas de la AMDC es mayor que el volumen de ventas del SAR, la diferencia es de: ' +  this.diferencia;
                        // console.log('Sar es mayor que AMDC: ', this.diferencia);
                      } else {
                        // this.suSar es menor que this.suAmdc entonces la diferencia es negativa y se muestra en rojo
                        this.diferencia = this.diferencia.toLocaleString('es-HN', {
                          style: 'currency',
                          currency: 'HNL',
                        });
                        this.statusMessage = 'El volumen de ventas de la AMDC es menor que el volumen de ventas del SAR, la diferencia es de: ' + this.diferencia;
                        // console.log('Sar es menor que AMDC: ', this.diferencia);
                      }

                      // guardar los datos en un arreglo DataAmdc
                      this.DataAmdc.push({
                        RTN: this.RTNI,
                        NOMBRE_COMERCIAL: this.NOMBRE_COMERCIAL,
                        CANTIDAD_DECLARADA: this.CANTIDAD_DECLARADA,
                        STATUS: this.STATUS,
                        FECHA: this.FECHA,
                        ANIO: this.ANIO,
                      });

                      // save database
                      const data = {
                        userId: this.UserId,
                        RTN: this.RTNI,
                        nombreEmpresa: this.NOMBRE_COMERCIAL || this.errorMessage2,
                        sumaAMDC: this.CANTIDAD_DECLARADA || 0,
                        sumaSar: this.TventaBrutas,
                        diferencia: this.diferencia,
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
                        diferencia: this.diferencia,
                        anio: this.Anio,
                        usuario: this.User
                      });

                      // guardar en la localstorage el arreglo DataAmdc
                      localStorage.setItem('DataAmdc', JSON.stringify(this.DataAmdc));
                      this.DataAmdc = JSON.parse(localStorage.getItem('DataAmdc') || '[]');
                      // console.log('DataAmdc: ', this.DataAmdc);

                      // Guardar el arreglo en LocalStorage
                      localStorage.setItem('sumasVentasBrutas',JSON.stringify(this.sumasVentasBrutas));

                      let sumasVentasBrutasLS = localStorage.getItem('sumasVentasBrutas');
                      this.sumasVentasBrutas = JSON.parse(sumasVentasBrutasLS || '[]');
                    }
                  },
                  (error) => {
                    console.error('Error: ', error);
                  }
                );
          }
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        this.errorMessage = 'Lo sentimos, se produjo un error al procesar tu solicitud en los servicios del SAR. Por favor, inténtalo de nuevo.';
        //this.regionVisible = 'error';
        this.regionVisible = 'data';
        this.isLoadding = false;
        console.error('Error: ', error);
         // Detener el temporizador y ocultar la barra de progreso
         clearInterval(progressInterval);
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
        this.fechaActual = this.fecha.getDate() + ' / ' + (this.fecha.getMonth() + 1) + ' / ' + this.fecha.getFullYear() + '  ' + this.fecha.getHours() + ' : ' + this.fecha.getMinutes();

  }


  genPdf() {
    const elementToPrint: any = document.getElementById('ventasBrutas');

    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      // pdf.addImage(canvas.toDataURL('https://res.cloudinary.com/dck9p8oly/image/upload/v1708054346/kxm8xrobc6i1ypjl2ra2.png'), 'PNG', 0, 0, 208, 298);
      const imgData = canvas.toDataURL(
        'https://res.cloudinary.com/dck9p8oly/image/upload/v1708054346/kxm8xrobc6i1ypjl2ra2.png'
      );
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ventasBrutas.pdf');
      alert('Reporte generado con éxito');
    });
    
  }


  
}
