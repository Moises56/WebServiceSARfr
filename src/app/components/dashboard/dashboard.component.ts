import { Component, OnInit } from '@angular/core';
import { VentabrutaComponent } from '../ventabruta/ventabruta.component';
import { ConsultaRTNComponent } from '../consulta-rtn/consulta-rtn.component';
import { ConsultaRtn } from '../../interfaces/consultaRTN.interfaces';
import { VentasBrutas } from '../../interfaces/ventasBrutas.interfaces';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgClass, VentabrutaComponent, ConsultaRTNComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  regionVisible: String = '';
  User: any = '';
  Rol: any = '';
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
      //obtener al usuario logueado 
      const userDataString = localStorage.getItem('auth-user');
    // Verificar si los datos existen
    if (userDataString) {
      // Parsear los datos del usuario desde formato JSON a un objeto de TypeScript
      const userData = JSON.parse(userDataString);

      // Obtener el nombre de usuario
      const username = userData.username;
      this.User = username;

      // Obtener el rol del usuario
      const rol = userData.roles[0];
      this.Rol = rol;

      // Usar el nombre de usuario como desees
      console.log('Nombre de usuario:', username);
  } else {
      console.error('No se encontraron datos de usuario en la localstorage.');
  }
  }


  mostrar(){
    // mostrar la region al hacer click y manternerla visible
    this.regionVisible = 'user';
  }

  ConsultaRtn(){
    // mostrar la region al hacer click y manternerla visible
    this.regionVisible = 'consultaRtn';
  }

  VentasBruta(){
    // mostrar la region al hacer click y manternerla visible
    this.regionVisible = 'ventasBrutas';
  }

}
