import {Directive, EventEmitter, Input,Output,Component, OnInit,ElementRef,ViewChildren} from '@angular/core';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

import { TeachersRoutes } from './../teachers.routing';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { TeacherRegistration } from './teacher';
import { Response } from '@angular/http';
import {AddTeacherService} from './addteacher.service';
import {ClassService} from '../../classes/class.service';
import {MdCheckbox} from '@angular/material';

export interface Subjects {
  name: string;
  value: string;
  teaching: boolean;
}


@Component({
  selector: 'add-school',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss'],
  providers: [AddTeacherService, DatePipe, ClassService],
  //directives: [FocusDirective]

})


export class AddTeachersComponent implements OnInit {
  @ViewChildren(MdCheckbox) checkboxes;
  @Output() selectedChange:EventEmitter<any> = new EventEmitter();

  subjects= ['Mathematics','English','Kiswahili','Science','Social Studies','C.R.E'];
  selected=[];

  editing = {};
  rows = [];
  tr:any;
  schoolId:number;
  partnerId:number;
  public success;
  public fail;
  public empty;
  public date;
  public isVisible;
  public schoolName;
  public t_type;
  public currentDate = new Date();
  public submitted: boolean =  true;
  public teacher: TeacherRegistration;
  public form: FormGroup ;
  dt:any;
  classes:any;

  constructor(
    private _teacherRegistrationService: AddTeacherService,
    private classService:ClassService,
    public datepipe:DatePipe,
    public _router: Router,
    private fb: FormBuilder
  ){}



  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      gender: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required, CustomValidators.number])],
      birthday: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      teacher_type: [null, Validators.compose([Validators.required])],
      headteacher: [null, Validators.compose([Validators.required])],
      qualifications: [null],
      tsc_no: [null],
      bom_no: [null],
      dateStarted: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
      joinedCurrent: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
    });

    this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    if(this.partnerId){
      this.getSchoolNames(this.partnerId);
    }else if(this.schoolId){
      this.getClassses(this.schoolId);
      this.getSchoolName(this.schoolId);
    }

  }



  onSubmit(registerTeacher: TeacherRegistration){
    var joinedCurrent = this._teacherRegistrationService.transformDate(registerTeacher.joinedCurrent);

    if(!this.submitted){

      //edit
    }else{
        this.teacher = new TeacherRegistration(
                        registerTeacher.firstName,
                        registerTeacher.lastName,
                        registerTeacher.phoneNumber,
                        registerTeacher.birthday,
                        registerTeacher.teacher_type,
                        registerTeacher.tsc_no,
                        registerTeacher.bom_no,
                        registerTeacher.qualifications,
                        registerTeacher.dateStarted,
                        registerTeacher.joinedCurrent,
                        registerTeacher.gender,
                        registerTeacher.classAssigned,
                        registerTeacher.headteacher,
                      );
        this._teacherRegistrationService.sendData({username:  registerTeacher.phoneNumber,"details":{

                  school: this.schoolId,
                  phone_no: registerTeacher.phoneNumber,
                  fstname:   registerTeacher.firstName,
                  lstname:   registerTeacher.lastName,
                  birthday:  registerTeacher.birthday,
                  teacher_type:registerTeacher.teacher_type,
                  qualifications: registerTeacher.qualifications,
                  tsc_no: registerTeacher.tsc_no,
                  bom_no: registerTeacher.bom_no,
                  classes: this.selected,
                  headteacher: registerTeacher.headteacher,
                  date_started_teaching: registerTeacher.dateStarted,
                  joined_current_school:  registerTeacher.joinedCurrent,
                  gender: registerTeacher.gender
          }})
          .subscribe(
            data => //console.log(data)
            {
              console.log("Added Teacher Successfully"),
              this.success = "Added Teacher Successfully";
              this.form.reset();
            },
            error =>{
              console.log(error)

              this.fail = "Failed to save data. Make sure all required data is filled "+error;
            }
          );
      }
        //end
  }

  resetButton(){
    this.form.reset();
  }

  showInput(){
    this.isVisible = this.isVisible ? false : true;
  }

  getTeacherType(){
    var tsc = "TSC";
    var bom = "BOM";
    const teacherType = [tsc,bom];
    //console.log(teacherType);
  }

  getClassses(id): void {
    this.classService.getClassses(id).subscribe(data => {
      console.log(data, 'classes');
      data = data.results;
      let allClasses =[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        //console.log(data[i].class_name);

        if(data[i].class_name == null){
          this.dt.name = "Class "+data[i].id
        }else{
          this.dt.name="Class "+data[i].class_name
        }
        this.dt.id = data[i].id
        allClasses.push(this.dt)
      }
      this.classes = allClasses;
    });
  }

  getSchoolNames(id){

    this._teacherRegistrationService.getSchools(id)
      .subscribe(
        (res)=>{
          res = res.results
          const schoolName = [];
          for (let i = 0;i < res.length;i++){
            this.tr = {}
            this.tr.school_name=res[i].school_name
            this.tr.id=res[i].id
            schoolName.push(this.tr)
          }
          this.schoolName = schoolName;
          //console.log(schoolName);
        },
      (err) => console.log(err)
    );
  }

  getSchoolName(id){
    this._teacherRegistrationService.getSchoolName(id).subscribe((data)=>{
      this.schoolName = data.results[0].school_name
    })
  }
notSelected:any;
  toggle(i, data){
    var index = this.selected.indexOf(data);
    if(index === -1){
      this.selected.push(data);
    }else{
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
    //console.log(this.selected.length)
  }



  exists(id){
    return this.selected.indexOf(id) > -1;
  }

}
