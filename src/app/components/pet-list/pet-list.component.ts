import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullPets();
    this.pullFavorite();
  }

  isAdmin = localStorage.getItem("isAdmin");
  user_name = localStorage.getItem("user_name");
  user_ids = localStorage.getItem("user_id")

  @ViewChild('BuyItem', { static: true }) BuyItem: TemplateRef<any>;

  pet: any;
  image: any;
  breed: any;
  price: any;
  description: any;
  quantity: any;
  openBuy(i) {
    this.dialog.open(this.BuyItem)

    this.pet = i;
    this.image = i.pet_img;
    this.breed = i.pet_breed;
    this.price = i.pet_price;
    this.description = i.pet_description;
    this.quantity = i.quantity;

  }

  total = 0;
  count = 0;
  counter(type: string) {
    type==='add'?this.count++:this.count--;
    this.total = this.count * this.price;
  }

  cartInfo: any = {}
  addCart() {
    this.cartInfo.user_id = localStorage.getItem('user_id');
    this.cartInfo.pet_breed = this.breed;
    this.cartInfo.pet_img = this.image;
    this.cartInfo.pet_price = this.price;
    this.cartInfo.pet_quantity = this.count;
    this.cartInfo.total = this.price * this.count;

    console.log(this.cartInfo)

    this.ds.sendRequest("addCart", this.cartInfo).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added to Cart',
        showConfirmButton: false,
        timer: 1500
      })
      this.count = 0;
      this.dialog.closeAll();
    });

  }
  

  pets: any;
  pullPets() {
    this.ds.sendRequest("pets", null).subscribe((res) => {
      this.pets = res.payload;
    });
  }

  favorites: any;
  isFavorite: any;
  pullFavorite() {
    this.favoriteInfo.user_id = localStorage.getItem('user_id');
    this.ds.sendRequest("favorite", this.favoriteInfo).subscribe((res) => {
      this.favorites = res.payload;
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


  favoriteInfo : any = {};
  addFavorite(pets) {
    this.favoriteInfo.pet_id = pets.pet_id;
    this.favoriteInfo.pet_breed = pets.pet_breed;
    this.favoriteInfo.pet_price = pets.pet_price;
    this.favoriteInfo.pet_img = pets.pet_img;
    this.favoriteInfo.user_id = localStorage.getItem('user_id');
    this.favoriteInfo.isFavorite = 1;

    this.ds.sendRequest("addFavorite", this.favoriteInfo).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item saved to Favorite',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(['/favorite'])
    });

  }

}
