import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ResponseData, RTN } from '../../interfaces/consRTN.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VentasData } from '../../interfaces/ventas.interface';

@Component({
  selector: 'app-ventabruta',
  standalone: true,
  imports: [AsyncPipe,RouterLink,CommonModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './ventabruta.component.html',
  styleUrl: './ventabruta.component.css'
})
export class VentabrutaComponent implements OnInit {
[x: string]: any;
  ventasData!: VentasData;
  isLoadding:boolean = false;
  regionVisible: String = '';
  i:number = 0;
  RTNI:any  = '';

  public VentaBruta$!: Observable<ResponseData>;
  public errorMessages!: string;
  errorMessage: string = ''; // Variable para almacenar el mensaje de error


  responseData!: ResponseData;

  constructor(
    private apiRTN: ApirtnService,
  ) { }

  formRtn = new FormGroup({
    Rtn: new FormControl(''),
    PeriodoDesde: new FormControl(''),
    PeriodoHasta: new FormControl('')
  });


  ngOnInit(): void {
    // this.ConsultatRTN$ = this.apiRTN.getconsultaRTN().pipe(
    //      catchError((error: string) => {
    //        this.errorMessages = error;
    //        return EMPTY;
    //      }))

   // this.sendData()
  }

  sendData(){
    this.RTNI = this.formRtn.value.Rtn;
    const data = {
      Rtn: this.formRtn.value.Rtn,
      PeriodoDesde: this.formRtn.value.PeriodoDesde,
      PeriodoHasta: this.formRtn.value.PeriodoHasta
    }
    console.log(data)
    this.isLoadding = true;

    this.apiRTN.getVentaBruta(data).subscribe(
      data => {
        console.log(data);
        this.ventasData = data;
        this.regionVisible = 'data';
        this.isLoadding = false;

        // GUARADR EN LOCALSTORAGE LA DATA DE VENTAS BRUTAS PARA USARLA EN EL COMPONENTE DE VENTAS BRUTAS DETALLE
        localStorage.setItem('ventasData', JSON.stringify(this.ventasData));
        console.log('Datos de ventas cargados exitosamente', this.ventasData);


        //RECUPERAR DATOS DE VENTAS BRUTAS DEL LOCALSTORAGE PARA USARLA EN EL COMPONENTE DE VENTAS BRUTAS DETALLE
        let ventasData = localStorage.getItem('ventasData');
        console.log('Datos de ventas descargados exitosamente', ventasData);

        const jsonData = JSON.parse(ventasData || '{}');
       const ventasBrutas = jsonData.data.ventasBrutas;
       let totalVentas = 0;

        // Recorriendo las propiedades de ventasBrutas
          for (const key in ventasBrutas) {
            if (ventasBrutas.hasOwnProperty(key)) {
              const value = ventasBrutas[key];
              console.log(`${key}: ${value}`);

              // Verificando si el valor es numérico antes de sumarlo
                if (typeof value === 'number') {
                  totalVentas += value;
                }
                console.log(`Total de ventas: ${totalVentas}`);
              localStorage.setItem('sumaVentasBrutas', JSON.stringify(totalVentas));

              // Recuperar la variable sumaVentasBrutas del localStorage
              let sumaVentasBrutasLS = localStorage.getItem('sumaVentasBrutas');
              console.log('Datos de sumaVentasBrutas descargados exitosamente', sumaVentasBrutasLS);


            }
          };



      },
      error => {
        this.errorMessage = error?.error?.message || 'Error desconocido';
        this.regionVisible = 'error';
        this.isLoadding = false;
        console.log(this.errorMessage);
        console.error('Error de RTN:', error);


      }

    );
  }

  saveConsulta(){
    this.regionVisible = 'verInfoSar';
  }





}

/*
  (data) => {
        this.ventasData = data;
        this.isLoadding = false;

        console.log('Datos de ventas cargados exitosamente', this.ventasData);
      },
      (error) => {
        console.error('Error al consumir la API:', error.message);
        this.errorMessage = error.message;
      }
*/

