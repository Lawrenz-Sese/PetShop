import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(  private ds: DataService, public route: Router ) { }

  ngOnInit(): void {
  }

  show: boolean = false;
  password() {
    this.show = !this.show;
  }


  user_name : any;
  user_address : any;
  user_contact : any;
  user_email: any;
  user_password : any;

  userInfo : any = {};

  register() {
    this.userInfo.user_name = this.user_name;
    this.userInfo.user_address = this.user_address;
    this.userInfo.user_contact = this.user_contact;
    this.userInfo.user_email = this.user_email;
    this.userInfo.user_password = this.user_password;


    console.log(this.userInfo)

    this.ds.sendRequest("regUser", JSON.parse(JSON.stringify(this.userInfo))).subscribe((data: any) => {
    
    });
  }

}
