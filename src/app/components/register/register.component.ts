import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  MatDialog,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
// import 'sweetalert2/src/sweetalert2.scss';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private ds: DataService,
    public route: Router,
    public dialog: MatDialog
  ) {}

  @ViewChild('spinnerDialog', { static: true }) spinnerDialog: TemplateRef<any>;
  @ViewChild('verifyModal', { static: true }) verifyModal: TemplateRef<any>;

  ngOnInit(): void {}

  show: boolean = false;
  password() {
    this.show = !this.show;
  }

  user_name: any;
  user_address: any;
  user_contact: any;
  user_email: any;
  user_password: any;
  verificationCode: any;
  verificationInfo: any = {};
  otp: any;
  userInfo: any = {};

  register() {
    this.userInfo.user_name = this.user_name;
    this.userInfo.user_address = this.user_address;
    this.userInfo.user_contact = this.user_contact;
    this.userInfo.user_email = this.user_email;
    this.userInfo.user_password = this.user_password;
    this.userInfo.user_otp = Math.floor(
      Math.pow(10, 6 - 1) + Math.random() * 9 * Math.pow(10, 6 - 1)
    );
    const dialogRef = this.dialog.open(this.spinnerDialog, {
      disableClose: true,
    });

    dialogRef.afterOpened().subscribe((res: any) => {
      this.ds
        .sendRequest(
          'regUser',

          JSON.parse(JSON.stringify(this.userInfo))
        )
        .subscribe((res: any) => {
          switch (res.code) {
            case 200:
              this.ds
                .sendRequest(
                  'userEmailVerification',
                  JSON.parse(JSON.stringify(this.userInfo))
                )
                .subscribe((data: any) => {
                  switch (data.code) {
                    case 200:
                      dialogRef.close(this.spinnerDialog);
                      dialogRef.afterClosed().subscribe((res: any) => {
                        this.dialog.open(this.verifyModal);
                      });
                      break;

                    default:
                      break;
                  }
                });

              break;

            default:
              dialogRef.close(this.spinnerDialog);
              dialogRef.afterClosed().subscribe((res: any) => {
                Swal.fire({
                  title: 'Error!',
                  text: 'Register failed.',
                  icon: 'error',
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Okay!',
                }).then((result) => {});
              });
              break;
          }
        });
    });
  }

  verifyUser() {
    this.verificationInfo.otpCode = this.verificationCode;
    this.verificationInfo.user_email = this.user_email;
    this.ds
      .sendRequest(
        'verifyUserCode',
        JSON.parse(JSON.stringify(this.verificationInfo))
      )
      .subscribe((data: any) => {
        console.log(data);
        switch (data.status.remarks) {
          case 'success':
            this.dialog.closeAll();
            Swal.fire({
              title: 'Verification success!',
              text: 'You may now login.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Okay!',
            }).then((result) => {});
            break;

          default:
            Swal.fire({
              title: 'Error!',
              text: 'Verification failed.',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Okay!',
            }).then((result) => {});
            break;
        }
      });
  }
}
