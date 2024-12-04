import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewpartnersService} from './viewpartners.service';
import { EnrollmentService} from '../../children/enrollment/enrollment.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-partner',
  templateUrl: './viewpartners.component.html',
  styleUrls: ['./viewpartners.component.scss'],
  providers: [ViewpartnersService,EnrollmentService]

})
export class ViewpartnersComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean =  true;
  public search: Search;
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
    { prop: 'number', name: ''},
    { prop: 'organization', name: 'ORGANIZATION', filtering:{filterString: '', placeholder: 'Filter by name'}},
    { prop: 'girlsenrolled', name: 'GIRLS ENROLLED'},
    { prop: 'boysenrolled', name: 'BOYS ENROLLED'},
    { prop: 'totalenrolled', name: 'ENROLLMENTS'},
    { prop: 'totalgirls', name: 'TOTAL GIRLS'},
    { prop: 'totalboys', name: 'TOTAL BOYS'},
    { prop: 'totalchildren', name: 'TOTAL CHILDREN'},
    { prop: 'lastuploaded', name: 'LAST UPDATE'}
  ];

  constructor( private partnersService: ViewpartnersService,private enrollmentService: EnrollmentService,private router: Router,private fb: FormBuilder) {
  }

  //admin
  fetchpartners(offset,limit): void {

    this.partnersService.fetchPartners(this.page).subscribe(data => {
       //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count = data.count
      data = data.results;
      this.loading = false;
      //console.log(data);
      //let partner =[]
      let rows=[]
      //  this.count = data.length;
      for (let i = 0;i < data.length;i++){
        this.id = data[i].id
        let a:any;

        this.dt = {}
        let num = ((this.page-1)*100)+(i+1)
        this.dt.number = num
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
        this.partner.push(this.dt)
      }
      //console.log(this.partner);
      //cache our data
      //this.temp = childs;
      let row=[...rows]
      this.temp=[...this.partner];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = this.partner[j];
        j++;
      }
      //this.temp=row
      this.partners=row;

      this.selected = [];

      //console.log('Page Results',this.partners,this.count, start, end);

    });
  }

  //partner admin
  fetchpartnersAdmin(offset,limit, id): void {

    this.partnersService.fetchPartnersAdmin(this.page,id).subscribe(data => {
       //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      data = data.results;
      this.loading = false;
      //console.log(data);
      //let partner =[]
      let rows=[]
      //  this.count = data.length;
      for (let i = 0;i < data.length;i++){
        this.id = data[i].id
        let a:any;

        this.dt = {}
        this.dt.organization=data[i].name
        let num = ((this.page-1)*100)+(i+1)
        this.dt.number = num
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
        this.partner.push(this.dt)
      }
      //console.log(this.partner);
      //cache our data
      //this.temp = childs;
      let row=[...rows]
      this.temp=[...this.partner];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = this.partner[j];
        j++;
      }
      //this.temp=row
      this.partners=row;

      this.selected = [];

      //console.log('Page Results',this.partners,this.count, start, end);

    });
  }


    //search function
    searchSchool(search: Search){
      if(this.partneradminid){
        if(!this.submitted){

        //edit
        }else{
          this.partnersService.searchDataPartnerAdmin(search.search,this.partneradminid)
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
                  this.dt.organization=data[i].name
                  let num = ((this.page-1)*100)+(i+1)
                  this.dt.number = i+1
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

          this.partnersService.searchData(search.search)
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
                  this.dt.organization=data[i].name
                  let num = ((this.page-1)*100)+(i+1)
                  this.dt.number = i+1
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
    
  onSelect({ selected }) {
   localStorage.setItem('partnerId', this.selected[0].id);
   this.navigatePartner(this.selected[0].id);
   //this.router.navigate(['/partners/child', this.selected[0].id]);
   }

   private navigatePartner(id){
     //console.log('show partner')
     this.router.navigate(['partners/partner/', id],{skipLocationChange: true});
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

  onPage(event) {
    //console.log(event.offset);
    this.page=event.offset+1
    this.fetchpartners(event.offset, event.limit);
  }

  
  ngOnInit(): void {
    this.partneradminid = JSON.parse(localStorage.getItem("partneradminId"));

    this.loading = true;
    this.form = this.fb.group({
      search: [null, Validators.compose([Validators.required,])],
    });

    if(this.partneradminid){
      this.fetchpartnersAdmin(this.offset, this.limit, this.partneradminid);
    }else{
      this.fetchpartners(this.offset, this.limit);
    }
    
  }


  /*rowClass = (row)=> {
    let ar = []
    for(var i=0; i < row.length; i++){
       if((i % 10) === 0){
         ar.push(row[i])
       }
      }

    return {
      //'age-is-ten': (row.age % 10) === 0
      'age-is-ten': ar

    };
  }*/

}
