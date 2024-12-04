import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PromotionsService} from './promotions.service';
import { ClassService} from '../classes/class.service';

import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../search';



@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  providers: [PromotionsService, ClassService]

})
export class PromotionsComponent implements OnInit {


  constructor( private promotionService: PromotionsService, private classService: ClassService,private router: Router) {
  }
  ngOnInit(){
    this.loading = true;
    this.schoolId = JSON.parse(localStorage.getItem('schoolId'));
    this.getClassses(this.schoolId,this.offset, this.limit);
  }


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

    columns = [
      { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} }
    ];


    getClassses(id,offset,limit): void {
      this.classService.getClassses(id).subscribe(data => {

        data = data.results;
        this.loading = false;
        let allClasses =[]
        for (let i = 0;i < data.length;i++){
          this.dt = {}
          //console.log(data[i].class_name);
          if(data[i].class_name == null){
            this.dt.name = "Class "+data[i].id
          }else{
            this.dt.name="Class "+data[i].class_name
          }this.dt.id = data[i].id
          allClasses.push(this.dt)
        }
        //cache our data
        this.temp = [...allClasses];
        //our initial data
        this.classes = allClasses;
        this.selected = [];
      });
    }

    onSelect({ selected }) {
     localStorage.setItem('classId', this.selected[0].id);
     localStorage.setItem('promoteStudents', 'Promote');
     this.getClassId(this.selected[0].id);
     }

     private getClassId(id){
       //console.log('yes');
       this.router.navigate(['/classes/class', id],{skipLocationChange: true});

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
      this.classes = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }

}
