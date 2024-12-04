import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService} from './reports.service';
import { Attendance } from './attendance';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ReportsService]

})
export class ReportsComponent implements OnInit {

  dt:any;
  children: any[];
  selected: any[];
  rows =[];
  temp =[];

  columns = [
    { name: 'Emiscode' },
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Attendance' },
    { name: 'Class' },

  ];

  constructor( private reportsService: ReportsService,private router: Router,) {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];
      // push our inital complete list
      this.rows = data;
    });
  }

  fetchChildren(): void {
    this.reportsService.fetchOverallAttendance().subscribe(data => {

      let childs =[]
      for (let i = 0;i < data.length;i++){
        this.dt = {}
        this.dt.emiscode=data[i].emis_code
        this.dt.name=data[i].student_name
        this.dt.gender=data[i].gender
        this.dt.attendance=data[i].last_attendance
        this.dt.class=data[i].class_name
        this.dt.id = data[i].id
        childs.push(this.dt)
      }
      this.children = childs;
      this.selected = [];
    });
  }

  onSelect({ selected }) {
   console.log('Select Event', selected, this.selected,this.selected[0].id);
   //localStorage.setItem('childId', this.selected[0].id);
   //this.getChildId(this.selected[0].id);
   //this.router.navigate(['/children/child', this.selected[0].id]);
 }

 private getChildId(id){

   this.router.navigate(['/children/child', id]);

 }

 onActivate(event) {
   //console.log('Activate Event', event);
 }



 //filterng the table
  updateFilter(event) {
    let val = event.target.value;
    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }

 //sorting the table
  fetch(cb) {
     const req = new XMLHttpRequest();
     req.open('GET', `assets/data/company.json`);

     req.onload = () => {
       let data = JSON.parse(req.response);
       cb(data);
     };

     req.send();
   }

  ngOnInit(): void {
    this.fetchChildren()
  }

}
