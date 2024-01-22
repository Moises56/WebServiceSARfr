import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ConsultaRTNComponent } from './components/consulta-rtn/consulta-rtn.component';
import { VentabrutaComponent } from './components/ventabruta/ventabruta.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '',redirectTo:'home', pathMatch:'full'},
    { path: 'home', title:'home', component: HomeComponent},
    //redirect to homecomponent

    { path: 'consultartn', title:'consultartn', component: ConsultaRTNComponent},
    { path: 'ventabruta', title:'ventabruta', component: VentabrutaComponent},
];
