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
  onDashboard: string = '';
  onDashboardL: any = '';

  constructor(
    public authService: AuthService,
    private apiRTN: ApirtnService,
    private accesspointService: AccesspointService
  ) {}

  ngOnInit(): void {

    //si recarga la pagina que y no hay evento onDashboard, guardar el evento onDashboara
    // if (this.onDashboardL === '' || this.onDashboardL === null || this.onDashboardL === undefined) {
    //   const visible = 'onDash';
    //   localStorage.setItem('onDashboard', visible);
    // }

    this.onDashboardL = localStorage.getItem('onDashboard');

    // obtener el evento onDashboard
    // this.onDashboardL = localStorage.getItem('onDashboard');

    this.onVisible();
    this.onVisibleLog();
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

    //eliminar el evento onDashboard
    localStorage.removeItem('onDashboard');

    //recargar la pagina oninit
    this.ngOnInit();
  }

  onHome() {
    // mostrar la region al hacer click y manternerla visible
    this.regionVisible = 'inicio';
    //eliminar el evento onDashboard
    localStorage.removeItem('onDashboard');
    //recargar la pagina oninit
    this.ngOnInit();
  }

  onConsRtn() {
    this.regionVisible = 'consultaRtn';
    //eliminar el evento onDashboard
    localStorage.removeItem('onDashboard');
    //recargar la pagina oninit
    this.ngOnInit();
  }

  onVentaB() {
    this.regionVisible = 'ventasBrutas';
    //eliminar el evento onDashboard
    localStorage.removeItem('onDashboard');
    //recargar la pagina oninit
    this.ngOnInit();
  }
  onBitacora() {
    this.regionVisible = 'bitacora';
    //eliminar el evento onDashboard
    localStorage.removeItem('onDashboard');
    //recargar la pagina oninit
    this.ngOnInit();
  }
  onMisConsultas() {
    this.regionVisible = 'misConsultas';
    //eliminar el evento onDashboard
    localStorage.removeItem('onDashboard');
    this.ngOnInit();
  }

  // recibe el evento de app.component.ts para mostrar el dashboard
  onVisible() {
    this.accesspointService.onVisible.subscribe(
      res => {
        // console.log(res);
        this.regionVisible = res;
        
      }
    );
    //eliminar el evento onDashboard
    // localStorage.removeItem('onDashboard');
  }

  onVisibleLog() {
    this.accesspointService.onVisibleLog.subscribe(
      res => {
        // console.log(res);
        const visible = 'onDash';
          //guardar el evento onDashboard
          localStorage.setItem('onDashboard', visible);
        // this.onDashboard = res; 
        // this.onDashboard = res;     
        // obtener el evento onDashboard
        this.onDashboardL = localStorage.getItem('onDashboard');
        // console.log(this.onDashboardL);
        this.regionVisible = this.onDashboardL;
      }
    );
  }
  


}
