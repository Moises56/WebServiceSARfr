import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ResponseData, RTN } from '../../interfaces/consRTN.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulta-rtn',
  standalone: true,
  imports: [AsyncPipe,RouterLink,CommonModule, HttpClientModule,ReactiveFormsModule,NgbAlertModule],
  templateUrl: './consulta-rtn.component.html',
  styleUrl: './consulta-rtn.component.css'
})
export class ConsultaRTNComponent implements OnInit {
  Resultado: any[] = []
  visibleD:boolean = false;
  visibleE:boolean = false;

  regionVisible: String = '';
  errorMessage1: string = ''; // Variable para almacenar el mensaje de error

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


  ngOnInit(): void {}

  close() {
    this.errorMessage1 = '';
    this.errorMessage = '';
  }

  sendData(){
    //limpiar datos


    const data = {
      rtn: this.formRtn.value.rtn
    }
    // console.log(data)
    this.isLoadding = true;

    this.apiRTN.getconsultaRTN(data).subscribe(
      (data) => {
        this.responseData = data;
        this.regionVisible = 'data';
        this.isLoadding = false;

        if (data.customError !== undefined) {

          this.errorMessage1 = data.customError.message;
          this.isLoadding = false;
        }
      },
      error => {
        this.errorMessage = error?.error?.message || 'Error desconocido';
        this.regionVisible = 'data';
        this.isLoadding = false;
        console.error('Error de RTN:', error);
      }
      );
  }

}
