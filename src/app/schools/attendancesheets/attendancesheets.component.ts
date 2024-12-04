import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AttendancesheetsService } from './attendancesheets.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';
import { SchoolattendanceService} from './schoolattendance/schoolattendance.service';

@Component({
  selector: 'app-viewschools',
  templateUrl: './attendancesheets.component.html',
  styleUrls: ['./attendancesheets.component.scss'],
  providers: [AttendancesheetsService,SchoolattendanceService]
})
export class AttendancesheetsComponent implements OnInit {

  constructor(private _schoolattendanceService: SchoolattendanceService,private _attendancesheetsService: AttendancesheetsService,private router: Router, private fb: FormBuilder ) {

  }
  public form: FormGroup;
  public submitted: boolean =  true;
  public search: Search;
  success:string;
  empty: string;
  fail: string;
  loading: boolean;
  temp = [];
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  page:number=1

  dt:any;
  schools: any[];
  selected: any[];
  public schoolId;
  table = {
    offset: 0
  };
  partnerId: number;

  columns = [
    {name: 'Number'},
    { name: 'Name' },
    { name: 'Emiscode' },
    { name: 'Level' },
  ];
  public linkStudentDetails;

  fileStudentsDownload(id){

      this._schoolattendanceService.getAllStudentDetailsExportFile(id).subscribe(
        (data)  =>
        {
          //console.log(data.results[0]);
          console.log(data);
          this.linkStudentDetails = data.link;
        }
      );
    }

  fetchSchools(offset,limit): void {
    this._attendancesheetsService.fetchSchools(this.page).subscribe(data => {
      //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      this.loading = false;
      let items =[];
      let rowss = [];
      for (let i = 0; i < data.results.length; i++){
        this.dt = {}
        let num = ((this.page-1)*100)+(i+1)
        this.dt.number = num
        this.dt.name = data.results[i].school_name
        this.dt.emiscode = data.results[i].emis_code
        this.dt.level = data.results[i].level
        this.dt.id = data.results[i].id
        items.push(this.dt)

      }

      //cached data
      let rowSchool=[...rowss]
      this.temp=[...items];
      let j=0
      for (let i = start; i < end; i++) {
        rowSchool[i] = items[j];
        j++;
      }
      //initial data
      this.schools=rowSchool;

      this.selected = [];

      //console.log('Page Results',this.schools,this.count, start, end);

    });
  }


    //individual partners
    fetchPartnerSchools(id,offset,limit): void {
      this._attendancesheetsService.fetchPartnerSchools(id,this.page).subscribe(data => {
        //start and end for pagination
        const start = offset * limit;
        const end = start + limit;
         this.count =data.count
        this.loading = false;
        let items =[];
        let rowss = [];
        for (let i = 0; i < data.results.length; i++){
          this.dt = {}
          let num = ((this.page-1)*100)+(i+1)
          this.dt.number = num
          this.dt.name = data.results[i].school_name
          this.dt.emiscode = data.results[i].emis_code
          this.dt.level = data.results[i].level
          this.dt.id = data.results[i].id
          items.push(this.dt)

        }

        //cached data
        let rowSchool=[...rowss]
        this.temp=[...items];
        let j=0
        for (let i = start; i < end; i++) {
          rowSchool[i] = items[j];
          j++;
        }
        //initial data
        this.schools=rowSchool;

        this.selected = [];

        //console.log('Page Results',this.schools,this.count, start, end);

      });
    }

  onSelect({ selected }) {
   //console.log('Select Event', selected, this.selected,this.selected[0].emiscode);
   localStorage.setItem('attendanceschoolId', this.selected[0].id);
   localStorage.setItem('attendanceschoolName', this.selected[0].name);

   this.router.navigate(['/schools/export-sheets', this.selected[0].id],{skipLocationChange:true});
 }

 updateFilter(event) {
   const val = event.target.value.toLowerCase();

   // filter our data
   const temp = this.temp.filter(function(d) {
     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
   });
   // update the rows
   this.schools = temp;
   // Whenever the filter changes, always go back to the first page
   this.table.offset = 0;
 }

 searchSchool(search: Search){
   if(!this.submitted){

     //edit
   }else{
       //console.log(this.partnerId);
       if(this.partnerId){
         this._attendancesheetsService.searchPartnerData(this.partnerId, search.search)
             .subscribe(
               data => //console.log(data)
               {
                 //console.log(data);
                 this.count =data.count
                 let res =data.results;
                 let items =[];
                 for (let i = 0; i < res.length; i++){
                   this.dt = {}
                   let num = ((this.page-1)*100)+(i+1)
                   this.dt.number = i+1
                   this.dt.schoolcode = res[i].school_code
                   this.dt.name = res[i].school_name
                   this.dt.emiscode = res[i].emis_code
                   this.dt.level = res[i].level
                   this.dt.id = res[i].id
                   items.push(this.dt)

                 }

                 this.temp=[items];
                 this.schools=items;
               },
               error =>{
                 //console.log(error)
                 this.empty = "This field is required";
                 this.fail = "Failed to save data";
               }
             );
         }else{
           this._attendancesheetsService.searchData(search.search)
               .subscribe(
                 data => //console.log(data)
                 {
                   //console.log(data);
                   this.count =data.count
                   let items =[];
                   for (let i = 0; i < data.results.length; i++){
                     this.dt = {}
                     let num = ((this.page-1)*100)+(i+1)
                     this.dt.number = i+1
                     this.dt.schoolcode = data.results[i].school_code
                     this.dt.name = data.results[i].school_name
                     this.dt.emiscode = data.results[i].emis_code
                     this.dt.level = data.results[i].level
                     this.dt.id = data.results[i].id
                     items.push(this.dt)

                   }

                   this.temp=[items];
                   this.schools=items;
                   //console.log(items);
                 },
                 error =>{
                   //console.log(error)
                   this.empty = "This field is required";
                   this.fail = "Failed to save data";
                 }
               );
         }
       }
 }

 onPage(event) {
   this.page=event.offset+1
   if(this.partnerId){
     this.fetchPartnerSchools(this.partnerId, event.offset,event.limit);
   }else{
     this.fetchSchools(event.offset,event.limit);
   }
 }

 onActivate(event) {
   //console.log('Activate Event', event);
 }

  ngOnInit(): void {

    this.loading = true;

    this.form = this.fb.group({
      search: [null, Validators.compose([Validators.required,])],
    });

    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    let partnerName = localStorage.getItem("welcomeName");
    if(this.partnerId && partnerName){
      this.fetchPartnerSchools(this.partnerId, this.offset,this.limit);
      //this.fileStudentsDownload(this.partnerId);
    }else{
      this.fetchSchools(this.offset,this.limit);
    }

  }

}
