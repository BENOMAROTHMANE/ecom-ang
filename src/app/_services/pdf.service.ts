import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInfo } from "../_model/product-info.model";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private baseUrl = 'http://localhost:9090'; // Update with your server URL

  constructor(private http: HttpClient) { }

  generatePdf(productInfo: ProductInfo): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/generate-pdf`, productInfo, { responseType: 'text' as 'json' });
  }
  
}
