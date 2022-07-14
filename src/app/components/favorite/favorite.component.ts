import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullPets();
    this.pullFavorite();
  }

  favoriteInfos: any = {};
  deleteFavorite(i) {
    this.favoriteInfos.fav_id = i;

    this.ds.sendRequest("deleteFavorite", this.favoriteInfos).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Removed',
        showConfirmButton: false,
        timer: 1500
      })
      this.pullFavorite();
    });
  }


  pets: any;
  pullPets() {
    this.ds.sendRequest("pets", null).subscribe((res) => {
      this.pets = res.payload;
    });
  }

  favoriteInfo : any = {};

  favorites: any;
  isFavorite: any;
  pullFavorite() {
    this.favoriteInfo.user_id = localStorage.getItem('user_id');
    this.ds.sendRequest("favorite", this.favoriteInfo).subscribe((res) => {
      this.favorites = res.payload;
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
