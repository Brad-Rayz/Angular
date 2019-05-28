import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MyServiceListService } from "../my-service-list.service";

@Component({
  selector: "app-registerform",
  templateUrl: "./registerform.component.html",
  styleUrls: ["./registerform.component.css"],
  providers: [MyServiceListService]
})
export class RegisterformComponent implements OnInit {
  productList = [];
  productListFixed = [];
  Filtername: any;
  ProductListFiltered = [];
  constructor(private _service: MyServiceListService) {}
  ngOnInit() {
    this._service.getConsignmentByStatusExcept().subscribe(data => {
      // this.productList = data.products;
      console.log(data.products);
      console.log(data.count);
      // console.log(data.products[12].subcategory)
      for (let i = 0; i < 8000; i++) {
        // if (data.products[i] !== undefined) {
        // console.log(data.products[i].subcategory)
        // }
        if (data.products[i] !== undefined) {
          const reqBody = {
            subcategory: data.products[i].subcategory,
            title: data.products[i].title,
            price: data.products[i].price,
            popularity: Number(data.products[i].popularity)
          };
          this.productList.push(reqBody);
        }
      }
      // this.productListFixed = this.productList
      this.productList.sort(predicateBy("popularity"))
      this.ProductListFiltered = this.productList;
      console.log(this.productList);
    });

    function predicateBy(prop){
      return function(a,b){
         if( a[prop] < b[prop]){
             return 1;
         }else if( a[prop] > b[prop] ){
             return -1;
         }
         return 0;
      }
   }

  }

  filter() {
    // console.log("done!")
    // console.log(this.Filtername);
    // this.ProductListFiltered = this.productList.filter(
    // product => product.title === this.Filtername);

    // console.log(typeof this.SearchOpt.toString())
    // console.log(this.obj[0].name.indexOf(this.SearchOpt) >= 0)
    const searchString = this.Filtername;
    const searchRegExp = new RegExp(searchString, 'i');
    if (this.Filtername == null || this.Filtername == '') {
      console.log(this.Filtername);
      this.ProductListFiltered = this.productList;
    } else {
      console.log(this.Filtername);
      this.ProductListFiltered = this.productList.filter(function (el) {
        return searchRegExp.test(el.title); // Changed this so a home would match
      });
    }
    console.log(this.ProductListFiltered);

  }

}
