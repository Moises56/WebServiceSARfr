import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ConsultaRTNComponent } from './components/consulta-rtn/consulta-rtn.component';
import { VentabrutaComponent } from './components/ventabruta/ventabruta.component';

export const routes: Routes = [
    // { path: '', component: AppComponent },
    { path: 'consultartn', title:'consultartn', component: ConsultaRTNComponent},
    { path: 'ventabruta', title:'ventabruta', component: VentabrutaComponent},
];
