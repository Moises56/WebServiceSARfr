import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SarapiService } from '../../services/sarapi.service';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { ResponseData } from '../../interfaces/consRTN.interfaces';
import { ConsultaRTNComponent } from '../consulta-rtn/consulta-rtn.component';
import { AuthService } from '../../services/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterOutlet, RouterLink, PokemonComponent,NgbCollapseModule, ConsultaRTNComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  title = 'webService-SAR';
  public ConsultatRTN$!: Observable<ResponseData>;
  public errorMessages!: string;

  test: any[] = [];

  isMenuCollapsed = true;
  loggedIn:boolean = false;
  // @Input() :boolean = false
  @Output() addVisibleEvent = new EventEmitter<boolean>();


  constructor(
    private sarapiService: SarapiService,
    public authService: AuthService
    ) { }

  ngOnInit(): void {

  }


  visible(){
    // this.accesspoint.onVisible.emit(false);
  }

}
