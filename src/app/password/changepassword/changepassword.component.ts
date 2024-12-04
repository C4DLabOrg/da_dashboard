import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ChangepasswordService} from './changepassword.service';
//import { Partner } from './partner';


import { FormBuilder, FormGroup, Validators, FormControl,FormsModule,AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ChangePassword } from './changepassword';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  providers: [ChangepasswordService]
})

export class ChangepasswordComponent implements OnInit {
  public submitted: boolean = true;
  public changePsd: ChangepasswordService;
  public form: FormGroup;
  public psd: ChangePassword;
  public error: any;
  public success;
  public fail;
  public empty;

    constructor(
      private _changePasswordService: ChangepasswordService,
      private fb: FormBuilder
    ){
      //this.onSubmit;
      this.form = this.fb.group({
        oldPassword: [null, Validators.compose([Validators.required,])],
        newPassword: [null, Validators.compose([Validators.required])],
        confirmPassword: [null, Validators.compose([Validators.required])],
      }, {
      validator: this.MatchPassword // confirm password validation method
    });
    }

  ngOnInit(){}

  onSubmit(changePsd: ChangePassword){
    if(!this.submitted){

      //edit
    }else{

      this.psd = new ChangePassword(
        changePsd.oldPassword,
        changePsd.newPassword,
        changePsd.confirmPassword
      );

      this._changePasswordService.sendData({
                  old_password: changePsd.oldPassword,
                  new_password: changePsd.newPassword,
    })
    .subscribe(
      data => //console.log(data)
      {
        this.success = "Changed Password Successfully";
        this.form.reset();
      },
      error =>{
        if(error.old_password[0]){
          this.fail = 'Kindly input the correct password';
        }else{
          this.fail = 'Failed to change password. Kindly try again later';
        }
      }
    );

    }
  }

  resetButton(){
    this.form.reset()
  }

  //confirmPassword
  MatchPassword(AC: AbstractControl) {
    let oldPassword = AC.get('oldPassword').value; //value of the old password
   let password = AC.get('newPassword').value; // value of the new password
   let confirmPassword = AC.get('confirmPassword').value; // value of the confirm password
    if(password != confirmPassword) {
        //console.log('false');
        AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
        //console.log('true');
        return null
    }
  }
}
