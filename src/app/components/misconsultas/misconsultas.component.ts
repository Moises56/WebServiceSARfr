import { Component } from '@angular/core';
import { ApirtnService } from '../../services/apirtn.service';
import { sumaVVB } from '../../interfaces/sumaVenta.interfaces';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-misconsultas',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './misconsultas.component.html',
  styleUrl: './misconsultas.component.css',
})
export class MisconsultasComponent {
  regionVisible: String = '';
  User: any = '';
  Rol: any = '';
  UserId: any = '';
  sumaVVB: sumaVVB[] = [];
  fecha: any = new Date();

  page = 1;
  limit = 20;
  currentPage = 0;
  totalPages = 0;
  // data: any[] = [];

  constructor(private apiRTN: ApirtnService) {}

  ngOnInit(): void {}

  pageChange(event: any): void {
    this.page = event;
    // console.log(this.page);

    

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
      userId: this.UserId,
    };

    // console.log(data);

    this.apiRTN.getSumaVBIdUser(data).subscribe(
      (res) => {
        this.sumaVVB = res.sumasVentas;
        //console.log(res)

        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
        // console.log(this.currentPage)
        // console.log(this.totalPages)

        this.sumaVVB = this.sumaVVB.filter((item) => {
          //console.log(item.userId);
          //console.log(item.createdAt)
          this.fecha = item.createdAt;

          const date = new Date(this.fecha);

          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agregamos 1 porque los meses van de 0 a 11
          const day = ('0' + date.getDate()).slice(-2);
          const hours = ('0' + date.getHours()).slice(-2);
          const minutes = ('0' + date.getMinutes()).slice(-2);
          const seconds = ('0' + date.getSeconds()).slice(-2);

          const formattedDate = `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;

          item.createdAt = formattedDate;

          return item.userId === this.UserId;
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  genPdf() {
    const elementToPrint: any = document.getElementById('mis-consultas');

    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL(
        'https://res.cloudinary.com/dck9p8oly/image/upload/v1708054346/kxm8xrobc6i1ypjl2ra2.png'
      );
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('reporteVentasBrutasMisCon.pdf');
      alert('Reporte generado con éxito');
    });
  }
}
