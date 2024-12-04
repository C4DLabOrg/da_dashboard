import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewTeachersService } from './viewteachers.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';

@Component({
  selector: 'app-viewteachers',
  templateUrl: './viewteachers.component.html',
  styleUrls: ['./viewteachers.component.scss'],
  providers: [ViewTeachersService]
})
export class ViewTeachersComponent implements OnInit {

  constructor(private teachersService: ViewTeachersService,private router: Router,private activateRoute:ActivatedRoute,private fb: FormBuilder) {  }

  public form: FormGroup;
  public submitted: boolean =  true;
  public search: Search;
  success:string;
  empty: string;
  fail: string;
  loading:boolean;
  rows = [];
  teachers : any[] = this.rows;
  selected: any[];
  tmp :any;
  temp = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  page:number=1
  table = {
    offset: 0
  };

  schoolId: number;

  columns = [
    {name: 'Number'},
    { name: 'Name' },
    { name: 'Phonenumber' },
    { name: 'Gender' },
    //{ name: 'Qualifications' },
    { name: 'Type' }

  ];

  fetchTeachers(id,offset,limit): void{
    this.teachersService.fetchTeachers(id,this.page).subscribe( data=> {
      //start and end for pagination
      const start = offset * limit;
      const end = start + limit;
       this.count =data.count
       //console.log(data)
      data = data.results;
      this.loading = false;

      let items = [];
      let rows=[];
      for (let i = 0; i < data.length; i++){
        //console.log(data[i].phone_no)
        this.tmp = {}
        let num = ((this.page-1)*100)+(i+1)
        this.tmp.number = num
        this.tmp.name = data[i].name
        this.tmp.phonenumber = data[i].phone_no
        this.tmp.gender = data[i].gender
      //  this.tmp.qualifications = data[i].qualifications
        this.tmp.type = data[i].teacher_type
        this.tmp.id = data[i].id
        items.push(this.tmp);
      }

      //cache our data
      let row=[...rows]
      this.temp = [...items];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = items[j];
        j++;
      }
      //our initial data
      this.teachers = items;
      this.selected = [];

    });
  }


      searchSchool(search: Search){
        if(!this.submitted){

          //edit
        }else{
            if(this.schoolId){
              this.teachersService.searchTeacherData(this.schoolId, search.search)
                  .subscribe(
                    data => //console.log(data)
                    {
                      this.count =data.count
                      let items = [];
                      let rows=[];
                      for (let i = 0; i < data.length; i++){
                        this.tmp = {}
                        let num = ((this.page-1)*100)+(i+1)
                        this.tmp.number = i+1
                        this.tmp.name = data[i].name
                        this.tmp.phonenumber = data[i].phone_no
                        this.tmp.gender = data[i].gender
                      //  this.tmp.qualifications = data[i].qualifications
                        this.tmp.type = data[i].teacher_type
                        this.tmp.id = data[i].id
                        items.push(this.tmp);
                      }

                      this.temp=[items];
                      this.teachers=items;
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
    //console.log(event.offset);
    this.page=event.offset+1

    this.fetchTeachers(this.schoolId,event.offset, event.limit);

  }


  ngOnInit(): void {
    this.loading = true;
    this.form = this.fb.group({
      search: [null, Validators.compose([Validators.required,])],
    });

    this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
    console.log(this.schoolId);
    this.fetchTeachers(this.schoolId,this.offset, this.limit);
  }
 
    onSelect({ selected }) {
        localStorage.setItem('teacherId', this.selected[0].id);
     //console.log(event,, 'Select Event', selected, this.selected,this.selected[0].emiscode);
       if(event.srcElement.localName == 'button'){
         //localStorage.setItem('teacherId', this.selected[0].emiscode);
        // console.log('Edit Clicked')
         this.router.navigate(['/teachers/edit-teacher/', this.selected[0].id],{skipLocationChange: true});
       }else{
        // console.log('Page Clicked')
         this.getTeacherId(this.selected[0].id);
       }
     
     
   }

private sub:any;
routeId:number;
   private id(){
     this.sub = this.activateRoute.params.subscribe(params => {

       this.routeId = +params[this.selected[0].id]; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
   }

   private getTeacherId(id){

     this.router.navigate(['/teachers/teacher', id],{skipLocationChange: true});

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
    this.teachers = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


}
