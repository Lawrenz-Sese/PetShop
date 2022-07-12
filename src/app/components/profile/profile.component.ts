import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullUser()
  }

  isDisabled: boolean = true;
  enabled() {
    this.isDisabled = false
  }

  disabled() {
    this.isDisabled = true;
  }

  user: any;
  name: any;
  address: any;
  email: any;
  contact: any;
  userInfo: any ={};
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

  isAdmin = localStorage.getItem('isAdmin');
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

}
