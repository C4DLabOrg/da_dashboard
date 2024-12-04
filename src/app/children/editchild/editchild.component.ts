import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ChildRegistration } from './child';
import { Response } from '@angular/http';
import {EditchildService} from './editchild.service';
import {ChildService} from '../individual/child.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'edit-child',
  templateUrl: './editchild.component.html',
  styleUrls: ['./editchild.component.scss'],
  providers: [EditchildService, ChildService]

})


export class EditchildComponent implements OnInit {
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

  firstname:any;
  midname:any;
  lastname:any;
  emiscode:any;
  mode_of_transport:any;
  previousClass:any;
  time_to_school:any;
  staywith:any;
  household:any;
  meals:any;
  dob:any;
  enrolDate:any;
  inSchool:any;
  phone:any;
  guardian:any;
  admNo:any;
  is_oosc:any;
  class:any;
  genderAcronym:any;
  gender:any;
  is_oosc_value:any;

  constructor(
    private _childRegistrationService: EditchildService,
    private childService: ChildService,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ){
    this.form = this.fb.group({
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

sub:any;

  ngOnInit(){
    //this.onSubmit;
    this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
    this.partnerId = JSON.parse(localStorage.getItem('partnerId'));

    this.sub = this.route.params.subscribe(params => {
       let childId = +params['id'];
       this.getChildData(childId);
    });


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
  
  
  public getChildData(id){
    this.childService.fetchChild(id).subscribe(
      (data)  =>
      {
        console.log(data);

        this.firstname = data.fstname;
        this.midname = data.midname;
        this.lastname = data.lstname;
        this.emiscode = data.emis_code;
        this.schoolName = data.school_name;
        this.meals = data.meals_per_day;
        this.class = data.class_name;
        this.is_oosc = data.is_oosc;
        this.household = data.household;
        this.enrolDate = data.date_enrolled;
        this.previousClass = data.previous_class;
        this.staywith = data.stay_with;
        this.mode_of_transport = data.mode_of_transport;
        this.time_to_school = data.time_to_school;
        this.dob = data.date_of_birth;
        this.admNo = data.admission_no

        if(data.is_oosc = 'false'){
          this.is_oosc_value = 'false'
          this.is_oosc = 'No'
        }else{
          this.is_oosc_value = 'true'
          this.is_oosc = 'Yes'
        }
        if(data.gender == 'M'){
          this.genderAcronym = 'M'
          this.gender = 'Male'
        }else{
          this.genderAcronym = 'F'
          this.gender = 'Female'
        }

        if(data.mode_of_transport == "NS"){
          this.mode_of_transport = "N/A";
        }else{
          this.mode_of_transport = data.mode_of_transport;
        }

        if(data.time_to_school == "NS"){
          this.time_to_school = "N/A";
        }else{
          this.time_to_school = data.time_to_school;
        }

        if(data.stay_with == "NS"){
          this.staywith = "N/A";
        }else{
          this.staywith = data.stay_with;
        }

      },
      error =>{

        let errorSearch = 'Id  not found';
      }
    );
  }


  onSubmit(registerChild: ChildRegistration){
    if(!this.submitted){

      //edit
    }else{
      this.school = new ChildRegistration(
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

                      school_name: localStorage.getItem('schoolEdit'),
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
                data => 
                {
                  this.success = "Edited Child Successfully";
                  this.form.reset();
                },
                error =>{
                  console.log(error);
                  this.fail = "Failed to save data";
                }
              );
          }
}

  resetButton(){
    this.form.reset();
  }

  navigateBack(){
    //console.log('navigateBack');
    localStorage.removeItem('schoolEdit');
    this.router.navigate(['/children/view-children']);
    //this.form.reset();
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
