import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullPets();
    this.pullCart();
  }

  isAdmin = localStorage.getItem("isAdmin");
  user_name = localStorage.getItem("user_name");

  pets: any;
  userInfo: any = {};
  pullPets() {
    this.ds.sendRequest("pets", null).subscribe((res) => {
      this.pets = res.payload;
    });
  }

  cart: any;
  cartCounter = 0;
  pullCart() {
    this.userInfo.user_id = localStorage.getItem('user_id');
    this.ds.sendRequest("cart", this.userInfo).subscribe((res) => {
      this.cart = res.payload;

      for (let i = 0; i <= this.cart.length; i++) {
        this.cartCounter = i;
      }
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
