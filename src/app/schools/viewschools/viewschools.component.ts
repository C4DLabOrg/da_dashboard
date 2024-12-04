import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewSchoolsService } from './viewschools.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';

@Component({
  selector: 'app-viewschools',
  templateUrl: './viewschools.component.html',
  styleUrls: ['./viewschools.component.scss'],
  providers: [ViewSchoolsService]
})
export class ViewSchoolsComponent implements OnInit {

  constructor(private schoolService: ViewSchoolsService,private router: Router, private fb: FormBuilder ) {

  }

  public form: FormGroup;
  public countyForm:FormGroup;
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
  partneradminId: number;
  columns = [
    {name: 'Number'},
    { name: 'Name' },
    { name: 'Emiscode' },
    { name: 'Level' }
  ];

   allColumns = [
     {name: 'Number'},
    { name: 'Name' },
    { name: 'Emiscode' },
    { name: 'Level' }
  ];

  toggle(col) {
    const isChecked = this.isChecked(col);

    if(isChecked) {
      this.columns = this.columns.filter(c => { 
        return c.name !== col.name; 
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  countyName:any;
  county:any;
  selectedCounty:any;
  getSchoolCounties(){

    this.schoolService.getCounties()
      .subscribe(res=>{

          res = res.results;
          this.countyName = [];
          for(let i =0; i<res.length;i++){
            this.county = {};
            this.county.county_name = res[i].county_name;
            this.county.id = res[i].id;
            this.county.sub_counties = res[i].subcounties;
            this.countyName.push(this.county);
          }
          // console.log(this.county.sub_counties);
        });
  }

  onSelectCounty(name,id){
    this.selectedCounty = id;
    this.fetchPartnerCountySchools(this.offset,this.limit,this.selectedCounty)
  }



  fetchSchools(offset,limit): void {
    this.schoolService.fetchSchools(this.page).subscribe(data => {
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


    fetchPartnerCountySchools(offset,limit,id){
      this.schoolService.fetchPartnerCountySchools(this.partnerId,this.page,id).subscribe(data => {
        //console.log(data);
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
      this.schoolService.fetchPartnerSchools(id,this.page).subscribe(data => {
        console.log(data);
        //start and end for pagination
        const start = offset * limit;
        const end = start + limit;
         this.count =data.count

         console.log(this.count, 'ssdhsjdhsdjhsd')
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

    //partner admin
    fetchPartnerAdminSchools(id,offset,limit): void {
      this.schoolService.fetchPartnerAdminSchools(id,this.page).subscribe(data => {
        //console.log(data)
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
      localStorage.setItem('schoolId', this.selected[0].id);
       if(event.srcElement.localName == 'button'){
         localStorage.setItem('editEmisCode', this.selected[0].emiscode);
        // console.log('Edit Clicked')
         this.router.navigate(['/schools/edit-school/', this.selected[0].id]);
       }else{
        // console.log('Page Clicked')
         this.router.navigate(['/school', this.selected[0].id],{skipLocationChange: true});
       }
     
     
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
         this.schoolService.searchPartnerData(this.partnerId, search.search)
             .subscribe(
               data => //console.log(data)
               {
                 console.log(data);
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
                 this.empty = "This field is required";
                 this.fail = "Failed to save data";
               }
             );
         }
         else if(this.partneradminId){
                    this.schoolService.searchPartnerAdminData(this.partneradminId, search.search)
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
                 this.empty = "This field is required";
                 this.fail = "Failed to save data";
               }
             );
         }
         else{
           this.schoolService.searchData(search.search)
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

     if(this.selectedCounty){
       //console.log('dsdjhdskjsdkjsdkj')
       this.fetchPartnerCountySchools(event.offset,event.limit,this.selectedCounty);
     }else{
       //console.log('hapa leao')
       this.fetchPartnerSchools(this.partnerId, event.offset,event.limit);
     } 
   }else if(this.partneradminId){
     this.fetchPartnerAdminSchools(this.partneradminId, this.offset,this.limit);
   }else{
     //console.log('shcoollhdkjsdsdksdajsdlkkskdsajd')
     this.fetchSchools(event.offset,event.limit);
   }
 }

 onActivate(event) {
   //console.log('Activate Event', event);
 }

 partnerLog:boolean =false;

  ngOnInit(): void {
    this.loading = true;

    this.form = this.fb.group({
      search: [null],
      //emiscode: [null]
    });

    this.countyForm = this.fb.group({
      county:[null]
    })

    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    this.partneradminId = JSON.parse(localStorage.getItem("partneradminId"));
    let partnerName = localStorage.getItem("welcomeName");

    if(this.partnerId && partnerName){

      this.partnerLog = true
      this.getSchoolCounties()
      this.fetchPartnerSchools(this.partnerId, this.offset,this.limit);
    }else if(this.partneradminId && partnerName){
      this.fetchPartnerAdminSchools(this.partneradminId, this.offset,this.limit);
    }
    else{
      this.fetchSchools(this.offset,this.limit);
    }

  }

}
