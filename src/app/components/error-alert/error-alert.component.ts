import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css'
})
export class ErrorAlertComponent {
  @Input() errorMessage: string = '';
  showAlert: boolean = false;


  constructor() { }

  mostrarAlerta() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Desaparecerá después de 3 segundos
  }


}
