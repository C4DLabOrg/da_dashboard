import { Component, OnInit, OnDestroy,Output,EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ClassService} from './class.service';
import { PromotionsService} from '../promotions/promotions.service';


export class promoteClass {
  constructor(public className: string, public classId: any){}
}

@Component({
  selector: 'app-classes',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [ClassService, PromotionsService]
})
export class ClassComponent implements OnInit, OnDestroy{
  @Output() selectedChange:EventEmitter<any> = new EventEmitter();
  classId: any;
  className: any;
  students: any;
  dt:any;
  promoteStudents:any;
  rows = [];
  children: any[] = this.rows;
  selected: any[];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;
  maleNumber:any;
  femaleNumber:any;
  pm:any;
  schoolId: number;
  temp:any;
  classes:any;
  promoteError:any;
  promoteClass: promoteClass;
  public form: FormGroup;
  table = {
    offset: 0
  };

  columns = [
    {name: 'Number'},
    { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} },
    { name: 'Gender' },
    {name: 'Guardianphone'},
    { name: 'Enrolled' },

  ];

  constructor(private classService: ClassService,private promotionService: PromotionsService,private fb:FormBuilder, private router: Router){
    this.form = this.fb.group({
      className: [null, Validators.compose([Validators.required,])],
    });
  }
selectionType:any;
  ngOnInit(){

    this.schoolId = JSON.parse(localStorage.getItem('schoolId'));
    this.classId = localStorage.getItem("classId");
    this.promoteStudents = localStorage.getItem("promoteStudents");
    if(this.promoteStudents){
      this.selectionType = 'checkbox';
    }else{
      this.selectionType = 'single';
    }
    this.getClassses(this.schoolId);
    this.getClassData(this.classId);
  }

  ngOnDestroy(){
    localStorage.removeItem('promoteStudents');
    localStorage.removeItem('classId');
  }

  //getting all classes
  getClassses(id): void {
    this.classService.getClassses(id).subscribe(data => {

      data = data.results;
      //console.log(data);
      let allClasses =[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        //let num = ((this.page-1)*100)+(i+1)
        this.dt.number = i+1
        //console.log(data[i].class_name, ':the classes', data[i].id, ':their ids');
        if(data[i].class_name == null){
          this.dt.class_name = "Class "+data[i].id
        }else{
          this.dt.class_name="Class "+data[i].class_name
        }
        this.dt.id = data[i].id
        allClasses.push(this.dt)
      }
      //cache our data
      this.temp = [...allClasses];
      //our initial data
      this.classes = allClasses;
    });
  }

  getClassData(id){
    this.classService.getClassId(id).subscribe(data =>{
      //  console.log(data);
        this.className = data.class_name;

        let streamId = data.id;
        let schoolId = data.school;

        this.getNumberOfMales(schoolId, streamId);
        this.getNumberOfFemales(schoolId, streamId);

        this.classService.getClassStudents(schoolId,streamId).subscribe(data => {
          //console.log(data);

           this.count =data.count
          this.students = data.count;
          data = data.results;

          //console.log(data);
          let childs =[]
          let rows=[]
          //  this.count = data.length;
          for (let i = 0;i < data.length;i++){
            this.dt = {}
            //let num = ((this.page-1)*100)+(i+1)
            this.dt.number = i+1
            this.dt.name=data[i].student_name
            this.dt.gender=data[i].gender
            if(data[i].guardianphone != null){
              this.dt.guardianphone = data[i].guardianphone
            }else{
              this.dt.guardianphone = 'Not Provided'
            }

            this.dt.enrolled = data[i].date_enrolled
            this.dt.id = data[i].id
            childs.push(this.dt)
          }
          this.children = childs;
          this.selected = [];
        }),
        error => {
          //console.log(error);
        }

    }),
    error=>{
      //console.log(error);
    }
  }

  getNumberOfMales(schoolId, streamId){
    this.classService.getClassMaleStudents(schoolId, streamId).subscribe(data => {

      this.maleNumber = data.count;
    }),
    error =>{

    }
  }

  getNumberOfFemales(schoolId, streamId){
    this.classService.getClassFemaleStudents(schoolId, streamId).subscribe(data => {

      this.femaleNumber = data.count;
    }),
    error =>{

    }
  }
   selectedArray = [];
  onSelect({ selected }) {

  
   //console.log('Select Event', selected, this.selected,this.selected[0].id);
   localStorage.setItem('childId', this.selected[0].id);
   if(!this.promoteStudents){
     this.getChildId(this.selected[0].id);
   }else{

       console.log( this.selected);
       let index = this.selectedArray.indexOf(this.selected[0].id);

       if(index === -1){
         this.selectedArray.push(this.selected[0].id);
         console.log(this.selectedArray.length);
       }else{
         this.selectedArray.splice(index, 1);
         console.log(this.selectedArray.length);
       }
       this.selectedChange.emit(this.selectedArray);
       //this.selectedArray = this.selected;



   }

   //this.router.navigate(['/children/child', this.selected[0].id]);
   }

   private getChildId(id){

     this.router.navigate(['/children/child', id],{skipLocationChange: true});

   }

   promoteAllStudents(promote: promoteClass){
     if(this.schoolId){
         this.promoteClass = new promoteClass(
                               promote.className,
                               promote.classId
                             );
   let studentIDs = [];
   console.log(this.selectedChange, 'selected')
    if(typeof this.selectedArray  && this.selectedArray.length > 0){
      for(let i=0; i<this.selectedArray.length; i++){
        this.pm = {}
        this.pm = this.selectedArray[i].id;
        studentIDs.push(this.pm);
      }
    }else{
      for(let i=0; i<this.children.length; i++){
        this.pm = {}
        this.pm = this.children[i].id;
        studentIDs.push(this.pm);
      }
    }

     //console.log(promote.className,promote.classId, 'the class selected');
     if(promote.className !="null"){
         this.promotionService.promoteStudents({

           class_id: promote.className,
           students: studentIDs
         }).subscribe(data=>{
           this.router.navigate(['promoted']);
         },error=>{
           this.promoteError = "Failed to promote. Try again later";
         }
       )
     }else{
         this.promotionService.promoteStudents({

           class_id: promote.classId,
           students: studentIDs
         }).subscribe(data=>{
           this.router.navigate(['promoted']);
         },error=>{
           this.promoteError = "Failed to promote. Try again later";
         }
       )}
     }

  }
}
