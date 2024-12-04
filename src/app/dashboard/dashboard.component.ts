import { Component,OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import {Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


export class attendanceTake {
  constructor(
    public takenAttendance: string,
    public startDate: any,
    public endDate: any
  ){}
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[ DashboardService ]
})
export class DashboardComponent implements OnInit{

  rows = [];

  public students: any;
  public dropouts:any;
  public males: any;
  public females: any;
  public teachers: any;
  public schools: any;

  public malesPresent: any;
  public malesAbscent: any;
  public femalesPresent: any;
  public femalesAbscent: any;
  public childrenPresent: any;
  public childrenAbscent: any;
  public attendanceSnapshot: any [];

  //Annual Attendance per Gender
  public boys: any;
  public girls: any;
  partnerId:number;
  partneradminId:number;
  partnerName: string;
  annualYear:any;
  public objDate;
  public monthNames;
  public locale;
  public month;
  public dateGiven;
    dt:any;
    schoolId:number;
    classes: any[];
    selected: any[];
    temp = [];
    count: number = 0;
    offset: number = 0;
    limit: number = 100;
    page:number=1
    table = {
      offset: 0
    };

    columnData:any;
    takenAttendance: boolean = true;
    start_date:any;
    end_date:any;
    attendanceTake: attendanceTake;
    form: FormGroup;
    submitted: boolean =  true;

   public weekday = [
      'Sun','Mon','Tue', 'Wed','Thurs','Fri','Sat'
    ]

    columns = [
    { prop: 'schoolname', name: 'SCHOOL NAME', filtering:{filterString: '', placeholder: 'Filter by name'}},
    { prop: 'classname', name: 'CLASS NAME', filtering:{filterString: '', placeholder: 'Filter by name'}},
    { prop: 'daysattendancetaken', name: 'DAYS ATTENDANCE TAKEN'},
    { prop: 'totaldayspassed', name: 'TOTAL DAYS'},
    { prop: 'daysattendancepercentage', name: 'ATTENDANCE (%)'},
    { prop: 'startdate', name: 'DATE (FROM)'},
    { prop: 'enddate', name: 'DATE (TO)'}
  ];

  constructor(private dashboardServices: DashboardService,private route:ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
     this.form = this.fb.group({
        
        takenAttendance: [null, Validators.compose([Validators.required])],
        startDate: [null, Validators.compose([Validators.required])],
        endDate: [null, Validators.compose([Validators.required])],
      });
  }

  ngOnInit(): void {
    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    this.partneradminId = JSON.parse(localStorage.getItem("partneradminId"));
    this.partnerName = localStorage.getItem("welcomeName");
    let today = new Date();
    let todayYear = today.getFullYear();

    if(this.partnerId && this.partnerName){
      this.getPartnerStats(this.partnerId);
      this.getPartnerAnnualAttendanceGender(this.partnerId, todayYear);
      this.getPartnerEnrolledAnnualAttendanceGender(this.partnerId, todayYear);
      this.getPartnerMonthlyAttendance(this.partnerId);
      this.getEnrolledPartnerMonthlyAttendance(this.partnerId);
      this.getPartnerSevenDaysAttendance(this.partnerId);
      this.getEnrolledPartnerSevenDaysAttendance(this.partnerId);

      this.getPartnerAnnualEnrollmentGender(this.partnerId);
      this.getPartnerEnrollmentGraph(this.partnerId);

        let date=new Date(this.get_start_date(30))
        let d=new Date()
        this.start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

        this.end_date=this.get_formatted_date(d)

        
        this.takenAttendance = true
       this.getClasssesAttendanceMonitor(this.page, this.partnerId,this.offset, this.limit, this.takenAttendance, this.start_date,this.end_date);



    }else if(this.partneradminId){
      this.getPartnerAdminStats(this.partneradminId);
      this.getPartnerAdminAnnualAttendanceGender(this.partneradminId, todayYear);
      this.getPartnerAdminEnrolledAnnualAttendanceGender(this.partneradminId, todayYear);
      this.getPartnerAdminMonthlyAttendance(this.partneradminId);
      this.getEnrolledPartnerAdminMonthlyAttendance(this.partneradminId);
      this.getPartnerAdminSevenDaysAttendance(this.partneradminId);
      this.getEnrolledPartnerAdminSevenDaysAttendance(this.partneradminId);

      this.getPartnerAdminAnnualEnrollmentGender(this.partneradminId);
      this.getPartnerAdminEnrollmentGraph(this.partneradminId);

        let date=new Date(this.get_start_date(30))
        let d=new Date()
        this.start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

        this.end_date=this.get_formatted_date(d)

        
        this.takenAttendance = true
       this.getClasssesAttendanceMonitor(this.page, this.partneradminId,this.offset, this.limit, this.takenAttendance, this.start_date,this.end_date);

    }else{
      this.getStats();
      //this.getWeeklySummary(); commented till the api is fixed
      
      this.getAnnualAttendanceGender(todayYear);
      this.getEnrolledAnnualAttendanceGender(todayYear);
      this.getMonthlyAttendance();
      this.getEnrolledMonthlyAttendance();
      this.getSevenDaysAttendance();
      this.getEnrolledSevenDaysAttendance();

      this.getAnnualEnrollmentGender();
      this.getEnrollmentGraph();
    }

  }

  get_start_date(days){
      var d=new Date()
      return d.setDate(d.getDate() - days);
     }
     get_formatted_date(date){
       return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
     }

  getRegisteredChildren(){
       this.router.navigate(['/children/view-children']);
    }

    getSchools(){
        this.router.navigate(['/schools/view-schools']); 
    }


    getEnrolledChildren(){
        this.router.navigate(['/children/enrollments']);
    }


    getDropouts(){
       this.router.navigate(['/children/dropouts']);
    }


    atTk: attendanceTake;
    onSubmit(attendance: attendanceTake){
    if(!this.submitted){

      //edit
    }else{

      this.atTk = new attendanceTake( attendance.takenAttendance,attendance.startDate,attendance.endDate);
      this.takenAttendance = JSON.parse(attendance.takenAttendance);
      this.start_date = attendance.startDate;
      this.end_date = attendance.endDate;
      if(this.partnerId){
        this.getClasssesAttendanceMonitor(this.page, this.partnerId, this.offset,this.limit, attendance.takenAttendance,attendance.startDate,attendance.endDate );
      }else if(this.partneradminId){
        this.getClasssesAttendanceMonitor(this.page, this.partneradminId, this.offset,this.limit, attendance.takenAttendance,attendance.startDate,attendance.endDate );
      }
      
    }
  }


  resetButton(){
    this.form.reset();
  }

  onPage(event){
    this.page=event.offset+1
    if(this.partnerId){
      this.getClasssesAttendanceMonitor(this.page,this.partnerId,event.offset, event.limit,this.takenAttendance, this.start_date, this.end_date);
    }else if(this.partneradminId){
      this.getClasssesAttendanceMonitor(this.page,this.partneradminId,event.offset, event.limit,this.takenAttendance, this.start_date, this.end_date);
    }
  }

  onActivate(event){

  }

  getClasssesAttendanceMonitor(page, id,offset,limit,taken, start_date, end_date): void {
    if(this.partnerId){
     // console.log(id, 'this is being sent');
    this.dashboardServices.getClasssesAttendancePartnerMonitor(page,id,taken, start_date, end_date).subscribe(data => {
     
       const start = offset * limit;
      const end = start + limit;
      //console.log(data, id,   start, end, start_date,end_date)
       this.count =data.count
      data = data.results;
      let allClasses =[]
      let rows=[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        this.dt.schoolname = data[i].school_name;
        this.dt.classname = data[i].class_name;
        this.dt.id = data[i].id;
        this.dt.emiscode = data[i].school_emis_code;
        this.dt.schooltype = data[i].school_type;
        this.dt.totaldayspassed = data[i].total_days;
        if(data[i].attendance_count == null){
          this.dt.attendancecount = 0
        }else{
          this.dt.attendancecount = data[i].attendance_count;  
        }
        this.dt.daysattendancetaken = this.dt.attendancecount;
        this.dt.daysattendancepercentage = Math.round((data[i].attendance_count/data[i].total_days)*100)+'%';
        this.dt.startdate = start_date;
        this.dt.enddate = end_date;
        allClasses.push(this.dt)
      }
     //console.log(allClasses);
      //cache our data
      //this.temp = [...allClasses];
       let row=[...rows]
      this.temp=[...allClasses];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = allClasses[j];
        j++;
      }
      //this.temp=row
      this.classes=row;
      //our initial data
      //this.classes = allClasses;
      this.selected = [];
    });
  }else if(this.partneradminId){
    //console.log(id, 'this is being sent');
    this.dashboardServices.getClasssesAttendancePartnerAdminMonitor(page,id,taken, start_date, end_date).subscribe(data => {
     
       const start = offset * limit;
      const end = start + limit;
      //console.log(data, id,   start, end, start_date,end_date)
       this.count =data.count
      data = data.results;
      let allClasses =[]
      let rows=[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        this.dt.schoolname = data[i].school_name;
        this.dt.classname = data[i].class_name;
        this.dt.id = data[i].id;
        this.dt.emiscode = data[i].school_emis_code;
        this.dt.schooltype = data[i].school_type;
        this.dt.totaldayspassed = data[i].total_days;
        if(data[i].attendance_count == null){
          this.dt.attendancecount = 0
        }else{
          this.dt.attendancecount = data[i].attendance_count;  
        }
        this.dt.daysattendancetaken = this.dt.attendancecount;
        this.dt.daysattendancepercentage = Math.round((data[i].attendance_count/data[i].total_days)*100)+'%';
        this.dt.startdate = start_date;
        this.dt.enddate = end_date;
        allClasses.push(this.dt)
      }
     //console.log(allClasses);
      //cache our data
      //this.temp = [...allClasses];
       let row=[...rows]
      this.temp=[...allClasses];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = allClasses[j];
        j++;
      }
      //this.temp=row
      this.classes=row;
      //our initial data
      //this.classes = allClasses;
      this.selected = [];
    });
  }
    
  }

  onSelect({ selected }) {
   //localStorage.setItem('classId', this.selected[0].id);
   //this.getClassId(this.selected[0].id);
   }

  // Shimanyi > getStats()
  public getStats():void {

    this.dashboardServices.getStats().subscribe(data => {
      //console.log(data, 'dropouts')
       this.schools = data.active_schools;
       this.males = data.students.males;
       this.females = data.students.females;
       this.students = (this.males+this.females);
       this.teachers = data.teachers;
       this.dropouts = data.students.dropout_females+data.students.dropout_males;
    });
  }
  // Partner > getStats()
  public getPartnerStats(id):void {

    this.dashboardServices.getPartnerStats(id).subscribe(data => {

      //console.log(data, 'dropouts')

       this.schools = data.active_schools;
       this.males = data.students.males;
       this.females = data.students.females;
       this.students = +(this.males+this.females);
       this.teachers = data.teachers;
       this.dropouts = data.students.dropout_females+data.students.dropout_males;

    });
  }
  //partner admin
  public getPartnerAdminStats(id):void {

    this.dashboardServices.getPartnerAdminStats(id).subscribe(data => {

       this.schools = data.active_schools;
       this.males = data.students.males;
       this.females = data.students.females;
       this.students = +(this.males+this.females);
       this.teachers = data.teachers;
       this.dropouts = data.students.dropout_females+data.students.dropout_males;

    });
  }

  // Shimanyi > getWeeklySummary()
  public getWeeklySummary(){
    this.dashboardServices.getWeeklySummary().subscribe( data => {
      this.malesPresent   = data.present.males;
      this.malesAbscent   = data.absent.males;
      this.femalesPresent = data.present.females;
      this.femalesAbscent = data.absent.females;
      this.childrenPresent = data.present.total + "%";
      this.childrenAbscent = data.absent.total;

      this.attendanceSnapshot = [
        {
          "title": "Girls Present",
          "duration":"1 week",
          "progress": this.femalesPresent,
          "color":"primary"
        }, {
          "title": "Boys Present ",
          "duration":"1 week",
          "progress": this.malesPresent,
          "color":"primary"
        }, {
          "title": "Children Present",
          "duration":"1 week",
          "progress": this.childrenPresent,
          "color":"primary"
        },{
          "title": "Girls Absent",
          "duration":"1 week",
          "progress": this.femalesAbscent,
          "color":"accent"
        }, {
          "title": "Males Abscent",
          "duration":"1 week",
          "progress": this.childrenAbscent,
          "color":"accent"
        },  {
          "title": "Children Abscent",
          "duration":"1 week",
          "progress": this.malesAbscent,
          "color":"warn"
        }
      ]
    });
  }

  public getPartnerWeeklySummary(id){
    this.dashboardServices.getPartnerWeeklySummary(id).subscribe( data => {
      this.malesPresent   = data.present.males;
      this.malesAbscent   = data.absent.males;
      this.femalesPresent = data.present.females;
      this.femalesAbscent = data.absent.females;
      this.childrenPresent = data.present.total + "%";
      this.childrenAbscent = data.absent.total;

      this.attendanceSnapshot = [
        {
          "title": "Girls Present",
          "duration":"1 week",
          "progress": this.femalesPresent,
          "color":"primary"
        }, {
          "title": "Boys Present ",
          "duration":"1 week",
          "progress": this.malesPresent,
          "color":"primary"
        }, {
          "title": "Children Present",
          "duration":"1 week",
          "progress": this.childrenPresent,
          "color":"primary"
        },{
          "title": "Girls Absent",
          "duration":"1 week",
          "progress": this.femalesAbscent,
          "color":"accent"
        }, {
          "title": "Males Abscent",
          "duration":"1 week",
          "progress": this.childrenAbscent,
          "color":"accent"
        },  {
          "title": "Children Abscent",
          "duration":"1 week",
          "progress": this.malesAbscent,
          "color":"warn"
        }
      ]
    });
  }

  //partner admin weekly status
  public getPartnerAdminWeeklySummary(id){
    this.dashboardServices.getPartnerAdminWeeklySummary(id).subscribe( data => {
      this.malesPresent   = data.present.males;
      this.malesAbscent   = data.absent.males;
      this.femalesPresent = data.present.females;
      this.femalesAbscent = data.absent.females;
      this.childrenPresent = data.present.total + "%";
      this.childrenAbscent = data.absent.total;

      this.attendanceSnapshot = [
        {
          "title": "Girls Present",
          "duration":"1 week",
          "progress": this.femalesPresent,
          "color":"primary"
        }, {
          "title": "Boys Present ",
          "duration":"1 week",
          "progress": this.malesPresent,
          "color":"primary"
        }, {
          "title": "Children Present",
          "duration":"1 week",
          "progress": this.childrenPresent,
          "color":"primary"
        },{
          "title": "Girls Absent",
          "duration":"1 week",
          "progress": this.femalesAbscent,
          "color":"accent"
        }, {
          "title": "Males Abscent",
          "duration":"1 week",
          "progress": this.childrenAbscent,
          "color":"accent"
        },  {
          "title": "Children Abscent",
          "duration":"1 week",
          "progress": this.malesAbscent,
          "color":"warn"
        }
      ]
    });
  }
  // Shared chart options
  public globalChartOptions: any = {
      responsive: true,
      legend: {
        display: false,
        position: 'bottom'
      }
    }

  // Pie
  public pieChartLabels: string[] = ['Total Old  Boys Present', 'Total Old Girls Present','Total Enrolled Girls Absent','Total Enrolled Boys Absent'];
  public studentsPieChartLabels: string[] = ['Total Old Boys', 'Total Old Girls','Total Enrolled Girls','Total Enrolled Boys'];
  public pieChartData: number[] = [];
  public pieChartDataEnrolled: number[] = [];
  public pieChartEnrollmentData: number[] = [];
  public pieChartType: string = 'pie';

  // monthly chart
  public comboChartLabels: Array < any > = [];
  public comboChartLabelsEnrolled: Array < any > = [];
  public comboChartData: any[] = [{}];
  public comboChartDataEnrolled: any[] = [{}];
  public comboChartLegend: boolean = true;
  public chartColors: Array < any > = [{ // grey
    backgroundColor: "#8072cc",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: "#009D89",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { 
    backgroundColor: '#FF001C',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#FFFF00',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  public EnrolledchartColors: Array < any > = [{ 
    backgroundColor: "#D3D3D3",
    borderColor: "#FAFAFA",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
  ,{ 
    backgroundColor: "#8072cc",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: "#009D89",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { 
    backgroundColor: '#FF001C',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#FFFF00',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#8072cc',
    borderColor: '#3f51b5',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { 
    backgroundColor: '#D3D3D3',
    borderColor: '#FAFAFA',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];


  public EnrolledComboChartLabels: Array < any > = [];
  public EnrolledComboChartData: any[] = [{}];

  public ComboChartOptions: any = Object.assign({
    animation: false,
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
        position:'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.globalChartOptions);


  // Doughnut
  public doughnutChartColors: any[] = [{
    backgroundColor: ["#8072cc", "#009d89", "#FFFF00", "#ff001c"]
  }];
  public doughnutChartLabels: string[] = ['Boys enrolled', 'Girls enrolled'];
  public doughnutOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.globalChartOptions);


/* Annual year clicked for all children
-------------
*/
  public getYearClicked(event){
    if(this.partnerId){
      this.getPartnerAnnualAttendanceGender(this.partnerId, event);
    }else if(this.partneradminId){
      this.getPartnerAdminAnnualAttendanceGender(this.partneradminId, event);
    }else{
      this.getAnnualAttendanceGender(event);
    }
    
  }

/*Annual year clicked for enrolled children
-------------
*/
  public getEnrolledYearClicked(event){
    if(this.partnerId){
      this.getPartnerEnrolledAnnualAttendanceGender(this.partnerId, event);
    }else if(this.partneradminId){
      this.getPartnerAdminEnrolledAnnualAttendanceGender(this.partneradminId, event);
    }else{
      this.getEnrolledAnnualAttendanceGender(event);
    }
    
  }


  //Norman - get Attendance per Gender
  /*
  Annual Attendance for all children based on gender in pie chart
  ----------------
  */
  public getAnnualAttendanceGender(yr){
      this.dashboardServices.getAnnualAttendanceGender().subscribe( data => {

      data = data.results;
      //console.log(data)
      let children = [];
      let annualYear = [];
      for(let i =0; i < data.length; i++){
          annualYear.push(data[i].value);
          if(yr == data[i].value){
            children.push(data[i].present_males);
            children.push(data[i].present_females);
            children.push(data[i].absent_females);
            children.push(data[i].absent_males);
          }
          
        
      }
      this.annualYear =annualYear.reverse();
      this.pieChartData = children;

    });
  }


  public getPartnerAnnualAttendanceGender(id, yr){
      this.dashboardServices.getPartnerAnnualAttendanceGender(id).subscribe( data => {

        data = data.results;
      let children = [];
      let annualYear = [];
      for(let i =0; i < data.length; i++){
          annualYear.push(data[i].value);
          if(yr == data[i].value){
            children.push(data[i].present_males);
            children.push(data[i].present_females);
            children.push(data[i].absent_females);
            children.push(data[i].absent_males);
          }
        
      }
      this.annualYear =annualYear.reverse();
      this.pieChartData = children;
     }); 
      
  }


  public getPartnerAdminAnnualAttendanceGender(id, yr){

      this.dashboardServices.getPartnerAdminAnnualAttendanceGender(id).subscribe( data => {
      data = data.results;
      let children = [];
      let annualYear = [];
      for(let i =0; i < data.length; i++){
          annualYear.push(data[i].value);
          if(yr == data[i].value){
            children.push(data[i].present_males);
            children.push(data[i].present_females);
            children.push(data[i].absent_females);
            children.push(data[i].absent_males);
          }
        
      }
      this.annualYear =annualYear.reverse();
      this.pieChartData = children;

    });
  }


    /*
  Annual Attendance for newly enrolled children based on gender in pie chart
  ----------------
  */
  public getEnrolledAnnualAttendanceGender(yr){
      this.dashboardServices.getEnrolledAnnualAttendanceGender().subscribe( data => {
      //console.log(data);
      data = data.results;
      //console.log(data)
      let children = [];
      let annualYear = [];
      for(let i =0; i < data.length; i++){
          annualYear.push(data[i].value);
          if(yr == data[i].value){
            children.push(data[i].present_males);
            children.push(data[i].present_females);
            children.push(data[i].absent_females);
            children.push(data[i].absent_males);
          }
          
        
      }
      this.annualYear =annualYear.reverse();
      this.pieChartDataEnrolled = children;

    });
  }


  public getPartnerEnrolledAnnualAttendanceGender(id, yr){
      this.dashboardServices.getEnrolledPartnerAnnualAttendanceGender(id).subscribe( data => {

        data = data.results;
      let children = [];
      let annualYear = [];
      for(let i =0; i < data.length; i++){
          annualYear.push(data[i].value);
          if(yr == data[i].value){
            children.push(data[i].present_males);
            children.push(data[i].present_females);
            children.push(data[i].absent_females);
            children.push(data[i].absent_males);
          }
        
      }
      this.annualYear =annualYear.reverse();
      this.pieChartDataEnrolled = children;
     }); 
      
  }


  public getPartnerAdminEnrolledAnnualAttendanceGender(id, yr){

      this.dashboardServices.getEnrolledPartnerAdminAnnualAttendanceGender(id).subscribe( data => {
      data = data.results;
      let children = [];
      let annualYear = [];
      for(let i =0; i < data.length; i++){
          annualYear.push(data[i].value);
          if(yr == data[i].value){
            children.push(data[i].present_males);
            children.push(data[i].present_females);
            children.push(data[i].absent_females);
            children.push(data[i].absent_males);
          }
        
      }
      this.annualYear =annualYear.reverse();
      this.pieChartDataEnrolled = children;

    });
  }

//Norman 
/*
Students based on gender
----------------
*/
  public getAnnualEnrollmentGender(){

    this.dashboardServices.getAnnualEnrollmentGender().subscribe( data => {
        
      data = data.results;
      let enrolled = [];
      enrolled.push(data[0].old_males);
      enrolled.push(data[0].old_females);
      enrolled.push(data[0].enrolled_females);
      enrolled.push(data[0].enrolled_males);
      this.pieChartEnrollmentData = enrolled;
     
    });
  }
  public getPartnerAnnualEnrollmentGender(id){

    this.dashboardServices.getPartnerAnnualEnrollmentGender(id).subscribe( data => {
      data = data.results;
      let enrolled = [];
     
      enrolled.push(data[0].old_males);
      enrolled.push(data[0].old_females);
      enrolled.push(data[0].enrolled_females);
      enrolled.push(data[0].enrolled_males);
      this.pieChartEnrollmentData = enrolled;
     
    });
  }

  public getPartnerAdminAnnualEnrollmentGender(id){

    this.dashboardServices.getPartnerAdminAnnualEnrollmentGender(id).subscribe( data => {
      data = data.results;
      let enrolled = [];
     
      enrolled.push(data[0].old_males);
      enrolled.push(data[0].old_females);
      enrolled.push(data[0].enrolled_females);
      enrolled.push(data[0].enrolled_males);
      this.pieChartEnrollmentData = enrolled;
     
    });
  }

/*
End Students Based on Gender
----------------------------
*/
/* All Children Attendance Graphs
----------------
*/
  public getMonthlyAttendance(){

    this.dashboardServices.getMonthlyAttendance().subscribe( data => {
      //console.log(data);
      data = data.results;
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabels = columns;
      this.comboChartData  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
        borderWidth: 1,
        type: 'bar',
      }];
    });
  }

  public getPartnerMonthlyAttendance(id){

    this.dashboardServices.getPartnerMonthlyAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabels = columns;
      this.comboChartData  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
        borderWidth: 1,
        type: 'bar',
      }];
    });
  }

  public getPartnerAdminMonthlyAttendance(id){

    this.dashboardServices.getPartnerAdminMonthlyAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabels = columns;
      this.comboChartData  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
        borderWidth: 1,
        type: 'bar',
      }];
    });
  }


/*Newly Enrolled Attendance Graphs
  --------
*/
  public getEnrolledMonthlyAttendance(){

    this.dashboardServices.getEnrolledMonthlyAttendance().subscribe( data => {
      data = data.results;
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabelsEnrolled = columns;
      this.comboChartDataEnrolled  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
        borderWidth: 1,
        type: 'bar',
      }];
    });
  }

  public getEnrolledPartnerMonthlyAttendance(id){

    this.dashboardServices.getEnrolledPartnerMonthlyAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabelsEnrolled = columns;
      this.comboChartDataEnrolled  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
        borderWidth: 1,
        type: 'bar',
      }];
    });
  }

  public getEnrolledPartnerAdminMonthlyAttendance(id){

    this.dashboardServices.getEnrolledPartnerAdminMonthlyAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //let subset = data.reverse().slice(Math.max(data.length - 6, 0));
     //console.log(subset);

      let columns:String [] = [];
      let totalGirlsAbsent: number [] = [];
      let totalGirlsPresent: number [] = [];
      let totalBoysPresent: number [] = [];
      let totalBoysAbsent: number [] = [];
      let refine: any;

      let months: string [] =
      ["Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", ];
            
      for(let i = 0; i < subset.length; i++){
  
        //let sortedMonths = x.sort(sortByDateAsc);

        let month =  new Date(subset[i].value);
        let yr = month.getFullYear();
        let today = new Date();
        /*if(yr != 2014){
          let m =  months[month.getMonth()]+' '+yr; 
          columns.push(m);
        }*/
        let m =  months[month.getMonth()]+' '+yr; 

        columns.push(m);
        

        totalGirlsAbsent.push(subset[i].absent_females );
        totalGirlsPresent.push(subset[i].present_females);
        totalBoysAbsent.push(subset[i].absent_males );
        totalBoysPresent.push(subset[i].present_males);
      }



      this.comboChartLabelsEnrolled = columns;
      this.comboChartDataEnrolled  = [{
        data: totalBoysPresent,
        label: 'Boys Present',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: totalGirlsPresent,
        label: 'Girls Present',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalBoysAbsent,
        label: 'Boys Absent',
        borderWidth: 1,
        type: 'bar',
      },{
        data: totalGirlsAbsent,
        label: 'Girls Absent',
        borderWidth: 1,
        type: 'bar',
      }];
    });
  }


  //Norman - children enrollment in all the classes
 /*
 Students based on classes
  ------------------------
 */
  public getEnrollmentGraph(){

    this.dashboardServices.getEnrollmentGraph().subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - 8, 0));

      let columns:string[] = [];
      let dropoutMales: number[]=[];
      let dropoutFemales: number []=[];
      let enrolledMales: number[]=[];
      let enrolledFemales: number[]=[];
      let oldMales: number [] = [];
      let oldFemales: number [] = [];
      let total: number[]=[];

      for(let i = 0; i < subset.length; i++){
        let cl = 'Class '
        columns.push(cl+subset[i].value);
        total.push(subset[i].total);
        oldMales.push(subset[i].old_males)
        enrolledMales.push(subset[i].enrolled_males);
        oldFemales.push(subset[i].old_females)
        enrolledFemales.push(subset[i].enrolled_females);
        dropoutMales.push(subset[i].dropout_old_males +subset[i].dropout_enrolled_males);
        dropoutFemales.push(subset[i].dropout_old_females+ subset[i].dropout_enrolled_females);
        
      }

      this.EnrolledComboChartLabels = columns;
      this.EnrolledComboChartData  = [{
        data: total,
        label: 'Total Students',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: oldMales,
        label: 'Old Boys',
        borderWidth: 1,
        type: 'bar',
      },{
        data: enrolledMales,
        label: 'Enrolled Boys',
        borderWidth: 1,
        type: 'bar',
      },{
        data: oldFemales,
        label: 'Old Girls',
        borderWidth: 1,
        type: 'bar',
      },{
        data: enrolledFemales,
        label: 'Enrolled Girls',
        borderWidth: 1,
        type: 'bar',
      },{
        data: dropoutMales,
        label: 'Total Boys Dropped Out',
        borderWidth: 1,
        type: 'bar',
      },{
        data: dropoutFemales,
        label: 'Total Girls Dropped Out',
        borderWidth: 1,
        type: 'bar',
      }];
  });

  }

  public getPartnerEnrollmentGraph(id){

    this.dashboardServices.getPartnerEnrollmentGraph(id).subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - 8, 0));

      let columns:string[] = [];
      let dropoutMales: number[]=[];
      let dropoutFemales: number []=[];
      let enrolledMales: number[]=[];
      let enrolledFemales: number[]=[];
      let oldMales: number [] = [];
      let oldFemales: number [] = [];
      let total: number[]=[];

      for(let i = 0; i < subset.length; i++){
        let cl = 'Class '
        columns.push(cl+subset[i].value);
        total.push(subset[i].total);
        oldMales.push(subset[i].old_males)
        enrolledMales.push(subset[i].enrolled_males);
        oldFemales.push(subset[i].old_females)
        enrolledFemales.push(subset[i].enrolled_females);
        dropoutMales.push(subset[i].dropout_old_males +subset[i].dropout_enrolled_males);
        dropoutFemales.push(subset[i].dropout_old_females+ subset[i].dropout_enrolled_females);
        
      }

      this.EnrolledComboChartLabels = columns;
      this.EnrolledComboChartData  = [{
        data: total,
        label: 'Total Students',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: oldMales,
        label: 'Old Boys',
        borderWidth: 1,
        type: 'bar',
      },{
        data: enrolledMales,
        label: 'Enrolled Boys',
        borderWidth: 1,
        type: 'bar',
      },{
        data: oldFemales,
        label: 'Old Girls',
        borderWidth: 1,
        type: 'bar',
      },{
        data: enrolledFemales,
        label: 'Enrolled Girls',
        borderWidth: 1,
        type: 'bar',
      },{
        data: dropoutMales,
        label: 'Total Boys Dropped Out',
        borderWidth: 1,
        type: 'bar',
      },{
        data: dropoutFemales,
        label: 'Total Girls Dropped Out',
        borderWidth: 1,
        type: 'bar',
      }];
  });
  }

  public getPartnerAdminEnrollmentGraph(id){

    this.dashboardServices.getPartnerAdminEnrollmentGraph(id).subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - 8, 0));

      let columns:string[] = [];
      let dropoutMales: number[]=[];
      let dropoutFemales: number []=[];
      let enrolledMales: number[]=[];
      let enrolledFemales: number[]=[];
      let oldMales: number [] = [];
      let oldFemales: number [] = [];
      let total: number[]=[];

      for(let i = 0; i < subset.length; i++){
        let cl = 'Class '
        columns.push(cl+subset[i].value);
        total.push(subset[i].total);
        oldMales.push(subset[i].old_males)
        enrolledMales.push(subset[i].enrolled_males);
        oldFemales.push(subset[i].old_females)
        enrolledFemales.push(subset[i].enrolled_females);
        dropoutMales.push(subset[i].dropout_old_males +subset[i].dropout_enrolled_males);
        dropoutFemales.push(subset[i].dropout_old_females+ subset[i].dropout_enrolled_females);
        
      }

      this.EnrolledComboChartLabels = columns;
      this.EnrolledComboChartData  = [{
        data: total,
        label: 'Total Students',
        borderWidth: 1,
        type: 'bar',
        fill: false
      },{
        data: oldMales,
        label: 'Old Boys',
        borderWidth: 1,
        type: 'bar',
      },{
        data: enrolledMales,
        label: 'Enrolled Boys',
        borderWidth: 1,
        type: 'bar',
      },{
        data: oldFemales,
        label: 'Old Girls',
        borderWidth: 1,
        type: 'bar',
      },{
        data: enrolledFemales,
        label: 'Enrolled Girls',
        borderWidth: 1,
        type: 'bar',
      },{
        data: dropoutMales,
        label: 'Total Boys Dropped Out',
        borderWidth: 1,
        type: 'bar',
      },{
        data: dropoutFemales,
        label: 'Total Girls Dropped Out',
        borderWidth: 1,
        type: 'bar',
      }];
  });
  }

/*
End Students Based on Class
-----------------------
*/
  // Bar
  public barChartLabels: string[] = [];
  public barChartLabelsEnrolled: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{}];
  public barChartDataEnrolled: any[] = [{}];
  public barChartOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    /*tooltips: {
      mode: 'index',
      intersect: false
    },*/
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          //defaultFontColor: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        //stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
           //defaultFontColor: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        //stacked: true,
        position:'left',
        ticks: {
          beginAtZero: true,
          //suggestedMax: 9
        }
      }]
    }
  }, this.globalChartOptions);

  public barchartColors: Array < any > = [{ // grey
    backgroundColor: "#8072cc",
    borderColor: "#3f51b5"
  }, { // dark grey
    backgroundColor: "#009D89",
    borderColor: "#e0e0e0"
  }, { // grey
    backgroundColor: '#FF001C',
    borderColor: 'rgba(148,159,177,1)'
  },{ // grey
    backgroundColor: '#FFFF00',
    borderColor: 'rgba(148,159,177,1)'
  }];


/*
Weekly all children attendance
-----------
*/
  public getSevenDaysAttendance(){

    this.dashboardServices.getSevenDaysAttendance().subscribe( data => {
      
      //console.log(data);

      data = data.results;
      let subset = data.slice(Math.max(data.length - 7, 0));

      let columns: string[] = [];
      let absentMales: number[] = [];
      let presentMales: number[] = [];
      let absentFemales: number[] = [];
      let presentFemales: number[] = [];

      let columnNames: string = '';
      for(let i = 0; i < subset.length; i++){
        let day = new Date(subset[i].value);
        let n = this.weekday[day.getDay()]+' '+subset[i].value;  
        columns.push(n);
        absentMales.push((subset[i].absent_males));
        absentFemales.push((subset[i].absent_females));
        presentMales.push((subset[i].present_males));
        presentFemales.push((subset[i].present_females));
      }

      this.barChartLabels = columns;
      this.barChartData = [{
        //display data for boys ranging from class 1 to 7
        //presents Males
        data: presentMales,
        label: 'Present Male Students',
        borderWidth: 0
      },{
        //present Females
        data: presentFemales,
        label: 'Present Female Students',
        borderWidth: 0
      },{
        //absents Males
        data: absentMales,
        label: 'Absent Male Students',
        borderWidth: 0
      }, {
        //absent Females
        data: absentFemales,
        label: 'Absent Female Students',
        borderWidth: 0
      }];

    });
  }
  public getPartnerSevenDaysAttendance(id){

    this.dashboardServices.getPartnerSevenDaysAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - 7, 0));

      let columns: string[] = [];
      let absentMales: number[] = [];
      let presentMales: number[] = [];
      let absentFemales: number[] = [];
      let presentFemales: number[] = [];

      let columnNames: string = '';
      for(let i = 0; i < subset.length; i++){
        let day = new Date(subset[i].value);
        let n = this.weekday[day.getDay()]+' '+subset[i].value;  
        columns.push(n);
        absentMales.push((subset[i].absent_males));
        absentFemales.push((subset[i].absent_females));
        presentMales.push((subset[i].present_males));
        presentFemales.push((subset[i].present_females));
      }

      this.barChartLabels = columns;
      this.barChartData = [{
        //display data for boys ranging from class 1 to 7
        //presents Males
        data: presentMales,
        label: 'Present Male Students',
        borderWidth: 0
      },{
        //present Females
        data: presentFemales,
        label: 'Present Female Students',
        borderWidth: 0
      },{
        //absents Males
        data: absentMales,
        label: 'Absent Male Students',
        borderWidth: 0
      }, {
        //absent Females
        data: absentFemales,
        label: 'Absent Female Students',
        borderWidth: 0
      }];

    });
  }

  public getPartnerAdminSevenDaysAttendance(id){

    this.dashboardServices.getPartnerAdminSevenDaysAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - 7, 0));

      let columns: string[] = [];
      let absentMales: number[] = [];
      let presentMales: number[] = [];
      let absentFemales: number[] = [];
      let presentFemales: number[] = [];

      let columnNames: string = '';
      for(let i = 0; i < subset.length; i++){
        let day = new Date(subset[i].value);
        let n = this.weekday[day.getDay()]+' '+subset[i].value;  
        columns.push(n);
        absentMales.push((subset[i].absent_males));
        absentFemales.push((subset[i].absent_females));
        presentMales.push((subset[i].present_males));
        presentFemales.push((subset[i].present_females));
      }

      this.barChartLabels = columns;
      this.barChartData = [{
        //display data for boys ranging from class 1 to 7
        //presents Males
        data: presentMales,
        label: 'Present Male Students',
        borderWidth: 0
      },{
        //present Females
        data: presentFemales,
        label: 'Present Female Students',
        borderWidth: 0
      },{
        //absents Males
        data: absentMales,
        label: 'Absent Male Students',
        borderWidth: 0
      }, {
        //absent Females
        data: absentFemales,
        label: 'Absent Female Students',
        borderWidth: 0
      }];

    });
  }


/*
Weekly newly enrolled children attendance
-----------
*/
  public getEnrolledSevenDaysAttendance(){

    this.dashboardServices.getEnrolledSevenDaysAttendance().subscribe( data => {
      //console.log(data);
      data = data.results;
      let subset = data.slice(Math.max(data.length - 7, 0));

      let columns: string[] = [];
      let absentMales: number[] = [];
      let presentMales: number[] = [];
      let absentFemales: number[] = [];
      let presentFemales: number[] = [];

      let columnNames: string = '';
      for(let i = 0; i < subset.length; i++){
        let day = new Date(subset[i].value);
        let n = this.weekday[day.getDay()]+' '+subset[i].value;  
        columns.push(n);
        absentMales.push((subset[i].absent_males));
        absentFemales.push((subset[i].absent_females));
        presentMales.push((subset[i].present_males));
        presentFemales.push((subset[i].present_females));
      }

      this.barChartLabelsEnrolled = columns;
      this.barChartDataEnrolled = [{
        //presents Males
        data: presentMales,
        label: 'Present Male Students',
        borderWidth: 0
      },{
        //present Females
        data: presentFemales,
        label: 'Present Female Students',
        borderWidth: 0
      },{
        //absents Males
        data: absentMales,
        label: 'Absent Male Students',
        borderWidth: 0
      }, {
        //absent Females
        data: absentFemales,
        label: 'Absent Female Students',
        borderWidth: 0
      }];

    });
  }
  public getEnrolledPartnerSevenDaysAttendance(id){

    this.dashboardServices.getEnrolledPartnerSevenDaysAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - 7, 0));

      let columns: string[] = [];
      let absentMales: number[] = [];
      let presentMales: number[] = [];
      let absentFemales: number[] = [];
      let presentFemales: number[] = [];

      let columnNames: string = '';
      for(let i = 0; i < subset.length; i++){
        let day = new Date(subset[i].value);
        let n = this.weekday[day.getDay()]+' '+subset[i].value;  
        columns.push(n);
        absentMales.push((subset[i].absent_males));
        absentFemales.push((subset[i].absent_females));
        presentMales.push((subset[i].present_males));
        presentFemales.push((subset[i].present_females));
      }

      this.barChartLabelsEnrolled = columns;
      this.barChartDataEnrolled = [{
        //display data for boys ranging from class 1 to 7
        //presents Males
        data: presentMales,
        label: 'Present Male Students',
        borderWidth: 0
      },{
        //present Females
        data: presentFemales,
        label: 'Present Female Students',
        borderWidth: 0
      },{
        //absents Males
        data: absentMales,
        label: 'Absent Male Students',
        borderWidth: 0
      }, {
        //absent Females
        data: absentFemales,
        label: 'Absent Female Students',
        borderWidth: 0
      }];

    });
  }

  public getEnrolledPartnerAdminSevenDaysAttendance(id){

    this.dashboardServices.getEnrolledPartnerAdminSevenDaysAttendance(id).subscribe( data => {
      data = data.results;
      let subset = data.slice(Math.max(data.length - 7, 0));

      let columns: string[] = [];
      let absentMales: number[] = [];
      let presentMales: number[] = [];
      let absentFemales: number[] = [];
      let presentFemales: number[] = [];

      let columnNames: string = '';
      for(let i = 0; i < subset.length; i++){
        let day = new Date(subset[i].value);
        let n = this.weekday[day.getDay()]+' '+subset[i].value;  
        columns.push(n);
        absentMales.push((subset[i].absent_males));
        absentFemales.push((subset[i].absent_females));
        presentMales.push((subset[i].present_males));
        presentFemales.push((subset[i].present_females));
      }

      this.barChartLabelsEnrolled = columns;
      this.barChartDataEnrolled = [{
        //display data for boys ranging from class 1 to 7
        //presents Males
        data: presentMales,
        label: 'Present Male Students',
        borderWidth: 0
      },{
        //present Females
        data: presentFemales,
        label: 'Present Female Students',
        borderWidth: 0
      },{
        //absents Males
        data: absentMales,
        label: 'Absent Male Students',
        borderWidth: 0
      }, {
        //absent Females
        data: absentFemales,
        label: 'Absent Female Students',
        borderWidth: 0
      }];

    });
  }  
}
