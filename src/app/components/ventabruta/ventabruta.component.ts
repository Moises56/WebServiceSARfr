import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ResponseData, RTN } from '../../interfaces/consRTN.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VentasData } from '../../interfaces/ventas.interface';
import { SumaVentasBrutasI } from '../../interfaces/sumaVenta.interfaces';

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
  public sumasVentasBrutas: SumaVentasBrutasI[] = [];
  public idCounter = 1; // Contador para generar IDs únicos
  Anio:any = '';
  Year:any = '';

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
    PeriodoHasta: new FormControl(''),
    Anio: new FormControl('')
  });


  ngOnInit(): void {
    // this.ConsultatRTN$ = this.apiRTN.getconsultaRTN().pipe(
    //      catchError((error: string) => {
    //        this.errorMessages = error;
    //        return EMPTY;
    //      }))

   // this.sendData()
  }

  sendData() {
    // recuperar el año seleccionado en la localstorage
    this.Year = localStorage.getItem('Year');
    console.log(this.Year);


    this.RTNI = this.formRtn.value.Rtn;
    this.Anio = this.formRtn.value.Anio;
    console.log(this.Anio)

    this.onSelecAnio(this.Anio);
    const data = {
      Rtn: this.formRtn.value.Rtn,
      PeriodoDesde: this.formRtn.value.PeriodoDesde,
      PeriodoHasta: this.formRtn.value.PeriodoHasta
    };

    console.log(data);
    this.isLoadding = true;

    this.apiRTN.getVentaBruta(data).subscribe(
      responseData => {
        console.log(responseData);

        // Guardar datos en LocalStorage
        this.ventasData = responseData;
        this.regionVisible = 'data';
        this.isLoadding = false;
        localStorage.setItem('ventasData', JSON.stringify(this.ventasData));
        console.log('Datos de ventas cargados exitosamente', this.ventasData);

        // Calcular suma del volumen de ventas
        let totalVentas = 0;
        const ventasBrutas = responseData.data.ventasBrutas;

        for (const key in ventasBrutas) {
          if (ventasBrutas.hasOwnProperty(key)) {
            const value = ventasBrutas[key];
            // console.log(`${key}: ${value}`);

            // Verificar si el valor es numérico antes de sumarlo
            if (typeof value === 'number') {
              totalVentas += value;
            }
          }
        }

        // Agregar la suma al arreglo
        // this.sumasVentasBrutas.push(totalVentas);
        // Generar un ID único
      const uniqueId = this.idCounter++;

      // Agregar la suma al arreglo con el formato adecuado
      this.sumasVentasBrutas.push({ id: uniqueId, suma: totalVentas });

        // Guardar el arreglo en LocalStorage
        localStorage.setItem('sumasVentasBrutas', JSON.stringify(this.sumasVentasBrutas));
        console.log(`Total de ventas: ${totalVentas}`);

        // Recuperar el arreglo del LocalStorage
        let sumasVentasBrutasLS = localStorage.getItem('sumasVentasBrutas');
        this.sumasVentasBrutas = JSON.parse(sumasVentasBrutasLS || '[]');
        console.log('Datos de sumasVentasBrutas descargados exitosamente', this.sumasVentasBrutas);

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

  onSelecAnio(even:any) {
    console.log(even);
    // si el valor es 1 entonces es el año 2018 y se enviaria desde:201801 y hasta:201812

    const yearMappings: { [key: number]: { desde: string; hasta: string, anio: string } } = {
      1: { desde: '201801', hasta: '201812', anio: '2018'},
      2: { desde: '201901', hasta: '201912', anio: '2019' },
      3: { desde: '202001', hasta: '202012', anio: '2020' },
      4: { desde: '202101', hasta: '202112', anio: '2021' },
      5: { desde: '202201', hasta: '202212', anio: '2022' },
      6: { desde: '202301', hasta: '202312', anio: '2023' },
      7: { desde: '202401', hasta: '202412', anio: '2024' },
    };

    const selectedYear = yearMappings[even];

    if (selectedYear) {
      this.formRtn.controls['PeriodoDesde'].setValue(selectedYear.desde);
      this.formRtn.controls['PeriodoHasta'].setValue(selectedYear.hasta);
      // gurdar el año seleccionado en la localstorage
      localStorage.setItem('Year', selectedYear.anio);



    } else {
      this.formRtn.controls['PeriodoDesde'].setValue('');
      this.formRtn.controls['PeriodoHasta'].setValue('');
    }


    // if(even == 1){
    //   this.formRtn.controls['PeriodoDesde'].setValue('201801');
    //   this.formRtn.controls['PeriodoHasta'].setValue('201812');
    // }else if(even == 2){
    //   this.formRtn.controls['PeriodoDesde'].setValue('201901');
    //   this.formRtn.controls['PeriodoHasta'].setValue('201912');
    // }else if(even == 3){
    //   this.formRtn.controls['PeriodoDesde'].setValue('202001');
    //   this.formRtn.controls['PeriodoHasta'].setValue('202012');
    // }
    // else if(even == 4){
    //   this.formRtn.controls['PeriodoDesde'].setValue('202101');
    //   this.formRtn.controls['PeriodoHasta'].setValue('202112');
    // }
    // else if(even == 5){
    //   this.formRtn.controls['PeriodoDesde'].setValue('202201');
    //   this.formRtn.controls['PeriodoHasta'].setValue('202212');
    // }
    // else if(even == 6){
    //   this.formRtn.controls['PeriodoDesde'].setValue('202301');
    //   this.formRtn.controls['PeriodoHasta'].setValue('202312');
    // }
    // else if(even == 7){
    //   this.formRtn.controls['PeriodoDesde'].setValue('202401');
    //   this.formRtn.controls['PeriodoHasta'].setValue('202412');
    // }
    // else{
    //   this.formRtn.controls['PeriodoDesde'].setValue('');
    //   this.formRtn.controls['PeriodoHasta'].setValue('');
    // }
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

