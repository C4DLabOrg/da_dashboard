import { Component,OnInit } from '@angular/core';
import {AdminLayoutService} from '../layouts/admin/adminlayout.service';
import {Router,ActivatedRoute} from '@angular/router';
import { SearchService} from '../search/search.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment';

export class attendanceTake {
  constructor(
    public takenAttendance: string,
    public startDate: any,
    public endDate: any
  ){}
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [AdminLayoutService, SearchService]
})
export class SearchComponent {


  loading:boolean;
  dt:any;
  schoolId:number;
  rows = [];
  classes: any[] = this.rows;
  selected: any[];
  temp = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  table = {
    offset: 0
  };
  public sub;
  id:any;
  annualYear:any;
  todayYear:any;
  public males;
  public females;
  public totalStudents;
  public enrolledStudents;
  public schoolname;
  public schoolEmisCode;
  public county;
  public zone;
  public subcountyname;
  public errorSearch;
  public dropouts;
  columnData:any;
  takenAttendance: boolean = true;
  start_date:any;
  end_date:any;
  attendanceTake: attendanceTake;
  form: FormGroup;
  submitted: boolean =  true;
  atTk: attendanceTake;

  public weekday = [
    'Sun','Mon','Tue', 'Wed','Thurs','Fri','Sat'
  ]

   columns = [
    { prop: 'classname', name: 'CLASS NAME', filtering:{filterString: '', placeholder: 'Filter by name'}},
    { prop: 'daysattendancetaken', name: 'DAYS ATTENDANCE TAKEN'},
    { prop: 'totaldayspassed', name: 'TOTAL DAYS'},
    { prop: 'daysattendancepercentage', name: 'ATTENDANCE (%)'},
    { prop: 'startdate', name: 'DATE (FROM)'},
    { prop: 'enddate', name: 'DATE (TO)'}
  ];

  constructor(private _adminLayoutService: AdminLayoutService,
              private _searchService: SearchService,
              private route:ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      
      takenAttendance: [null, Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
    });
  }


  ngOnInit():void{
    //checks if the id param navigations have changed
    let today = new Date();
     this.todayYear = today.getFullYear();
    this.sub = this.route.params.subscribe(params => {
     this.id = +params['id'];
     //sconsole.log(id);
     //console.log(schoolId);
     this.getSchoolData(this.id);
     this.fetchSchool(this.id);
     this.getStats(this.id);
     this.getSevenDaysAttendance(this.id);
     this.getEnrollmentGraph(this.id);
     this.getAnnualEnrollmentGender(this.id);

     this.getAnnualAttendanceGender(this.id,this.todayYear);
     this.getMonthlyAttendance(this.id);
     this.getEnrolledMonthlyAttendance(this.id);
     this.getEnrolledSevenDaysAttendance(this.id);
     this.getEnrolledAnnualAttendanceGender(this.id, this.todayYear);

      let date=new Date(this.get_start_date(30))
      let d=new Date()
      this.start_date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

      this.end_date=this.get_formatted_date(d)

      
      this.takenAttendance = true
     this.getClasssesAttendanceMonitor(this.id,this.offset, this.limit, this.takenAttendance, this.start_date,this.end_date);

   });

  }
    

    get_start_date(days){
      var d=new Date()
      return d.setDate(d.getDate() - days);
     }
     get_formatted_date(date){
       return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
     }

    getRegisteredChildren(){
      this.router.navigate(['/children/view-children', this.id],{skipLocationChange: true});
    }

    getEnrolledChildren(){
      this.router.navigate(['/children/enrollments', this.id],{skipLocationChange: true});
    }

  onSubmit(attendance: attendanceTake){
    if(!this.submitted){

      //edit
    }else{

      this.atTk = new attendanceTake( attendance.takenAttendance,attendance.startDate,attendance.endDate);

      this.getClasssesAttendanceMonitor(this.id, this.offset,this.limit, attendance.takenAttendance,attendance.startDate,attendance.endDate );
    }
  }


  resetButton(){
    this.form.reset();
  }

  onPage(event){

  }

  onActivate(event){

  }

  getClasssesAttendanceMonitor(id,offset,limit,taken, start_date, end_date): void {

    this._searchService.getClasssesAttendanceMonitor(id,taken, start_date, end_date).subscribe(data => {
     //console.log(data, start_date,end_date)
       const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      data = data.results;
      let allClasses =[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
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
      this.temp = [...allClasses];
      //our initial data
      this.classes = allClasses;
      this.selected = [];
    });
  }

  onSelect({ selected }) {
   //localStorage.setItem('classId', this.selected[0].id);
   //this.getClassId(this.selected[0].id);
   }

   private getClassId(id){
     //console.log('yes');
     //this.location.replaceState("/classes/class/"+id);
   this.router.navigate(['/classes/class', id],{skipLocationChange: true});

   }

  public getStats(id):void {
    this.errorSearch = '';
    this._searchService.getSchoolStats(id).subscribe(
      (data)  =>
      {
        this.males = (data.results[0].enrolled_males+data.results[0].old_males);
        this.females = (data.results[0].enrolled_females+data.results[0].old_females);
        this.totalStudents = data.results[0].total;
        this.enrolledStudents = (data.results[0].enrolled_males+data.results[0].enrolled_females);
        this.dropouts = data.results[0].dropout_total;
      }
    );
  }
  //Shimanyi - Get top level School Data
  public getSchoolData(id){

    this._adminLayoutService.sendSearch({search:id,"details":{
      id:id
    }}).subscribe(
      (data)  =>
      {
        //console.log(data)
        this.schoolname=data.school_name;
        this.schoolEmisCode = data.emis_code;
        this.county = data.county;
        this.zone = data.zone;

      },
      error =>{

        this.errorSearch = 'Id  not found';
      }
    );
  }

//get school name
public fetchSchool(id){
  this._searchService.getSchoolData(id).subscribe(
    (data)  =>
    {
      //console.log(data);
      let res = data.results;
      this.schoolname=res[0].school_name;
      this.schoolEmisCode = res[0].emis_code;
      if(res[0].county_name = 'null'){
        this.county = 'N/A';
      }else{
        this.county = res[0].county;
      }
      if(res[0].subcounty_name = 'null'){
        this.subcountyname = 'N/A';
      }else{
        this.subcountyname = res[0].subcounty_name;
      }
      this.zone = res[0].zone;
    }
  );
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

    // Bar
    public barChartLabels: string[] = [];
    public barChartLabelsEnrolled: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [{}];
    public barChartDataEnrolled: any[] = [{}];
    public barChartOptions: any = Object.assign({
      scaleShowVerticalLines: false,
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
            defaultFontColor: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          },
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
             defaultFontColor: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          },
          stacked: true
        }]
      }
    }, this.globalChartOptions);

    /* Annual year clicked for all children
-------------
*/
  public getYearClicked(event){
   
      this.getAnnualAttendanceGender(this.id, event);
    
    
  }

    public getAnnualAttendanceGender(id, yr){
      this._searchService.getAnnualAttendanceGender(id).subscribe( data => {
        //console.log(yr, this.todayYear);
      data = data.results;
      if(yr != this.todayYear){
        
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
      }else if(yr == this.todayYear){
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
      }
      

      

    });
  }


    //Norman - pie chart data for enrollment based on gender

  public getAnnualEnrollmentGender(id){

    this._searchService.getAnnualEnrollmentGender(id).subscribe( data => {
       
      data = data.results;
      let enrolled = [];
      enrolled.push(data[0].old_males);
      enrolled.push(data[0].old_females);
      enrolled.push(data[0].enrolled_females);
      enrolled.push(data[0].enrolled_males);
      this.pieChartEnrollmentData = enrolled;
     
    });
  }

 public getEnrolledYearClicked(event){
    
      this.getEnrolledAnnualAttendanceGender(this.id, event);
    
    
  }
    //Norman - total children enrolled in all the classes
    public getChildrenEnrolled(id){

      this._searchService.getChildrenEnrolled(id).subscribe( data => {
        //console.log(data, "sdsdasdsd");
        data=data.results
        let subset = data.slice(Math.max(data.length - 8, 0));

        let columns:string[] = [];
        let totalEnrolledStudents: number [] = [];
        let totalStudents: number [] = [];

        for(let i = 0; i < subset.length; i++){
          columns.push(subset[i].value);
          totalStudents.push(subset[i].total);
          totalEnrolledStudents.push(subset[i].enrolled_males+subset[i].enrolled_females);
        }

        this.EnrolledComboChartLabels = columns;
        this.EnrolledComboChartData  = [{
          data: totalEnrolledStudents,
          label: 'Newly Enrolled Students',
          borderWidth: 1,
          type: 'line',
          fill: false
        },{
          data: totalStudents,
          label: 'Total Students',
          borderWidth: 1,
          type: 'bar',
        }];
    });
    }

 public getEnrollmentGraph(id){

    this._searchService.getEnrollmentGraph(id).subscribe( data => {
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

    public getSevenDaysAttendance(id){

      this._searchService.getSevenDaysAttendance(id).subscribe( data => {

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
        this.columnData = this.barChartLabels.length;
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

    public getMonthlyAttendance(id){

      this._searchService.getMonthlyAttendance(id).subscribe( data => {
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

columnOOSCSevenData:any;
   public getEnrolledSevenDaysAttendance(id){

    this._searchService.getEnrolledSevenDaysAttendance(id).subscribe( data => {
      data = data.results;
      //console.log(data, 'OOSC');
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
      this.columnOOSCSevenData =  columns.length;
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


columnEnrolledMonthData:any;
  public getEnrolledMonthlyAttendance(id){

    this._searchService.getEnrolledMonthlyAttendance(id).subscribe( data => {
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



      this.comboChartLabelsEnrolled = columns;
      this.columnEnrolledMonthData = this.comboChartLabelsEnrolled.length
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


  public getEnrolledAnnualAttendanceGender(id, yr){
      this._searchService.getEnrolledAnnualAttendanceGender(id).subscribe( data => {
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
}
