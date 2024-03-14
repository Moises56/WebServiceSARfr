import { Component, OnInit } from '@angular/core';
import {RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  User: any = '';
  Rol: any = '';


  constructor() { }

  ngOnInit(): void {
    this.getUser();
  }

  //obtender al usuario de localstorage
  getUser(){
    if (typeof localStorage !== 'undefined') {
      //obtener al usuario logueado
      const userDataString = localStorage.getItem('auth-user');
      // Verificar si los datos existen
      if (userDataString) {
        // Parsear los datos del usuario desde formato JSON a un objeto de TypeScript
        const userData = JSON.parse(userDataString);
    
        // Obtener el nombre de usuario
        const username = userData.username;
        this.User = username;
        console.log('usuario: ', this.User);
    
        // Obtener el rol del usuario
        const rol = userData.roles[0];
        this.Rol = rol;
        console.log('rol: ', this.Rol);
      } else {
        console.error('No se encontraron datos del usuario en localStorage');
      }
    } else {
      console.error('El objeto localStorage no está definido en este entorno');
    }
  }



}
