import { Component, OnInit } from '@angular/core';
import { VentabrutaComponent } from '../ventabruta/ventabruta.component';
import { ConsultaRTNComponent } from '../consulta-rtn/consulta-rtn.component';
import { ConsultaRtn } from '../../interfaces/consultaRTN.interfaces';
import { VentasBrutas } from '../../interfaces/ventasBrutas.interfaces';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApirtnService } from '../../services/apirtn.service';
import { AccesspointService } from '../../services/accesspoint.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraComponent } from '../bitacora/bitacora.component';
import { MisconsultasComponent } from '../misconsultas/misconsultas.component';
import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink, NgClass, NgbCollapseModule,
    VentabrutaComponent, ConsultaRTNComponent, BitacoraComponent, 
    MisconsultasComponent, HomeComponent, UserComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  regionVisible: String = '';
  User: any = '';
  Rol: any = '';
  isMenuCollapsed = true;
  isActive: boolean = false;

  constructor(
    public authService: AuthService,
    private apiRTN: ApirtnService,
    private accesspointService: AccesspointService
  ) {}

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
      
    } else {
      console.error('error: data not found.');
    }
  }


  toggleActive() {
    this.isActive = !this.isActive;
  }


  onUser() {
    // mostrar la region al hacer click y manternerla visible
    this.regionVisible = 'user';
  }

  onHome() {
    // mostrar la region al hacer click y manternerla visible
    this.regionVisible = 'inicio';
  }

  onConsRtn() {
    this.regionVisible = 'consultaRtn';
  }

  onVentaB() {
    this.regionVisible = 'ventasBrutas';
  }
  onBitacora() {
    this.regionVisible = 'bitacora';
  }
  onMisConsultas() {
    this.regionVisible = 'misConsultas';
  }
}
