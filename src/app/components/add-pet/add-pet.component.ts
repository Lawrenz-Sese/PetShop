import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "src/app/service/data.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {

  constructor(
    public route: Router,
    private ds: DataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pullPets();
  }

  @ViewChild('AddPet', { static: true }) AddPet: TemplateRef<any>;
  @ViewChild('EditPet', { static: true }) EditPet: TemplateRef<any>;

  pet: any;
  pet_id: any;
  pet_breeds: any;
  quantitys: any;
  pet_prices: any;
  pet_categorys: any;
  pet_descriptions: any;
  imgSrcs: any;
  petBreed: any;


  editPet(i) {
    this.dialog.open(this.EditPet)

    this.pet = i;
    this.pet_id = i.pet_id;
    this.pet_breeds = i.pet_breed;
    this.quantitys = i.quantity;
    this.pet_prices = i.pet_price;
    this.pet_categorys = i.pet_category;
    this.pet_descriptions = i.pet_description;
    this.imgSrc = i.pet_img;

    this.petBreed = i.pet_breed;
  }

  updatePets() {
    this.petInfo.pet_id = this.pet_id;
    this.petInfo.pet_breed = this.pet_breeds;
    this.petInfo.quantity = this.quantitys;
    this.petInfo.pet_price = this.pet_prices;
    this.petInfo.pet_category = this.pet_categorys;
    this.petInfo.pet_description = this.pet_descriptions;
    this.petInfo.pet_img = this.imgSrc;
    
    this.ds.sendRequest("updatePets", JSON.parse(JSON.stringify(this.petInfo))).subscribe((data: any) => {
      this.pullPets();
    });
    this.dialog.closeAll();
  }

  closeModal() {
    this.dialog.closeAll();
  }

  addPet() {
    this.dialog.open(this.AddPet);
  }

  pet_breed: any;
  quantity: any;
  pet_category: any;
  pet_price: any;
  pet_description: any;
  petInfo: any = {};

  addPets() {
    this.petInfo.pet_breed = this.pet_breed;
    this.petInfo.quantity = this.quantity;
    this.petInfo.pet_price = this.pet_price;
    this.petInfo.pet_category = this.pet_category;
    this.petInfo.pet_description = this.pet_description;
    this.petInfo.pet_img = this.imgSrc;

    this.ds.sendRequest("addPet", JSON.parse(JSON.stringify(this.petInfo))).subscribe((data: any) => {

    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'New Pet Added',
      showConfirmButton: false,
      timer: 1500
    })
    this.dialog.closeAll();
    this.pullPets();
  }

  pets: any;
  pullPets() {
    this.ds.sendRequest("pets", null).subscribe((res) => {
      this.pets = res.payload;
    });
  }

  deletePet(e) {
    this.petInfo.pet_id = e;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.sendRequest("deletePets", JSON.parse(JSON.stringify(this.petInfo))).subscribe((data: any) => {

        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.pullPets();
      }
    })
  }

  imgSrc: string = "assets/visual/add-img.png";
  onUploadHandler(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      }
    }
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
