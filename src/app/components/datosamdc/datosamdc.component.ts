import { Component, OnInit, inject, TemplateRef, ViewEncapsulation  } from '@angular/core';
import { ApirtnService } from '../../services/apirtn.service';
import { datosAmdc } from '../../interfaces/sumaVenta.interfaces';
import { NgbPaginationModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datosamdc',
  standalone: true,
  imports: [NgbPaginationModule, ReactiveFormsModule, FormsModule],
  templateUrl: './datosamdc.component.html',
  styleUrl: './datosamdc.component.css'
})
export class DatosamdcComponent implements OnInit{
[x: string]: any;

  regionVisible: String = '';
  User: any = '';
  Rol: any = '';
  UserId: any = '';
  datosAmdc: datosAmdc[] = [];
  onDatosAmdc: datosAmdc[] = [];
  fecha: any = new Date();
  rtn: any = '';

  page = 1;
  limit = 20;
  currentPage = 0;
  totalPages = 0;
  currentPage2 = 0;
  totalPages2 = 0;

  isLoadding: boolean = false;

  constructor( 
    private api: ApirtnService,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {}

  formData = new FormGroup({
    Rtn: new FormControl(''),
    // Anio: new FormControl(''),
  });

  ngOnInit(): void {}

    // abre el modal1
    // open(content: any) {
    //   this.modalService.open(content);
    // }

    open(content: TemplateRef<any>) {
      this.modalService.open(content, { size: 'xl' });
    }
  
  
    //cierra el modal
    close() {
      this.modalService.dismissAll();
    }

    // limpiar los campos
  clearData() {
    this.onDatosAmdc = [];
    this.formData.reset();
  }
  

  searchData() {

    //si el campo RTN esta vacio que indique que es obligatorio
    if (this.formData.value.Rtn == '') {
      alert('El campo es obligatorio');
      return this.close();
    }else{
      const data = {
        RTN: this.formData.value.Rtn,
        page: this.page,
        limit: this.limit,
      };
      this.isLoadding = true;

      console.log(data);
      this.api.getDatosAmdc(data).subscribe(
        (res) => {
          console.log(res);
          this.onDatosAmdc = res.contribuyentes;
          this.currentPage2 = res.currentPage2;
          this.totalPages2 = res.totalPages2;
          console.log(this.onDatosAmdc);
          this.isLoadding = false;

          
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  
      console.log(data);
    }
  }

  pageChange2(event: any): void {
    this.page = event;
    const data = {
      RTN: this.formData.value.Rtn,
      page: this.page,
      limit: this.limit,
    };

    console.log('data2: ',data);

    this.api.getDatosAmdc(data).subscribe(
      (res) => {
        this.onDatosAmdc = res.contribuyentes;
        console.log(this.onDatosAmdc)

        this.currentPage2 = res.currentPage2;
        this.totalPages2 = res.totalPages2;
        console.log(this.currentPage2)
        console.log(this.totalPages2)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  pageChange(event: any): void {
    this.page = event;
    //obtener al usuario logueado
    const userDataString = localStorage.getItem('auth-user');

    // Verificar si los datos existen
    if (userDataString) {
      // Parsear los datos del usuario desde formato JSON a un objeto de TypeScript
      const userData = JSON.parse(userDataString);

      const userId = userData.id;
      this.UserId = userId;
    } else {
      console.error('Not Found User Data');
    }

    const data = {
      page: this.page,
      limit: this.limit,
    };

    this.api.getAllAmdcDatos(data).subscribe(
      (res) => {
        this.datosAmdc = res.amdcDatos;
        console.log(this.datosAmdc)

        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
        console.log(this.currentPage)
        console.log(this.totalPages)

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
