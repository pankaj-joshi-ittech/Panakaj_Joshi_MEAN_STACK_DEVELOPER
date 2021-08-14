import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const api_url = `http://localhost:5000/api/`;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  productNames: string[] = [
      "Bamboo Watch", 
      "Black Watch", 
      "Blue Band", 
      "Blue T-Shirt", 
      "Bracelet", 
      "Brown Purse", 
      "Chakra Bracelet",
      "Galaxy Earrings",
      "Game Controller",
      "Gaming Set",
      "Gold Phone Case",
      "Green Earbuds",
      "Green T-Shirt",
      "Grey T-Shirt",
      "Headphones",
      "Light Green T-Shirt",
      "Lime Band",
      "Mini Speakers",
      "Painted Phone Case",
      "Pink Band",
      "Pink Purse",
      "Purple Band",
      "Purple Gemstone Necklace",
      "Purple T-Shirt",
      "Shoes",
      "Sneakers",
      "Teal T-Shirt",
      "Yellow Earbuds",
      "Yoga Mat",
      "Yoga Set",
  ];

  constructor(private http: HttpClient) { }

  getStudents():Observable<any>{
      return this.http.get(`${api_url}student/get-student`)
  }

  saveStudent(data:any):Observable<any>{
      return this.http.post(`${api_url}student/add-student`,data)
  }
  updateStudent(s_id:string,data:any):Observable<any>{
      return this.http.patch(`${api_url}student/update-student/${s_id}`,data)
  }

  deleteStudent(studentId:any):Observable<any>{
      return this.http.delete(`${api_url}student/delete-student/${studentId}`)
  }

  getProductsSmall() {
      return this.http.get<any>('assets/customer.json')
      .toPromise()
      .then(res =>res.data)
      .then(data => { return data; });
  }

  getProducts() {
      return this.http.get<any>('assets/customer.json')
      .toPromise()
      .then(res =>res.data)
      .then(data => { return data; });
  }

  getProductsWithOrdersSmall() {
      return this.http.get<any>('assets/customer.json')
      .toPromise()
      .then(res =>res.data)
      .then(data => { return data; });
  }

  generatePrduct(): any {
      const product: any =  {
          id: this.generateId(),
          name: this.generateName(),
          description: "Product Description",
          price: this.generatePrice(),
          quantity: this.generateQuantity(),
          category: "Product Category",
          inventoryStatus: this.generateStatus(),
          rating: this.generateRating()
      };

      product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
      return product;
  }

  generateId() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
      for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      
      return text;
  }

  generateName() {
      return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
      return Math.floor(Math.random() * Math.floor(299)+1);
  }

  generateQuantity() {
      return Math.floor(Math.random() * Math.floor(75)+1);
  }

  generateStatus() {
      return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
      return Math.floor(Math.random() * Math.floor(5)+1);
  }
}
