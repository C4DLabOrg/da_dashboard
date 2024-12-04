import {Directive, EventEmitter, Input,Output,Component, OnInit,ElementRef} from '@angular/core';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

import { ClassRoutes } from '../class.routing';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Response } from '@angular/http';
import { ClassService} from '../class.service';
import { ClassRegistration} from '../class';

/*
@Directive({
  selector: '[focus]'
})*/

@Component({
  selector: 'add-school',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss'],
  providers: [ClassService],

})


export class AddClassComponent implements OnInit {
  editing = {};
  rows = [];

  constructor(
    private classService: ClassService,
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
  public school = JSON.parse(localStorage.getItem('schoolId'));
  public t_type;
  public currentDate = new Date();
  public submitted: boolean =  true;
  public form: FormGroup;
  public rclass;
  public generic_classes : number[];

  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      class_id: [null, Validators.compose([Validators.required])],
      class_name: [null]

    });
    this.getClasses();

  }

  onSubmit(registerClass: ClassRegistration){

    if(!this.submitted){

    }else{
      this.rclass = new ClassRegistration(
                        registerClass.class_id,
                        registerClass.class_name
                      );

        if(registerClass.class_name == null){
          this.classService.sendData({

                  	class_name: registerClass.class_id,
                  	_class: registerClass.class_id,
                  	school:  this.school

              }).subscribe(
                data => //console.log(data)
                {
                  //console.log("Added Classes Successfully"),
                  this.success = "Added Classes Successfully";
                  this.resetButton();
                },
                error => {
                  this.fail = "Failed to save data. Kindly try again later.";
                }
              );
        }else{
        this.classService.sendData({
                	class_name: registerClass.class_id+' '+registerClass.class_name,
                	_class: registerClass.class_id,
                	school:  this.school

            }).subscribe(
              data => //console.log(data)
              {
                //console.log("Added Classes Successfully"),
                this.success = "Added Classes Successfully";
                this.resetButton();
              },
              error => {
                console.log(error);
                this.fail = "Failed to save data. Kindly try again later.";
              }
            );
          }
        }
  }

  resetButton(){
    this.form.reset();
  }

  showInput(){
    this.isVisible = this.isVisible ? false : true;
  }
  public getClasses(){
    this.generic_classes = [1,2,3,4,5,6,7,8];
  }

}
