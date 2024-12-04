import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { EnrollmentService} from '../enrollment/enrollment.service';
import {ViewpartnersService} from '../../partners/viewpartners/viewpartners.service'
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';



@Component({
  selector: 'app-children',
  templateUrl: './schoolenrollment.component.html',
  styleUrls: ['./schoolenrollment.component.scss'],
  providers: [EnrollmentService,ViewpartnersService]

})
export class SchoolenrollmentComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean =  true;
  public search: Search;
  sub:any;
  success:string;
  empty: string;
  fail: string;
  loading:boolean;
  dt:any;
  rows = [];
  children: any[] = this.rows;
  selected: any[];
  temp = [];
  //count: number = 0;
  offset: number = 0;
  limit: number = 100;
  page:number=1
  table = {
    offset: 0
  };
  males:any;
  females:any;
  admin:any;
  allChildren:number;
  count:number;
  partnerId:number;
  schoolId:number;

  columns = [
    {name: 'Number'},
    { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} },
    { name: 'Gender' },
    { name: 'School' },
    { name: 'Class' },

  ];

  constructor(private enrollmentService: EnrollmentService, private partnerService: ViewpartnersService, private router: Router,private route:ActivatedRoute,private fb: FormBuilder){}
  partner:any;
  gender:any;
  allpartners = [];

  fetchAllSchoolChildren(id):void{
    this.enrollmentService.fetchAllSchoolChildren(id).subscribe(data =>{
      this.allChildren = data.count;
      //console.log(this.count);
      //console.log(this.enrollmentPercentage);
      //console.log(data, "All children");
    })
  }
  fetchSchoolChildren(id,offset,limit): void {
    this.enrollmentService.fetchSchoolChildren(id,this.page).subscribe(data => {
      //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
      data = data.results;
      this.loading = false;

      let childs =[]
      let rows=[]
      //  this.count = data.length;
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        let num = ((this.page-1)*100)+(i+1)
        this.dt.number = num
        this.dt.name=data[i].student_name
        this.dt.gender=data[i].gender
        this.dt.school = data[i].school_name
        this.dt.class=data[i].class_name
        this.dt.id = data[i].id
        childs.push(this.dt)
      }
      //cache our data
      //this.temp = childs;

      //this.temp=row
      this.children=childs;

      //console.log('Page Results',this.children,this.count, start, end);

    });
  }

  //school
  fetchSchoolBoyChildTotal(id):number{
    this.enrollmentService.fetchSchoolBoyChildTotal(id).subscribe(data => {
      this.males = data.count;
    });
    return this.males;
  }
  fetchSchoolGirlChildTotal(id):number{
    this.enrollmentService.fetchSchoolGirlChildTotal(id).subscribe(data => {
      this.females = data.count;

    });
    return this.females;
  }

  searchChild(search: Search){

    if(!this.submitted){

      //edit
    }else{
      //console.log(search.search, search.gender);

      if(this.schoolId){
        //search by name
        if(search.search){
          this.enrollmentService.searchSchoolData(this.schoolId, search.search)
            .subscribe(
              data => //console.log(data)
              {
                //console.log(data);
                let res = data.results;
                this.count = data.count;
                let childs =[];
                let rows=[]
                for (let i = 0; i < data.results.length; i++){
                  this.dt = {}
                  let num = ((this.page-1)*100)+(i+1)
                  this.dt.number = i+1
                  this.dt.emiscode=res[i].emis_code
                  this.dt.name=res[i].student_name
                  this.dt.gender=res[i].gender
                  this.dt.attendance=res[i].last_attendance
                  this.dt.school = res[i].school_name
                  this.dt.class=res[i].class_name
                  this.dt.id = res[i].id
                  childs.push(this.dt)
                }

                //this.temp=[childs];
                this.children=childs;
                //console.log(childs);
              },
              error =>{
                this.empty = "This field is required";
                this.fail = "Failed to save data";
              }
            );
          }
          //search by gender
          else if(search.gender){
            this.enrollmentService.searchSchoolDataGender(this.schoolId,search.gender)
                .subscribe(
                  data => //console.log(data)
                  {
                    this.count =data.count
                    let res = data.results;
                    let childs =[];
                    let rows=[]
                    for (let i = 0; i < data.results.length; i++){
                      this.dt = {}
                      let num = ((this.page-1)*100)+(i+1)
                      this.dt.number = i+1
                      this.dt.emiscode=res[i].emis_code
                      this.dt.name=res[i].student_name
                      this.dt.gender=res[i].gender
                      this.dt.attendance=res[i].last_attendance
                      this.dt.school = res[i].school_name
                      this.dt.class=res[i].class_name
                      this.dt.id = res[i].id
                      childs.push(this.dt)

                    }

                    this.temp=[childs];
                    this.children=childs;
                  //  console.log(childs);
                  },
                  error =>{
                    this.empty = "This field is required";
                    this.fail = "Failed to save data";
                  }
                );
          }
          //search by name and gender
          else if(search.search && search.gender){
            this.enrollmentService.searchSchoolDataGenderName(this.schoolId,search.gender,search.search)
                .subscribe(
                  data => //console.log(data)
                  {
                    this.count = data.count;
                    let res = data.results;
                    let childs =[];
                    let rows=[]
                    for (let i = 0; i < data.results.length; i++){
                      this.dt = {}
                      let num = ((this.page-1)*100)+(i+1)
                      this.dt.number = i+1
                      this.dt.emiscode=res[i].emis_code
                      this.dt.name=res[i].student_name
                      this.dt.gender=res[i].gender
                      this.dt.attendance=res[i].last_attendance
                      this.dt.school = res[i].school_name
                      this.dt.class=res[i].class_name
                      this.dt.id = res[i].id
                      childs.push(this.dt)

                    }

                    this.temp=[childs];
                    this.children=childs;
                  //  console.log(childs);
                  },
                  error =>{
                    this.empty = "This field is required";
                    this.fail = "Failed to save data";
                  }
                );
          }
          else{
            this.empty = "Kindly select a filtering field";
          }
        }
      }
  }

  onSelect({ selected }) {
   //console.log('Select Event', selected, this.selected,this.selected[0].id);
   localStorage.setItem('childId', this.selected[0].id);
   this.getChildId(this.selected[0].id);
   //this.router.navigate(['/children/child', this.selected[0].id]);
   }

   private getChildId(id){

     this.router.navigate(['/children/child', id],{skipLocationChange:true});

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
      this.children = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = this.page;

    //console.log('Filter event', event);
  }



  onPage(event) {
    this.page=event.offset+1
    this.fetchSchoolChildren(this.schoolId,event.offset, event.limit);

  }

  ngOnInit(): void {
    this.loading = true;
    this.form = this.fb.group({
      search: [null],
      gender: [null],
      partner: [null]
    });

    this.sub = this.route.params.subscribe(params => {
     this.schoolId = +params['id'];

      this.fetchSchoolChildren(this.schoolId,this.offset, this.limit);
      this.fetchSchoolBoyChildTotal(this.schoolId);
      this.fetchSchoolGirlChildTotal(this.schoolId);
      this.count = this.fetchSchoolBoyChildTotal(this.schoolId)+this.fetchSchoolGirlChildTotal(this.schoolId);
      this.fetchAllSchoolChildren(this.schoolId);
      });

  }
}
