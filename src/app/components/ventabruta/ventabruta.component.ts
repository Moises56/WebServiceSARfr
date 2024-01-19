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
  ventasData!: VentasData;

  public VentaBruta$!: Observable<ResponseData>;
  public errorMessages!: string;

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
    const data = {
      Rtn: this.formRtn.value.Rtn,
      PeriodoDesde: this.formRtn.value.PeriodoDesde,  
      PeriodoHasta: this.formRtn.value.PeriodoHasta
    }
    console.log(data)

    this.apiRTN.getVentaBruta(data).subscribe(
      (data) => {
        this.ventasData = data;
        console.log('Datos de ventas cargados exitosamente', this.ventasData);
      },
      (error) => {
        console.error('Error al cargar los datos de ventas', error);
      }
    );
  }

}

