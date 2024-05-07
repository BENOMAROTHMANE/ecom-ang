import { Component } from '@angular/core';
import { PdfService } from '../_services/pdf.service';
import { ProductInfo } from '../_model/product-info.model';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {

  productInfo: ProductInfo = { products: [] };

  constructor(private pdfService: PdfService) { }
 
  generatePdf() {
    this.pdfService.generatePdf(this.productInfo).subscribe(
      (pdfContent: string) => {
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'products.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
      },
      error => {
        console.error('Error generating PDF:', error);
      }
    );
  }
}
