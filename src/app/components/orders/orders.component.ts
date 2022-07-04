import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullOrders()
  }

  orders: any;
  pullOrders() {
    this.ds.sendRequest("orders", null).subscribe((res) => {
      this.orders = res.payload;
      this.dataSource.data = this.orders;

      console.log(this.orders)
    });
  }

  @ViewChild('ViewOrders', { static: true }) ViewOrders: TemplateRef<any>;

  code: any;
  checkoutDetails: any = {};
  checkoutInfo: any ={};
  openView(e) {
    this.dialog.open(this.ViewOrders);

    this.code = e;
    this.checkoutInfo.code = this.code;
    this.ds.sendRequest("checkoutDetails", this.checkoutInfo).subscribe((res) => {
      this.checkoutDetails = res.payload;

      console.log(this.checkoutDetails)
    });

  }

  orderInfo: any = {};
  approveOrder(checkoutDetails) {
    this.orderInfo.code = checkoutDetails[0].code;
    this.orderInfo.isApproved = 1;

    this.ds.sendRequest("approveOrder", this.orderInfo).subscribe((res) => {});

    console.log(this.orderInfo)
  }

  declineOrder(checkoutDetails) {
    this.orderInfo.code = checkoutDetails[0].code;
    this.orderInfo.isApproved = 2;

    this.ds.sendRequest("approveOrder", this.orderInfo).subscribe((res) => {});

    console.log(this.orderInfo)
  }

  isAdmin = localStorage.getItem("isAdmin");
  user_name = localStorage.getItem("user_name");

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


  checkoutInfos: Orders[] = [];


  displayedColumns: string[] = [
    'Customer',
    'Contact',
    'Address',
    'Code',
    'Total',
    'Date',
    'Action'
    
  ];
  dataSource = new MatTableDataSource(this.checkoutInfos);

}

export interface Orders {
  Customer: any;
  Contact: any;
  Address: any;
  Code: any;
  Total: any;
  Status: any;
  Date: any;
}
