import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ResponseData, RTN } from '../../interfaces/consRTN.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbAlertModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulta-rtn',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbProgressbarModule,
  ],
  templateUrl: './consulta-rtn.component.html',
  styleUrl: './consulta-rtn.component.css',
})
export class ConsultaRTNComponent implements OnInit {
  Resultado: any[] = [];
  visibleD: boolean = false;
  visibleE: boolean = false;

  regionVisible: String = '';
  errorMessage1: string = ''; // Variable para almacenar el mensaje de error

  public ConsultatRTN$!: Observable<ResponseData>;
  public errorMessage!: string;

  responseData!: ResponseData;
  isLoadding = false;

  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private apiRTN: ApirtnService) {}

  formRtn = new FormGroup({
    rtn: new FormControl(''),
  });

  ngOnInit(): void {}

  close() {
    this.errorMessage1 = '';
    this.errorMessage = '';
  }

  sendData() {
    const data = {
      rtn: this.formRtn.value.rtn,
    };
    this.isLoadding = true;
    this.progress = 0; // reiniciar el progreso al comenzar una nueva solicitud

    // Calcular el progreso de la barra simulando una espera
    const startTime = Date.now(); // tiempo de inicio de la solicitud

    // Iniciar el temporizador para actualizar el progreso
    const progressInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const estimatedProgress = Math.min((elapsedTime / 300000) * 100, 100); // 3000 es un tiempo estimado de respuesta máximo
      this.progress = estimatedProgress;

      // Detener el temporizador si el progreso alcanza el 100% o si se establece en 0 al finalizar la suscripción
      if (this.progress >= 100 || this.progress === 0) {
        clearInterval(progressInterval);
      }
    }, 1000); // Intervalo de actualización del progreso

    this.apiRTN.getconsultaRTN(data).subscribe(
      (data) => {
        // Detener la simulación de progreso y ocultar la barra de progreso
        this.responseData = data;
        this.regionVisible = 'data';
        this.isLoadding = false;

        // Detener el temporizador y ocultar la barra de progreso
        clearInterval(progressInterval);

        if (data.customError !== undefined) {
          this.errorMessage1 = data.customError.message;
          this.isLoadding = false;
          // Detener el temporizador y ocultar la barra de progreso
          clearInterval(progressInterval);
        }
      },
      (error) => {
        this.errorMessage =
          'Lo sentimos, se produjo un error al procesar tu solicitud en los servicios del SAR. Por favor, inténtalo de nuevo.';
        this.regionVisible = 'data';
        this.isLoadding = false;
        console.error('Error de RTN:', error);
        // console.log(this.progress);
        // Detener el temporizador y ocultar la barra de progreso
        clearInterval(progressInterval);
      }
    );
  }
}
