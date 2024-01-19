import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SarapiService } from '../../services/sarapi.service';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { ResponseData } from '../../interfaces/consRTN.interfaces';
import { ConsultaRTNComponent } from '../consulta-rtn/consulta-rtn.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterOutlet, RouterLink, PokemonComponent,NgbCollapseModule, ConsultaRTNComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  title = 'webService-SAR';
  public ConsultatRTN$!: Observable<ResponseData>;
  public errorMessages!: string;

  test: any[] = [];


  constructor(private sarapiService: SarapiService) { }

  ngOnInit(): void {
    // this.ConsultatRTN$ = this.sarapiService.getDataWithCredentials().pipe(
    //   catchError((error: string) => {
    //     this.errorMessages = error;
    //     return EMPTY;
    //   }))

      // this.ConsultatRTN$.subscribe((data: any) => {
      //   console.log('data1', data);
      //   this.test = data;
        //console.log('Dat2: ', this.test);
        //console.log(this.test);

       // console.log('data1' + data.results);
       // this.test = data.results;
      // }
      // );

  }

}
