import { Component, OnInit } from '@angular/core';
import { sumaVVB } from '../../interfaces/sumaVenta.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { AccesspointService } from '../../services/accesspoint.service';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css'
})
export class BitacoraComponent implements OnInit{

  regionVisible: String = '';
  User: any = '';
  Rol: any = '';

  sumaVVB: sumaVVB[] = [];
  
  constructor( private apiRTN: ApirtnService,private accesspointService: AccesspointService) {     
  }

  ngOnInit(): void {
    this.apiRTN.getSumaVB().subscribe((data) => {
      this.sumaVVB = data;
    }, (error) => {
      console.error('Error data not found', error);
    });

  }

}
