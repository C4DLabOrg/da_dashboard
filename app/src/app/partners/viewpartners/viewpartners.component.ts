import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewpartnersService} from './viewpartners.service';
import {EnrollmentService} from '../../children/enrollment/enrollment.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';



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

  columns = [
    { name: 'Organization', filtering:{filterString: '', placeholder: 'Filter by name'} },
    { name: 'Email' },
    { name: 'Phonenumber' },
    { name: 'Boys'},
    { name: 'Girls'},
    { name: 'Total'}
  ];

  constructor( private partnersService: ViewpartnersService,private enrollmentService: EnrollmentService,private router: Router,private fb: FormBuilder) {
  }
  dx:any;
  //fetching number of boys per partner
  fetchPartnerBoyChildTotal(id){
    this.partnersService.fetchPartnerBoyChildTotal(id).subscribe(data => {
      this.dx = data.count;

    });
    return this.dx;
  }
  girl = []
  fetchPartnerGirlChildTotal(id):any{


  }
girlNumber:any;
girlsArray = [];
  //fetching number of girls per partner

partner = [];
b:any;
z:any;
  //admin
  fetchpartners(offset,limit): void {

    this.partnersService.fetchPartners(this.page).subscribe(data => {
      console.log(data);
      //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      data = data.results;
      this.loading = false;

      //let partner =[]
      let rows=[]
      let girlsarray = []

        for(let k =0; k<data.length; k++){

          this.id = data[k].id
          this.partnersService.fetchPartnerGirlChildTotal(this.id).subscribe(data => {
            //console.log(data);
              this.b = {}
              this.b.girls = data.count;
              //console.log(data.count);
              this.girlsArray.push(this.b);
          });

          this.girlsArray = girlsarray


        }
      //  this.count = data.length;
      for (let i = 0;i < data.length;i++){
        this.id = data[i].id
        let a:any;
        a = this.fetchPartnerBoyChildTotal(this.id);

        this.dt = {}
        this.dt.organization=data[i].name
        this.dt.email=data[i].email
        this.dt.phone=data[i].phone
        this.dt.id = data[i].id
        this.dt.boys = this.dx

        this.dt.girls = girlsarray
        this.dt.total = 0
        this.partner.push(this.dt)
      }
      console.log(this.partner);
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
      if(!this.submitted){

        //edit
      }else{
        this.partnersService.searchData(search.search)
            .subscribe(
              data => //console.log(data)
              {

                let partner =[]
                let rows=[]
                //  this.count = data.length;
                for (let i = 0;i < data.length;i++){
                  this.id = data[i].id

                  this.dt = {}
                  this.dt.organization=data[i].name
                  this.dt.email=data[i].email
                  this.dt.phone=data[i].phone
                  this.dt.id = data[i].id
                  this.dt.total = this.dt.boys+this.dt.girls
                  partner.push(this.dt)
                }

                this.temp=[partner];
                this.partners=partner;
                console.log(partner);
              },
              error =>{
                this.empty = "This field is required";
                this.fail = "Failed to save data";
              }
            );
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

    console.log('Filter event', event);
  }



  onPage(event) {
    console.log(event.offset);
    this.page=event.offset+1
    this.fetchpartners(event.offset, event.limit);
  }

  ngOnInit(): void {
    this.loading = true;
    this.form = this.fb.group({
      search: [null, Validators.compose([Validators.required,])],
    });

    this.fetchpartners(this.offset, this.limit);
  }

}
