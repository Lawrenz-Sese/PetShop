import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullCheckout();
  }

  @ViewChild('ViewOrders', { static: true }) ViewOrders: TemplateRef<any>;

  code: any;
  checkoutDetails: any = {};
  openView(e) {
    this.dialog.open(this.ViewOrders);

    this.code = e;
    this.checkoutInfo.code = this.code;
    this.ds.sendRequest("checkoutDetails", this.checkoutInfo).subscribe((res) => {
      this.checkoutDetails = res.payload;

      console.log(this.checkoutDetails)
    });

  }

  isAdmin = localStorage.getItem("isAdmin");
  user_name = localStorage.getItem("user_name");
  
  checkout: any;
  checkoutInfo: any = {};
  pullCheckout() {
    this.checkoutInfo.user_id = localStorage.getItem('user_id');
    this.ds.sendRequest("checkout", this.checkoutInfo).subscribe((res) => {
      this.checkout = res.payload;

      console.log(this.checkout)
    });
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


}
