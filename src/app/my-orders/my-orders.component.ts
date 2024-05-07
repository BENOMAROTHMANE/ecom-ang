import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.model';
import { ProductService } from '../_services/product.service';
import { OrderDetails } from '../_model/order-details.model';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: []
  }

  displayedColumns = ["Name", "Address", "Contact No.","Quantity", "Amount", "Status"];

  myOrderDetails: MyOrderDetails[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }


  getQuantityForProduct(productId) {
    if (this.orderDetails && this.orderDetails.orderProductQuantityList) {
      const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
        (productQuantity) => productQuantity.productId === productId
      );
  
      if (filteredProduct.length > 0) {
        return filteredProduct[0].quantity;
      }
    }
    
    return 0; // or any default value if the product is not found
  }
  
  getOrderDetails() {
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = resp;
      }, (err)=> {
        console.log(err);
      }
    );
  }

}
