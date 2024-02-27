import { Component, OnInit } from '@angular/core';
import { sumaVVB } from '../../interfaces/sumaVenta.interfaces';
import { ApirtnService } from '../../services/apirtn.service';
import { AccesspointService } from '../../services/accesspoint.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [NgbPaginationModule],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css',
})
export class BitacoraComponent implements OnInit {
  regionVisible: String = '';
  User: any = '';
  Rol: any = '';

  sumaVVB: sumaVVB[] = [];
  fecha: any = new Date();

  page = 1;
  limit = 20;
  currentPage = 0;
  totalPages = 0;
  // data: any[] = [];

  constructor(
    private apiRTN: ApirtnService,
    private accesspointService: AccesspointService
  ) {}

  ngOnInit(): void {}

  pageChange(event: any): void {
    this.page = event;
    // console.log(this.page)

    const data = {
      page: this.page,
      limit: this.limit,
    };

    // console.log(data)

    this.apiRTN.getSumaVB(data).subscribe(
      (res) => {
        this.sumaVVB = res.sumasVentas;
        // console.log(res)
        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
        // console.log(this.currentPage)
        // console.log(this.totalPages)

        this.sumaVVB = this.sumaVVB.filter((item) => {
          // console.log(item.userId);
          // console.log(item)

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

          return item.userId;
        });
      },
      (error) => {
        console.error('Error data not found', error);
      }
    );
    // this.ngOnInit();
  }

  genPdf() {
    const elementToPrint: any = document.getElementById('bitacora');

    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL(
        'https://res.cloudinary.com/dck9p8oly/image/upload/v1708054346/kxm8xrobc6i1ypjl2ra2.png'
      );
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('reporteVentasBrutasBit.pdf');
      alert('Reporte generado con éxito');
    });
  }
  

}
