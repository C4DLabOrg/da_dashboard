import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { AttendancepartnersService} from './attendancepartners.service';
import { EnrollmentService} from '../../children/enrollment/enrollment.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';
import { DatePipe } from '@angular/common';


export class attendanceTake {
  constructor(
    public startDate: any,
    public endDate: any
  ){}
}


@Component({
  selector: 'app-partner',
  templateUrl: './attendancepartners.component.html',
  styleUrls: ['./attendancepartners.component.scss'],
  providers: [AttendancepartnersService,EnrollmentService]

})
export class AttendancepartnersComponent implements OnInit {
  public form: FormGroup;
  public attendanceform: FormGroup;
  public submitted: boolean =  true;
  public search: Search;
  sub:any;
  success:string;
  empty: string;
  fail: string;
  loading:boolean;
  dt:any;
  rows = [];
  partners: any[] = this.rows;
  selected: any[];
  temp = [];
  count: number = 0;
  countPercentage: number = 0;
  offset: number = 0;
  limit: number = 100;
  page:number=1
  table = {
    offset: 0
  };
  partnerId:number;
  males:any;
  females:any;
  id:number;
  partner=[];
  partneradminid:number;

  columns = [
    {prop: 'number', name:'#'},
    { prop: 'organization', name: 'ORGANIZATION', filtering:{filterString: '', placeholder: 'Filter by name'}},
    { prop: 'boysabsent', name: 'ABSENT BOYS'},
    { prop: 'girlsabsent', name: 'ABSENT GIRLS'},
    { prop: 'totalabsent', name: 'TOTAL ABSENT'},
    { prop: 'boyspresent', name: 'PRESENT BOYS'},
    { prop: 'girlspresent', name: 'PRESENT GIRLS'},
    { prop: 'totalpresent', name: 'TOTAL PRESENT'}
  ];

  percentagecolumns = [
    {prop: 'number', name:'#'},
    { prop: 'organization', name: 'ORGANIZATION', filtering:{filterString: '', placeholder: 'Filter by name'}},
    { prop: 'totaldaysAttendance', name: 'DAYS ATTENDANCE TAKEN'},
    { prop: 'totalpresent', name: 'PRESENT CHILDREN'},
    { prop: 'totalabsent', name: 'ABSENT CHILDREN'},
    { prop: 'totalstudents', name: 'TOTAL CHILDREN'},
    { prop: 'expectedattendance', name: 'EXPECTED ATTENDANCE'},
    { prop: 'totalattendance', name: 'TOTAL ATTENDANCE'},
    { prop: 'missingattendance', name: 'MISSING ATTENDANCE'},
    { prop: 'attendancetakenpercentage', name: 'ATTENDANCE %'}
  ];



  constructor( private attendancepartnersService: AttendancepartnersService,private route:ActivatedRoute,private enrollmentService: EnrollmentService,private router: Router,private fb: FormBuilder) {
    this.attendanceform = this.fb.group({
        startDate: [null, Validators.compose([Validators.required])],
        endDate: [null, Validators.compose([Validators.required])],
      });

    this.form = this.fb.group({
        search: [null, Validators.compose([Validators.required,])],
      });

  }


  ngOnInit(): void {
    
       //let partnerId = JSON.parse(localStorage.getItem("partnerId"));

       //console.log(this.pId, 'this partner id');

       let today = new Date();
       let todayYear = today.getFullYear();

        let date=new Date(this.get_start_date(30))
        let d=new Date()
        this.start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

        this.end_date=this.get_formatted_date(d)

        
       this.getPartnerAttendanceMonitor(this.page ,this.offset, this.limit, this.start_date,this.end_date);
       this.getPartnerAttendanceMonitorPercentage(this.page ,this.offset, this.limit, this.start_date,this.end_date)

      this.partneradminid = JSON.parse(localStorage.getItem("partneradminId"));


      //this.loading = true;
      
    
   }


  //admin
  atTk: attendanceTake;
  pId:any;
  start_date:any;
  end_date:any;
  partnersAttendance:any;
  partnersAttendancePercentage:any;

    onSubmit(attendance: attendanceTake){
    if(!this.submitted){

      //edit
    }else{

      this.atTk = new attendanceTake( attendance.startDate,attendance.endDate);
      this.start_date = attendance.startDate;
      this.end_date = attendance.endDate;
      this.getPartnerAttendanceMonitor(this.page, this.offset,this.limit,attendance.startDate,attendance.endDate );
      this.getPartnerAttendanceMonitorPercentage(this.page, this.offset,this.limit,attendance.startDate,attendance.endDate );
    }
  }


    getPartnerAttendanceMonitor(page,offset,limit, start_date, end_date): void {
    //console.log(id, 'this is being sent');
    this.attendancepartnersService.getPartnersAttendanceMonitor(page, start_date, end_date).subscribe(data => {
     
       const start = offset * limit;
      const end = start + limit;
      //console.log(data, id,   start, end, start_date,end_date)

      //console.log(data);
      

       this.count =data.count
      data = data.results;
      let allAttendancePartners =[]
      let rows=[]
      for (let i = 0;i < data.length;i++){
        let org = data[i].value.split('-');
        this.dt = {}
        let num = ((page-1)*100)+(i+1)
        this.dt.number = num
        this.dt.organization = org[1];
        this.dt.boysabsent = data[i].absent_males+'%';
        this.dt.girlsabsent = data[i].absent_females+'%';
        this.dt.totalabsent = data[i].absent+'%';
        this.dt.boyspresent = data[i].present_males+'%';
        this.dt.girlspresent = data[i].present_females+'%';
        this.dt.totalpresent = data[i].present+'%';
        allAttendancePartners.push(this.dt)
      }
     //console.log(allClasses);
      //cache our data
      //this.temp = [...allClasses];
       let row=[...rows]
      this.temp=[...allAttendancePartners];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = allAttendancePartners[j];
        j++;
      }
      //this.temp=row
      this.partnersAttendance=row;
      //our initial data
      //this.classes = allClasses;
      this.selected = [];
    });
  } 




  getPartnerAttendanceMonitorPercentage(page,offset,limit, start_date, end_date): void {
    //console.log(id, 'this is being sent');
    this.attendancepartnersService.getPartnerAttendanceMonitorPercentage(page, start_date, end_date).subscribe(data => {
     
       const start = offset * limit;
      const end = start + limit;
      //console.log(data, id,   start, end, start_date,end_date)

      //console.log(data, 'percentage');
      let count = data.count
      data = data.results;
      this.countPercentage = count

      let allAttendancePartnersPercentage =[]
      let rows=[]
      for (let i = 0; i < data.length; i++){
        let org = data[i].partner.split('-');
        this.dt = {}
        let num = ((page-1)*100)+(i+1)
        this.dt.number = num
        this.dt.organization = org[1];
        this.dt.totalpresent = data[i].sum_present;
        this.dt.totalabsent = data[i].sum_absent;
        this.dt.totalstudents = data[i].total_students;
        this.dt.totaldaysAttendance = data[i].total_days;
        this.dt.totalattendance = data[i].total_attendance;
        this.dt.expectedattendance = data[i].expected_attendance;
        this.dt.missingattendance = data[i].missing_attendance;
        this.dt.attendancetakenpercentage = data[i].attendance_taken_percentage;
        allAttendancePartnersPercentage.push(this.dt)
      }
     //console.log(allClasses);
      //cache our data
      //this.temp = [...allClasses];
       let row=[...rows]
      this.temp=[...allAttendancePartnersPercentage];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = allAttendancePartnersPercentage[j];
        j++;
      }
      //this.temp=row
      this.partnersAttendancePercentage=row;
      //our initial data
      //this.classes = allClasses;
      this.selected = [];
    });
  }


    //search function
    searchPartner(search: Search){
      if(this.partneradminid){
        if(!this.submitted){

        //edit
        }else{
          this.attendancepartnersService.searchDataPartnerAdmin(search.search,this.partneradminid)
            .subscribe(
              data => //console.log(data)
              {
                this.count =data.count
                data = data.results;
                let partner =[]
                let rows=[]
                //  this.count = data.length;
                for (let i = 0;i < data.length;i++){
                  this.id = data[i].id

                  this.dt = {}
                  let num = ((this.page-1)*100)+(i+1)
                  this.dt.number = i+1
                  this.dt.organization=data[i].name
                  //this.dt.email=data[i].email
                  //this.dt.phonenumber=data[i].phone
                  if(data[i].last_data_upload != null){
                    let dateUpload = data[i].last_data_upload.match(/.{1,10}/)
                    this.dt.lastuploaded = dateUpload;
                  }else{
                    this.dt.lastuploaded = 'N/A'
                  }
                  this.dt.id = data[i].id
                  this.dt.boysenrolled = data[i].students.enrolled_males
                  this.dt.girlsenrolled = data[i].students.enrolled_females
                  this.dt.totalenrolled = data[i].students.total_enrolled
                  this.dt.totalboys = data[i].students.old_males + data[i].students.enrolled_males
                  this.dt.totalgirls = data[i].students.old_females + data[i].students.enrolled_females
                  this.dt.totalchildren = data[i].students.total
                  partner.push(this.dt)
                }

                this.partners=partner;
                //console.log(partner);

              },
              error =>{
                this.empty = "This field is required";
                this.fail = "Failed to save data";
              }
            );
        }
      }else{
        if(!this.submitted){

        //edit
        }else{

          this.attendancepartnersService.searchData(search.search)
            .subscribe(
              data => //console.log(data)
              {
                this.count =data.count
                data = data.results;
                let partner =[]
                let rows=[]
                //  this.count = data.length;
                for (let i = 0;i < data.length;i++){
                  this.id = data[i].id

                  this.dt = {}
                  let num = ((this.page-1)*100)+(i+1)
                  this.dt.number = i+1
                  this.dt.organization= data[i].name
                  //this.dt.email=data[i].email
                  //this.dt.phonenumber=data[i].phone
                  if(data[i].last_data_upload != null){
                    let dateUpload = data[i].last_data_upload.match(/.{1,10}/)
                    this.dt.lastuploaded = dateUpload;
                  }else{
                    this.dt.lastuploaded = 'N/A'
                  }
                  this.dt.id = data[i].id
                  this.dt.boysenrolled = data[i].students.enrolled_males
                  this.dt.girlsenrolled = data[i].students.enrolled_females
                  this.dt.totalenrolled = data[i].students.total_enrolled
                  this.dt.totalboys = data[i].students.old_males + data[i].students.enrolled_males
                  this.dt.totalgirls = data[i].students.old_females + data[i].students.enrolled_females
                  this.dt.totalchildren = data[i].students.total
                  partner.push(this.dt)
                }

                this.temp=[partner];
                this.partners=partner;
                //console.log(partner);
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


   onActivate(event) {
     //console.log('Activate Event', event);
   }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
      this.partners = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = this.page;

  //  console.log('Filter event', event);
  }

 /* onPage(event) {
    //console.log(event.offset);
    this.page=event.offset+1
    this.fetchpartners(event.offset, event.limit);
  }*/

  get_start_date(days){
    var d=new Date()
    return d.setDate(d.getDate() - days);
   }
   get_formatted_date(date){
     return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
   }
     


}
