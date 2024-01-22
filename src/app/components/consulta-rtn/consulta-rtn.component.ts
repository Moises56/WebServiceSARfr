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

  public ConsultatRTN$!: Observable<ResponseData>;
  public errorMessages!: string;
  // rtn!: '';

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
    //        this.errorMessages = error;
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
        
        this.isLoadding = false;
        console.log('Data loaded successfully', this.responseData.message);
      },
      (error) => {
        console.error('Error loading data', error);
        this.errorMessages = error;
        return EMPTY;
      }
      );
  }

}
