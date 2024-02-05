import { Component } from '@angular/core';
import { ApirtnService } from '../../services/apirtn.service';
import { sumaVVB } from '../../interfaces/sumaVenta.interfaces';

@Component({
  selector: 'app-misconsultas',
  standalone: true,
  imports: [],
  templateUrl: './misconsultas.component.html',
  styleUrl: './misconsultas.component.css',
})
export class MisconsultasComponent {
  regionVisible: String = '';
  User: any = '';
  Rol: any = '';
  UserId: any = '';
  sumaVVB: sumaVVB[] = [];

  constructor(private apiRTN: ApirtnService) {}

  ngOnInit(): void {
    //obtener al usuario logueado
    const userDataString = localStorage.getItem('auth-user');

    // Verificar si los datos existen
    if (userDataString) {
      // Parsear los datos del usuario desde formato JSON a un objeto de TypeScript
      const userData = JSON.parse(userDataString);

      const userId = userData.id;
      this.UserId = userId;
    } else {
      console.error('Not Found User Data');
    }

    this.apiRTN.getSumaVBIdUser(this.UserId).subscribe(
      (data) => {
        this.sumaVVB = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
