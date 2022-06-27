import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private ds: DataService, public route: Router  ) { }

  ngOnInit(): void {
  }

  show: boolean = false;
  password() {
    this.show = !this.show;
  }

  userInfo : any = {};
  user_email: any;
  user_password: any;

  loginUser() {
    this.userInfo.user_email = this.user_email;
    this.userInfo.user_password = this.user_password;

    this.ds.sendRequest("login", this.userInfo).subscribe(res => {

      if (res.payload == null) {
        alert('Incorrect Credentials')
      }
      else {

        localStorage.setItem("user_name", res.payload.user_name);
        localStorage.setItem("user_contact", res.payload.user_contact);
        localStorage.setItem("user_address", res.payload.user_address);
        localStorage.setItem("user_email", res.payload.user_email);
        localStorage.setItem("user_id", res.payload.user_id);
        localStorage.setItem("isAdmin", res.payload.isAdmin);
        alert('Login Successfully')
        this.route.navigate(["/dashboard"]);
      }
    });
  }

}
