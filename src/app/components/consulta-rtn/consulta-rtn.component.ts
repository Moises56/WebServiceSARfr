import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ResponseData, RTN } from '../../interfaces/consRTN.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-consulta-rtn',
  standalone: true,
  imports: [AsyncPipe,RouterLink,CommonModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './consulta-rtn.component.html',
  styleUrl: './consulta-rtn.component.css'
})
export class ConsultaRTNComponent implements OnInit {
  Resultado: any[] = []
  visibleD:boolean = false;
  visibleE:boolean = false;

  regionVisible: String = '';

  public ConsultatRTN$!: Observable<ResponseData>;
  public errorMessage!: string;

  responseData!: ResponseData;
  isLoadding = false;

  constructor(
    private apiRTN: ApirtnService,
  ) { }

  formRtn = new FormGroup({
    rtn: new FormControl(''),
  });


  ngOnInit(): void {
    // this.ConsultatRTN$ = this.apiRTN.getconsultaRTN().pipe(
    //      catchError((error: string) => {
    //        this.errorMessage = error;
    //        return EMPTY;
    //      }))

   // this.sendData()
  }

  sendData(){
    //limpiar datos


    const data = {
      rtn: this.formRtn.value.rtn
    }
    console.log(data)
    this.isLoadding = true;

    this.apiRTN.getconsultaRTN(data).subscribe(
      (data) => {
        this.responseData = data;
        this.regionVisible = 'data';
        // this.visibleD = true;
        // this.visibleE = false;
        this.isLoadding = false;
        console.log('Data loaded successfully', this.responseData.message);
      },
      error => {
        this.errorMessage = error?.error?.message || 'Error desconocido';
        this.regionVisible = 'error';
        this.isLoadding = false;
        // this.visibleE = true;
        // this.visibleD = false;
        console.log(this.errorMessage);
        console.error('Error de RTN:', error);
      }
      );
  }

}
