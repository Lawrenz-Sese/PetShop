import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullCart();
    this.pullUser();
    this.getTotal();
    this.getQuant();
  }

  isAdmin = localStorage.getItem("isAdmin");
  user_name = localStorage.getItem("user_name");

  userInfo: any = {};
  cart: any;
  cartCounter = 0;
  pullCart() {
    this.userInfo.user_id = localStorage.getItem('user_id');
    this.ds.sendRequest("cart", this.userInfo).subscribe((res) => {
      this.cart = res.payload;
      this.getTotal();
      this.getQuant();
      for (let i = 0; i <= this.cart.length; i++) {
        this.cartCounter = i;
      }

      if (this.cart != null) {

      }
    });

  }

  totalamount: number = 0;
  getTotal() {
    let total = 0;
    if (this.cart != null) {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].total) {
          // get total amount of the petucts inside the threecart items
          total += this.cart[i].total
          this.totalamount = total;
        }
      }

      return this.totalamount;
    }
  }

  totalquant: number = 0;
  getQuant() {
    let total = 0;
    if (this.cart != null) {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].pet_quantity) {
          // get total amount of the petucts inside the threecart items
          total += this.cart[i].pet_quantity
          this.totalquant = total;
        }
      }

      return this.totalamount;
    }
  }



  user: any;
  name: any;
  address: any;
  email: any;
  contact: any;
  pullUser() {
    this.userInfo.user_id = localStorage.getItem('user_id');
    this.ds.sendRequest("user", this.userInfo).subscribe((res) => {
      this.user = res.payload;

      this.name = this.user[0].user_name;
      this.contact = this.user[0].user_contact;
      this.address = this.user[0].user_address;
      this.email = this.user[0].user_email;

    });
  }

  cartInfo: any = {}
  deleteCart(i) {
    this.cartInfo.cart_id = i;
    this.ds.sendRequest("deleteCart", this.cartInfo).subscribe((res) => {
      alert('Cart Item Removed');
      this.pullCart();
    });

    console.log(this.cartInfo)
  }

  checkoutInfo: any = {};
  checkoutDetails: any = {};
  code: any;

  checkout() {
    this.checkoutInfo.user_id = localStorage.getItem('user_id')
    this.checkoutInfo.user_name = this.name;
    this.checkoutInfo.user_address = this.address;
    this.checkoutInfo.user_contact = this.contact;
    this.checkoutInfo.user_email = this.email;

    var seq = (Math.floor(100000000 + Math.random() * 900000000)).toString().substring(1);
    this.checkoutInfo.code = this.code = seq;

    this.checkoutInfo.total = this.totalamount;
    this.checkoutInfo.quantity = this.totalquant;

    Swal.fire({
      title: 'Checkout all items?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {

        for (let i = 0; i < this.cart.length; i++) {
          this.cartInfo.cart_id = this.cart[i].cart_id;
          this.checkoutDetails.code = this.code = seq;
          this.checkoutDetails.pet_breed = this.cart[i].pet_breed;
          this.checkoutDetails.pet_image = this.cart[i].pet_img;
          this.checkoutDetails.pet_price = this.cart[i].pet_price;
          this.checkoutDetails.pet_total = this.cart[i].total;
          this.checkoutDetails.pet_quantity = this.cart[i].pet_quantity;

          this.ds.sendRequest("addCheckoutDetails", this.checkoutDetails).subscribe((res) => {

          });

          this.ds.sendRequest("deleteCart", this.cartInfo).subscribe((res) => {

          });


        }

        this.ds.sendRequest("addCheckout", this.checkoutInfo).subscribe((res) => {
          this.route.navigate(['/checkout'])
        });
        Swal.fire(
          'All Items Checkout!',
          'success'
        )
      }
    })
  }
  checkoutsoloInfo : any ={};
  checkoutSolo(cart) {
    this.checkoutsoloInfo.user_id = localStorage.getItem('user_id')
    this.checkoutsoloInfo.user_name = this.name;
    this.checkoutsoloInfo.user_address = this.address;
    this.checkoutsoloInfo.user_contact = this.contact;
    this.checkoutsoloInfo.user_email = this.email;

    var seq = (Math.floor(100000000 + Math.random() * 900000000)).toString().substring(1);
    this.checkoutsoloInfo.code = this.code = seq;

    this.checkoutsoloInfo.total = this.totalamount;
    this.checkoutsoloInfo.quantity = this.totalquant;

    this.cartInfo.cart_id = cart.cart_id;
    this.checkoutDetails.code = this.code = seq;
    this.checkoutDetails.pet_breed = cart.pet_breed;
    this.checkoutDetails.pet_image = cart.pet_img;
    this.checkoutDetails.pet_price = cart.pet_price;
    this.checkoutDetails.pet_total = cart.total;
    this.checkoutDetails.pet_quantity = cart.pet_quantity;

    this.ds.sendRequest("addCheckout", this.checkoutsoloInfo).subscribe((res) => {

    });

    this.ds.sendRequest("addCheckoutDetails", this.checkoutDetails).subscribe((res) => {

    });

    this.ds.sendRequest("deleteCart", this.cartInfo).subscribe((res) => {
      this.route.navigate(['/checkout'])
    });

    console.log(this.cartInfo)
  }

  showFiller = false;
  sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 769) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.clear();
    this.route.navigate(['']);
  }

  isDisabled: boolean = true;
  enabled() {
    this.isDisabled = false
  }

  disabled() {
    this.isDisabled = true;
  }


}
