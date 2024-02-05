import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ConsultaRTNComponent } from './components/consulta-rtn/consulta-rtn.component';
import { VentabrutaComponent } from './components/ventabruta/ventabruta.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { MisconsultasComponent } from './components/misconsultas/misconsultas.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { rolGuard } from './guards/rol.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

export const routes: Routes = [
    { path: '',redirectTo:'home', pathMatch:'full'},
    { path: 'home', title:'home', component: HomeComponent},

    {path: 'login', title:'login', component: LoginComponent},
    {path: 'dashboard', title:'dashboard', component: DashboardComponent , canMatch: [authGuard]},
    { path: 'consultartn', title:'consultartn', component: ConsultaRTNComponent, canMatch: [authGuard]},
    { path: 'ventabruta', title:'ventabruta', component: VentabrutaComponent, canMatch: [authGuard]},
    {path: 'misconsultas', title:'misconsultas', component: MisconsultasComponent , canMatch: [authGuard]},
    {path: 'bitacora', title:'dashboard', component: BitacoraComponent , canMatch: [authGuard, rolGuard]},
    {path: 'not-authorized', title:'not-authorized', component: NotAuthorizedComponent},

    
    { path: '**', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)}
];
