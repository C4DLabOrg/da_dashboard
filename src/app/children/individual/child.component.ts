import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {ChildService} from './child.service';
import { ChildRegistration } from '../addchildren/children';
import {AddChildrenService} from '../addchildren/addchildren.service';
import {ActivatedRoute} from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [ChildService, AddChildrenService]
})
export class ChildComponent implements OnInit{

  dialogRef: MdDialogRef<EditProfileDialog>;
  lastCloseResult: string;
  config: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '1200px',
    position: {
      top: '-30px',
      bottom: '0px',
      left: '',
      right: ''
    }
  };

  public firstname;
  public midname;
  public lastname;
  public childname;
  public class_;
  public emiscode;
  public gender;
  public mode_of_transport;
  public time_to_school;
  public schoolName;
  public staywith;
  public household;
  public meals;
  public dob;
  public admNo;
  public enrolled;
  public enrolDate;
  public childType;
  public guardian;
  public phone;
  public previousClass;
  row: number [] = [];
  public attendancePercentage;
  public childStatus;
  public inSchool;
  public nonattendant;
  public attendant;
  public sub;
  public form: FormGroup;
  public percentAttendance:any=0
  presentDays:any=0;
  totalDays:any=0;
  dropoutProbability:any = 100;
  public schoolClasses;


  public globalChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  }
  public lineChartColors: Array < any > = [{ // grey
    backgroundColor: "#7986cb",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { // dark grey
    backgroundColor: "#eeeeee",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  // Bar
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{}];

  public barChartOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        position: 'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: this.row
        }
      }]
    }
  }, this.globalChartOptions);

constructor(private childService: ChildService,private route:ActivatedRoute,private fb: FormBuilder,public dialog: MdDialog) {}

    ngOnInit():void{
      //checks if the id param navigations have changed

      this.sub = this.route.params.subscribe(params => {
       let childId = +params['id'];
       //console.log(schoolId);
       this.getChildData(childId);
       //this.getSchoolClasses();
       this.childAttendance(childId);
       this.dailyChildAttendance(childId);
     });
  }

  open() {
    this.dialogRef = this.dialog.open(EditProfileDialog, this.config);
    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
    this.dialogRef.componentInstance.firstname = this.firstname,
    this.dialogRef.componentInstance.midname = this.midname,
    this.dialogRef.componentInstance.lastname = this.lastname;
    this.dialogRef.componentInstance.childname = this.childname;
    this.dialogRef.componentInstance.emiscode = this.emiscode;
    this.dialogRef.componentInstance.mode_of_transport = this.mode_of_transport;
    this.dialogRef.componentInstance.previousClass = this.previousClass;
    this.dialogRef.componentInstance.time_to_school = this.time_to_school;
    this.dialogRef.componentInstance.schoolName = this.schoolName;
    this.dialogRef.componentInstance.staywith = this.staywith;
    this.dialogRef.componentInstance.household = this.household;
    this.dialogRef.componentInstance.meals = this.meals;
    this.dialogRef.componentInstance.dob = this.dob;
    this.dialogRef.componentInstance.class_ = this.class_;
    this.dialogRef.componentInstance.enrolDate = this.enrolDate;
    this.dialogRef.componentInstance.inSchool = this.inSchool;
    this.dialogRef.componentInstance.admNo = this.admNo;
  //  this.dialogRef.componentInstance.guardian = this.guardian;
    //this.dialogRef.componentInstance.phone = this.phone;
  }

  public getChildData(id){
    this.childService.fetchChild(id).subscribe(
      (data)  =>
      {
        //console.log(data);

        this.firstname = data.fstname;
        this.midname = data.midname;
        this.lastname = data.lstname;
        if(data.midname == null){
          this.childname = data.lstname;
        }else{
          this.childname = data.midname+" "+data.lstname;
        }

        this.schoolName = data.school_name;
        this.class_ = data.class_name;

        if(data.is_oosc = 'true'){
          this.enrolled = "Enrolled Child";
          this.childType = "OOSC";
        }else{
          this.enrolled = "No";
          this.childType = "Old Student";
        }

        if(data.emiscode = "null"){
          this.emiscode = "N/A";
        }else{
          this.emiscode = data.emis_code;
        }

        if(data.stay_with = "null"){
          this.staywith = "N/A";
        }else{
          this.staywith = data.stay_with;
        }

        if(data.previous_class = 'null'){
          this.previousClass = 'N/A';
        }else{
          this.previousClass = data.previous_class;
        }

        if(data.household = 'null'){
          this.household = 'N/A';
        }else{
          this.household = data.household;
        }

        if(data.guardian_name = 'null'){
          this.guardian = 'N/A';
        }else{
          this.guardian = data.guardian_name;
        }

        if(data.guardian_phone = 'null'){
          this.phone = 'N/A';
        }else{
          this.phone = data.guardian_phone;
        }

        if(data.date_enrolled == 'null'){
          this.enrolDate = 'N/A';
        }else{
          this.enrolDate = data.date_enrolled;
        }



        if(data.date_of_birth = 'null'){
          this.dob = 'N/A';
        }else{
          this.dob = data.date_of_birth;
        }

        if(data.meals = 'null'){
          this.meals = 'N/A';
        }else{
          this.household = data.meals_per_day;
        }

        if(data.mode_of_transport = "NS"){
          this.mode_of_transport = "N/A";
        }else{
          this.mode_of_transport = data.mode_of_transport;
        }

        if(data.time_to_school = "NS"){
          this.time_to_school = "N/A";
        }else{
          this.time_to_school = data.time_to_school;
        }

        if(data.stay_with = "NS"){
          this.staywith = "N/A";
        }else{
          this.staywith = data.stay_with;
        }

        if(data.admNo == "null"){
          this.admNo = "N/A";
        }else{
          this.admNo = data.admission_no
        }

        if(data.gender == "M"){
          this.gender = "Male";
        }
        else if(data.gender = "F"){
          this.gender = "Female";
        }


      },
      error =>{

        let errorSearch = 'Id  not found';
      }
    );
  }


  public childAttendance(id){
    this.childService.fetchChildAttendance(id).subscribe(
      (data)  =>
      {
        //console.log(data);
        this.presentDays=data.results[0]["present"]
        this.totalDays=data.results[0]["total"]
        if(this.presentDays !=0 && this.totalDays !=0){
          let per=Math.round(this.presentDays/this.totalDays*100)
            this.percentAttendance=per
            this.dropoutProbability = 100-per
            
        }
      });
    //console.log(this.dropoutProbability)
  }


    public dailyChildAttendance(id){
      this.childService.fetchWeeklyAttendance(id).subscribe(
        (data)  =>
        {

          data=data.results;
          if(data != ""){
              this.attendant = data;
              //console.log(data);
              let columns: string[] = [];
              let absents: number[] = [];
              let presents: number[] = [];

              let subset = data.slice(Math.max(data.length - 3, 0));

              for(let i=0; i< subset.length; i++){

                let date = new Date(subset[i].value);

                columns.push(date.toLocaleDateString());
                this.row = subset[i].total;
                presents.push(subset[i].present);
                absents.push(subset[i].absent);
              }

              this.barChartLabels = columns;

              this.barChartData = [{
                //display data for boys ranging from class 1 to 7
                //presents
                data: presents,
                label: 'Present Number of Days',
                borderWidth: 0
              }, {
                //absents
                data: absents,
                label: 'Absent Number of Days',
                borderWidth: 0
              }];
            }else{
              this.nonattendant = "hasn't been coming to school";
            }
          });

            }

}


//edit child
  @Component({
    selector: 'demo-editprofile-dialog',
    templateUrl: 'childedit.component.html',
    providers: [ChildService, AddChildrenService]
  })

  export class EditProfileDialog {

    public form: FormGroup;
    public success;
    public fail;
    public empty;
    public submitted: boolean =  true;
    public school: ChildRegistration;
    public currentDate = new Date();
    public firstname;
    public midname;
    public lastname;
    public childname;
    public class_;
    public emiscode;
    public gender;
    public mode_of_transport;
    public time_to_school;
    public schoolName;
    public staywith;
    public household;
    public meals;
    public dob;
    public enrolled;
    public enrolDate;
    public childType;
    public guardian;
    public phone;
    public previousClass;
    row: number [] = [];
    public attendancePercentage;
    public childStatus;
    public inSchool;
    public nonattendant;
    public attendant;
    public admNo;
    cl:any;
    schoolClasses:any;

    constructor(public dialogRef: MdDialogRef <EditProfileDialog>,private childService: ChildService,private route:ActivatedRoute,private fb: FormBuilder,  private _childRegistrationService: AddChildrenService ) {
      this.form = this.fb.group({
        firstName: [null, Validators.compose([Validators.required,])],
        maidenName: [null],
        lastName: [null, Validators.compose([Validators.required,])],
        gender: [null, Validators.compose([Validators.required])],
        admNo: [null, Validators.compose([Validators.required])],
        enrolDate: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
        dateOfBirth: [null, Validators.compose([Validators.required, CustomValidators.date, CustomValidators.maxDate(this.currentDate)])],
        className: [null, Validators.compose([Validators.required])],
        previousClass: [null, Validators.compose([Validators.required, CustomValidators.number])],
        notInSchool: [null, Validators.compose([Validators.required])],
        modeOfTransport: [null, Validators.compose([Validators.required])],
        timeToSchool: [null, Validators.compose([Validators.required])],
        stayWith: [null],
        householdNumber: [null],
        mealsInDay: [null, Validators.compose([Validators.required, CustomValidators.number])]
      });
    }


      onSubmit(registerChild: ChildRegistration){
        if(!this.submitted){

          //edit
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

          this._childRegistrationService.editData({
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
                  //console.log("Edited Child Successfully"),
                  this.success = "Edited Child Successfully";
                },
                error =>{
                  this.empty = "This field is required";
                  this.fail = "Failed to edit data";
                }
              );
              //console.log("Edited Child Successfully");
              this.success = "Edited Child Successfully";

            }
      }

      getSchoolClasses(id){

        this._childRegistrationService.getClass(id)
          .subscribe(
            (res)=>{
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
          (err) => console.log(err),
        );
      }
  }
