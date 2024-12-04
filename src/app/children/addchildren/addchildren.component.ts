import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ChildRegistration } from './children';
import { Response } from '@angular/http';
import {AddChildrenService} from './addchildren.service';

@Component({
  selector: 'add-child',
  templateUrl: './addchildren.component.html',
  styleUrls: ['./addchildren.component.scss'],
  providers: [AddChildrenService]

})


export class AddChildrenComponent implements OnInit {
  editing = {};
  rows = [];
  cl:any;
  sch:any;
  public currentDate = new Date();
  public success;
  public fail;
  public empty;
  public schoolClasses;
  public submitted: boolean =  true;
  public school: ChildRegistration;
  public form: FormGroup;
  schoolId:number;
  partnerId:number;
  schools:any;
  schoolName:any;
  schoolPartnerId:any;
  schoolNames = [];

  constructor(
    private _childRegistrationService: AddChildrenService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      schoolName: [null],
      firstName: [null, Validators.compose([Validators.required,])],
      maidenName: [null],
      lastName: [null, Validators.compose([Validators.required,])],
      gender: [null, Validators.compose([Validators.required])],
      admNo: [null],
      enrolDate: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      dateOfBirth: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      className: [null, Validators.compose([Validators.required])],
      previousClass: [null, Validators.compose([Validators.required, CustomValidators.number])],
      notInSchool: [null, Validators.compose([Validators.required])],
      modeOfTransport: [null],
      timeToSchool: [null],
      stayWith: [null],
      householdNumber: [null],
      mealsInDay: [null]
    });
  }



  ngOnInit(){
    //this.onSubmit;
    this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
    this.partnerId = JSON.parse(localStorage.getItem('partnerId'));

    if(this.schoolId){
      //console.log(this.schoolId);
      this.getSchoolClasses(this.schoolId);
      this.getSchoolName(this.schoolId);
    }else if(this.partnerId){

      //this.getSchoolClasses(this.schools.id);
      this.getPartnerSchools(this.partnerId);
      //this.getSchoolClasses(this.schools.id);
    }

  }
  
  onSubmit(registerChild: ChildRegistration){
    if(!this.submitted){

      //edit
    }else{
      if(this.schoolId){

          this.school = new ChildRegistration(
                                registerChild.schoolName,
                                registerChild.firstName,
                                registerChild.maidenName,
                                registerChild.lastName,
                                registerChild.admNo,
                                registerChild.enrolDate,
                                registerChild.gender,
                                registerChild.dateOfBirth,
                                registerChild.className,
                                registerChild.previousClass,
                                registerChild.notInSchool,
                                registerChild.modeOfTransport,
                                registerChild.timeToSchool,
                                registerChild.stayWith,
                                registerChild.householdNumber,
                                registerChild.mealsInDay
                              );

          this._childRegistrationService.sendData({
                      school_name:this.schoolName,
                      fstname: registerChild.firstName,
                      midname: registerChild.maidenName,
                      lstname: registerChild.lastName,
                      admission_no: registerChild.admNo,
                      date_enrolled: registerChild.enrolDate,
                      gender: registerChild.gender,
                      date_of_birth: registerChild.dateOfBirth,
                      class_id: registerChild.className,
                      previous_class: registerChild.previousClass,
                      not_in_school_before: registerChild.notInSchool,
                      mode_of_transport: registerChild.modeOfTransport,
                      time_to_school: registerChild.timeToSchool,
                      stay_with: registerChild.stayWith,
                      household: registerChild.householdNumber,
                      meals_per_day: registerChild.mealsInDay
              })
              .subscribe(
                data => //console.log(data)
                {
                  //console.log("Added Child Successfully"),
                  this.success = "Added Child Successfully";
                  this.form.reset();
                },
                error =>{
                  console.log(error);
                  this.empty = "This field is required";
                  this.fail = "Failed to save data";
                }
              );
      }else{
      this.school = new ChildRegistration(
                            registerChild.schoolName,
                            registerChild.firstName,
                            registerChild.maidenName,
                            registerChild.lastName,
                            registerChild.admNo,
                            registerChild.enrolDate,
                            registerChild.gender,
                            registerChild.dateOfBirth,
                            registerChild.className,
                            registerChild.previousClass,
                            registerChild.notInSchool,
                            registerChild.modeOfTransport,
                            registerChild.timeToSchool,
                            registerChild.stayWith,
                            registerChild.householdNumber,
                            registerChild.mealsInDay
                          );

      this._childRegistrationService.sendData({
                  school_name: registerChild.schoolName,
                  fstname: registerChild.firstName,
                  midname: registerChild.maidenName,
                  lstname: registerChild.lastName,
                  admission_no: registerChild.admNo,
                  date_enrolled: registerChild.enrolDate,
                  gender: registerChild.gender,
                  date_of_birth: registerChild.dateOfBirth,
                  class_id: registerChild.className,
                  previous_class: registerChild.previousClass,
                  not_in_school_before: registerChild.notInSchool,
                  mode_of_transport: registerChild.modeOfTransport,
                  time_to_school: registerChild.timeToSchool,
                  stay_with: registerChild.stayWith,
                  household: registerChild.householdNumber,
                  meals_per_day: registerChild.mealsInDay
          })
          .subscribe(
            data => //console.log(data)
            {
              //console.log("Added Child Successfully"),
              this.success = "Added Child Successfully";
              this.form.reset();
            },
            error =>{
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
          );
        }
      }
  }

  resetButton(){
    this.form.reset();
  }

  getPartnerSchools(id){
      this._childRegistrationService.fetchPartnerSchools(id).subscribe(res =>{

        res = res.results;
        this.schools = [];
        for(let i =0; i<res.length;i++){
          this.sch = {};
          this.sch.school_name = res[i].school_name;
          this.sch.id = res[i].id;
          this.schoolNames.push(this.sch.school_name);
          this.schools.push(this.sch);
        }
        // console.log(this.schools);
      });
  }

@Output() public selected = new EventEmitter();

  doCheck(event){
       let schoolSelectedId = this.schools.filter(ct=>ct.school_name==event);
       let schoolid=schoolSelectedId.length >0?schoolSelectedId[0].id:null
       if(schoolid){
         this.getSchoolClasses(schoolSelectedId[0].id);
       }
       
      
  }

  getSchoolName(id){
    this._childRegistrationService.fetchSchoolName(id).subscribe(res =>{

      res = res.results;
      this.schoolName = res.school_name;
    });
  }
  getSchoolClasses(id){
    this._childRegistrationService.getClass(id)
      .subscribe(
        (res)=>{
          console.log(res, 'dffdf');
          res = res.results
          const className = [];
          for (let i = 0;i < res.length;i++){
            this.cl = {}
            this.cl.class_name=res[i].class_name
            this.cl.id=res[i].id
            className.push(this.cl)
          }
          this.schoolClasses = className;
        },
      (err) => {//console.log(err)
      }
    );
  }
}
