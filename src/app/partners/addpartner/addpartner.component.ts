import {Directive, EventEmitter, Input,Output,Component, OnInit,ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

import { PartnersRoutes } from '../partners.routing';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Response } from '@angular/http';
import { AddpartnerService} from '../addpartner/addpartner.service';
import { PartnerRegistration} from '../partners';

/*
@Directive({
  selector: '[focus]'
})*/

@Component({
  selector: 'add-school',
  templateUrl: './addpartner.component.html',
  styleUrls: ['./addpartner.component.scss'],
  providers: [AddpartnerService],

})


export class AddPartnerComponent implements OnInit {
  editing = {};
  rows = [];

  constructor(
    private partnerService: AddpartnerService,
    public _router: Router,
    private fb: FormBuilder
  ){}

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  public success;
  public fail;
  public empty;
  public date;
  public isVisible;
  public submitted: boolean =  true;
  public form: FormGroup;
  public partner;

  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      partner_name: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required,CustomValidators.number])],
      email: [null, Validators.compose([Validators.required,CustomValidators.email])],

    });
  }

  onSubmit(registerPartner: PartnerRegistration){

    if(!this.submitted){

    }else{
      this.partner = new PartnerRegistration(
                    registerPartner.partner_name,
                    registerPartner.phone,
                    registerPartner.email
                  );

      this.partnerService.sendData({

              	name: registerPartner.partner_name,
              	phone: registerPartner.phone,
              	email: registerPartner.email

          }).subscribe(
            data => //console.log(data)
            {
              //console.log("Added Partner Successfully"),
              this.success = "Added Partner Successfully";
              this.resetButton();
            },
            error => {
              if(error.detail){
                this.fail = 'User with email already exits'
              }else{
                this.fail = 'Failed to add partner. Try again later';
              }


              if(error.name[0]){
                this.fail = error.name[0]
              }else{
                this.fail = 'Failed to add partner. Try again later';
              }
            }
          );
        }
  }

  resetButton(){
    this.form.reset();
  }

  showInput(){
    this.isVisible = this.isVisible ? false : true;
  }

}
