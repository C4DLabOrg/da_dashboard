import { Component, OnInit,ViewChild} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DropoutsService } from './dropouts.service';
import {ViewpartnersService} from '../../partners/viewpartners/viewpartners.service'
import { FormBuilder, FormGroup, FormArray, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';

@Component({
  selector: 'app-dropouts',
  templateUrl: './dropouts.component.html',
  styleUrls: ['./dropouts.component.scss'],
  providers: [DropoutsService,ViewpartnersService],
})


export class DropoutsComponent implements OnInit {


    public form: FormGroup;
    public submitted: boolean =  true;
    public search: Search;
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
    partneradminid:number;
    schoolId:number;
    link:any;


    columns = [
    {prop: 'number', name: 'NUMBER'},
    { prop: 'name', name: 'STUDENT NAME', filtering:{filterString: '', placeholder: 'Filter by name'}},
    { prop: 'gender', name: 'GENDER'},
    { prop: 'oosc', name: 'OOSC CHILD'},
    { prop: 'dropoutreason', name: 'DROPOUT REASON'},
    { prop: 'lastattendance', name: 'LAST ATTENDANCE'}
  ];

  constructor(private dropoutsService: DropoutsService, private partnerService: ViewpartnersService, private router: Router,private fb: FormBuilder){}
  partner:any;
  gender:any;
  allpartners = [];
  //fetch partners
  fetchPartners(){
    this.partnerService.fetchAllPartners()
      .subscribe(
        (res)=>{
          for (let i = 0; i < res.results.length; i++){
            this.partner = {};
            this.partner.name = res.results[i].name;
            this.partner.id = res.results[i].id;
            this.allpartners.push(this.partner);
          }
        },
      //(err) => console.log(err)
    );

  }


  fetchChildren(offset,limit): void {
    this.dropoutsService.fetchDropouts(this.page).subscribe(data => {
      //start and end for pagination
      //console.log(data);
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

        if(data[i].is_oosc == true){
          this.dt.oosc = 'YES'
        }else if(data[i].is_oosc == false){
          this.dt.oosc = 'NO'
        }else{
           this.dt.oosc = 'N/A' 
        }

        if(data[i].dropout_reason == null){
          this.dt.dropoutreason='N/A'
        }else{
         this.dt.dropoutreason=data[i].dropout_reason 
        }
        
        if(data[i].last_attendance == null){
          this.dt.lastattendance='N/A'
        }else{
         this.dt.lastattendance=data[i].last_attendance 
        }
        
       
        this.dt.id = data[i].id
        childs.push(this.dt)
      }
      //cache our data
      //this.temp = childs;
      let row=[...rows]
      this.temp=[...childs];
      let j=0
      for (let i = start; i < end; i++) {
        row[i] = childs[j];
        j++;
      }
      //this.temp=row
      this.children=row;

     // console.log(this.children)

      this.selected = [];

      //console.log('Page Results',this.children,this.count, start, end);

    });
  }

    fetchPartnerChildren(id,offset,limit): void {
      this.dropoutsService.fetchPartnerDropouts(id,this.page).subscribe(data => {
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

          if(data[i].is_oosc == true){
            this.dt.oosc = 'YES'
          }else if(data[i].is_oosc == false){
            this.dt.oosc = 'NO'
          }else{
             this.dt.oosc = 'N/A' 
          }

          if(data[i].dropout_reason == null){
            this.dt.dropoutreason='N/A'
          }else{
           this.dt.dropoutreason=data[i].dropout_reason 
          }
          
          if(data[i].last_attendance == null){
            this.dt.lastattendance='N/A'
          }else{
           this.dt.lastattendance=data[i].last_attendance 
          }
          
         
          this.dt.id = data[i].id
          childs.push(this.dt)
        }
        //cache our data
        //this.temp = childs;
        let row=[...rows]
        this.temp=[...childs];
        let j=0
        for (let i = start; i < end; i++) {
          row[i] = childs[j];
          j++;
        }
        //this.temp=row
        this.children=row;

        this.selected = [];

        //console.log('Page Results',this.children,this.count, start, end);

      });
    }

    fetchPartnerAdminChildren(id,offset,limit): void {
      this.dropoutsService.fetchPartnerAdminDropouts(id,this.page).subscribe(data => {
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

            if(data[i].is_oosc == true){
              this.dt.oosc = 'YES'
            }else if(data[i].is_oosc == false){
              this.dt.oosc = 'NO'
            }else{
               this.dt.oosc = 'N/A' 
            }

            if(data[i].dropout_reason == null){
              this.dt.dropoutreason='N/A'
            }else{
             this.dt.dropoutreason=data[i].dropout_reason 
            }
            
            if(data[i].last_attendance == null){
              this.dt.lastattendance='N/A'
            }else{
             this.dt.lastattendance=data[i].last_attendance 
            }
            
           
            this.dt.id = data[i].id
            childs.push(this.dt)
        }
        //cache our data
        //this.temp = childs;
        let row=[...rows]
        this.temp=[...childs];
        let j=0
        for (let i = start; i < end; i++) {
          row[i] = childs[j];
          j++;
        }
        //this.temp=row
        this.children=row;

        this.selected = [];

        //console.log('Page Results',this.children,this.count, start, end);

      });
    }

    fetchSchoolChildren(id,offset,limit): void {
      this.dropoutsService.fetchSchoolDropouts(id,this.page).subscribe(data => {
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

          if(data[i].is_oosc == true){
            this.dt.oosc = 'YES'
          }else if(data[i].is_oosc == false){
            this.dt.oosc = 'NO'
          }else{
             this.dt.oosc = 'N/A' 
          }

          if(data[i].dropout_reason == null){
            this.dt.dropoutreason='N/A'
          }else{
           this.dt.dropoutreason=data[i].dropout_reason 
          }
          
          if(data[i].last_attendance == null){
            this.dt.lastattendance='N/A'
          }else{
           this.dt.lastattendance=data[i].last_attendance 
          }
          
         
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


    searchChild(search: Search){

      if(!this.submitted){

        //edit
      }else{

        if(this.schoolId){
          //search by name
          if(search.search){

            this.dropoutsService.searchSchoolData(this.schoolId, search.search)
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
                      this.dt.name=data.results[i].student_name
                      this.dt.gender=data.results[i].gender

                      if(data.results[i].is_oosc == true){
                        this.dt.oosc = 'YES'
                      }else if(data.results[i].is_oosc == false){
                        this.dt.oosc = 'NO'
                      }else{
                         this.dt.oosc = 'N/A' 
                      }

                      if(data.results[i].dropout_reason == null){
                        this.dt.dropoutreason='N/A'
                      }else{
                       this.dt.dropoutreason=data.results[i].dropout_reason 
                      }
                      
                      if(data.results[i].last_attendance == null){
                        this.dt.lastattendance='N/A'
                      }else{
                       this.dt.lastattendance=data.results[i].last_attendance 
                      }
                      
                     
                      this.dt.id = data.results[i].id
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
              this.dropoutsService.searchSchoolDataGender(this.schoolId,search.gender)
                  .subscribe(
                    data => //console.log(data)
                    {
                      let res = data.results;
                      this.count =data.count
                      let childs =[];
                      let rows=[]
                      for (let i = 0; i < data.results.length; i++){
                        this.dt = {}
                        let num = ((this.page-1)*100)+(i+1)
                        this.dt.number = i+1
                        this.dt.name=data.results[i].student_name
                        this.dt.gender=data.results[i].gender

                        if(data.results[i].is_oosc == true){
                          this.dt.oosc = 'YES'
                        }else if(data.results[i].is_oosc == false){
                          this.dt.oosc = 'NO'
                        }else{
                           this.dt.oosc = 'N/A' 
                        }

                        if(data.results[i].dropout_reason == null){
                          this.dt.dropoutreason='N/A'
                        }else{
                         this.dt.dropoutreason=data.results[i].dropout_reason 
                        }
                        
                        if(data.results[i].last_attendance == null){
                          this.dt.lastattendance='N/A'
                        }else{
                         this.dt.lastattendance=data.results[i].last_attendance 
                        }
                        
                       
                        this.dt.id = data.results[i].id
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
              this.dropoutsService.searchSchoolDataGenderName(this.schoolId,search.gender,search.search)
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
                        this.dt.name=data.results[i].student_name
                        this.dt.gender=data.results[i].gender

                        if(data.results[i].is_oosc == true){
                          this.dt.oosc = 'YES'
                        }else if(data.results[i].is_oosc == false){
                          this.dt.oosc = 'NO'
                        }else{
                           this.dt.oosc = 'N/A' 
                        }

                        if(data.results[i].dropout_reason == null){
                          this.dt.dropoutreason='N/A'
                        }else{
                         this.dt.dropoutreason=data.results[i].dropout_reason 
                        }
                        
                        if(data.results[i].last_attendance == null){
                          this.dt.lastattendance='N/A'
                        }else{
                         this.dt.lastattendance=data.results[i].last_attendance 
                        }
                        
                       
                        this.dt.id = data.results[i].id
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
        else if(this.partnerId){
            //search by name

            if(search.search){

              this.dropoutsService.searchPartnerData(this.partnerId, search.search)
                .subscribe(
                  data => //console.log(data)
                  {

                    let res = data.results;
                    this.count = data.count;
                    let childs =[];
                    let rows=[]
                    for (let i = 0; i < data.results.length; i++){
                      this.dt = {}
                      let num = ((this.page-1)*100)+(i+1)
                      this.dt.number = i+1
                      this.dt.name=data.results[i].student_name
                      this.dt.gender=data.results[i].gender

                      if(data.results[i].is_oosc == true){
                        this.dt.oosc = 'YES'
                      }else if(data.results[i].is_oosc == false){
                        this.dt.oosc = 'NO'
                      }else{
                         this.dt.oosc = 'N/A' 
                      }

                      if(data.results[i].dropout_reason == null){
                        this.dt.dropoutreason='N/A'
                      }else{
                       this.dt.dropoutreason=data.results[i].dropout_reason 
                      }
                      
                      if(data.results[i].last_attendance == null){
                        this.dt.lastattendance='N/A'
                      }else{
                       this.dt.lastattendance=data.results[i].last_attendance 
                      }
                      
                     
                      this.dt.id = data.results[i].id
                      childs.push(this.dt)
                    }

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
                this.dropoutsService.searchPartnerDataGender(this.partnerId,search.gender)
                    .subscribe(
                      data => //console.log(data)
                      {
                        let res = data.results;
                        this.count =data.count
                        let childs =[];
                        let rows=[]
                        for (let i = 0; i < data.results.length; i++){
                          this.dt = {}
                          let num = ((this.page-1)*100)+(i+1)
                          this.dt.number = i+1
                          this.dt.name=data.results[i].student_name
                          this.dt.gender=data.results[i].gender

                          if(data.results[i].is_oosc == true){
                            this.dt.oosc = 'YES'
                          }else if(data.results[i].is_oosc == false){
                            this.dt.oosc = 'NO'
                          }else{
                             this.dt.oosc = 'N/A' 
                          }

                          if(data.results[i].dropout_reason == null){
                            this.dt.dropoutreason='N/A'
                          }else{
                           this.dt.dropoutreason=data.results[i].dropout_reason 
                          }
                          
                          if(data.results[i].last_attendance == null){
                            this.dt.lastattendance='N/A'
                          }else{
                           this.dt.lastattendance=data.results[i].last_attendance 
                          }
                          
                         
                          this.dt.id = data.results[i].id
                          childs.push(this.dt)

                        }

                        this.children=childs;
                        //console.log(childs);
                      },
                      error =>{
                        this.empty = "This field is required";
                        this.fail = "Failed to save data";
                      }
                    );
              }
              //search by name and gender

              if(search.search && search.gender){

                this.dropoutsService.searchPartnerDataGenderName(this.partnerId,search.gender,search.search)
                    .subscribe(
                      data => //console.log(data)
                      {
                        this.count = data.count;
                        let res = data.results;
                        //console.log(res);
                        let childs =[];
                        let rows=[]
                        for (let i = 0; i < data.results.length; i++){
                          this.dt = {}
                          let num = ((this.page-1)*100)+(i+1)
                          this.dt.number = i+1
                          this.dt.name=data.results[i].student_name
                          this.dt.gender=data.results[i].gender

                          if(data.results[i].is_oosc == true){
                            this.dt.oosc = 'YES'
                          }else if(data.results[i].is_oosc == false){
                            this.dt.oosc = 'NO'
                          }else{
                             this.dt.oosc = 'N/A' 
                          }

                          if(data.results[i].dropout_reason == null){
                            this.dt.dropoutreason='N/A'
                          }else{
                           this.dt.dropoutreason=data.results[i].dropout_reason 
                          }
                          
                          if(data.results[i].last_attendance == null){
                            this.dt.lastattendance='N/A'
                          }else{
                           this.dt.lastattendance=data.results[i].last_attendance 
                          }
                          
                         
                          this.dt.id = data.results[i].id
                          childs.push(this.dt)

                        }

                        this.children=childs;
                        //console.log(childs);
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
            else if(this.partneradminid){
              if(search.search){
                this.dropoutsService.searchPartnerAdminData(this.partneradminid, search.search)
                  .subscribe(
                    data => //console.log(data)
                    {

                      let res = data.results;
                      this.count = data.count;
                      let childs =[];
                      let rows=[]
                      for (let i = 0; i < data.results.length; i++){
                        this.dt = {}
                        let num = ((this.page-1)*100)+(i+1)
                        this.dt.number = i+1
                        this.dt.name=data.results[i].student_name
                        this.dt.gender=data.results[i].gender

                        if(data.results[i].is_oosc == true){
                          this.dt.oosc = 'YES'
                        }else if(data.results[i].is_oosc == false){
                          this.dt.oosc = 'NO'
                        }else{
                           this.dt.oosc = 'N/A' 
                        }

                        if(data.results[i].dropout_reason == null){
                          this.dt.dropoutreason='N/A'
                        }else{
                         this.dt.dropoutreason=data.results[i].dropout_reason 
                        }
                        
                        if(data.results[i].last_attendance == null){
                          this.dt.lastattendance='N/A'
                        }else{
                         this.dt.lastattendance=data.results[i].last_attendance 
                        }
                        
                       
                        this.dt.id = data.results[i].id
                        childs.push(this.dt)
                      }

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
                this.dropoutsService.searchPartnerAdminDataGender(this.partneradminid,search.gender)
                    .subscribe(
                      data => //console.log(data)
                      {
                        let res = data.results;
                        this.count =data.count
                        let childs =[];
                        let rows=[]
                        for (let i = 0; i < data.results.length; i++){
                          this.dt = {}
                          let num = ((this.page-1)*100)+(i+1)
                          this.dt.number = i+1
                          this.dt.name=data.results[i].student_name
                          this.dt.gender=data.results[i].gender

                          if(data.results[i].is_oosc == true){
                            this.dt.oosc = 'YES'
                          }else if(data.results[i].is_oosc == false){
                            this.dt.oosc = 'NO'
                          }else{
                             this.dt.oosc = 'N/A' 
                          }

                          if(data.results[i].dropout_reason == null){
                            this.dt.dropoutreason='N/A'
                          }else{
                           this.dt.dropoutreason=data.results[i].dropout_reason 
                          }
                          
                          if(data.results[i].last_attendance == null){
                            this.dt.lastattendance='N/A'
                          }else{
                           this.dt.lastattendance=data.results[i].last_attendance 
                          }
                          
                         
                          this.dt.id = data.results[i].id
                          childs.push(this.dt)

                        }

                        this.children=childs;
                        //console.log(childs);
                      },
                      error =>{
                        this.empty = "This field is required";
                        this.fail = "Failed to save data";
                      }
                    );
              }
              //search by name and gender

              if(search.search && search.gender){

                this.dropoutsService.searchPartnerAdminDataGenderName(this.partneradminid,search.gender,search.search)
                    .subscribe(
                      data => //console.log(data)
                      {
                        this.count = data.count;
                        let res = data.results;
                        //console.log(res);
                        let childs =[];
                        let rows=[]
                        for (let i = 0; i < data.results.length; i++){
                          this.dt = {}
                          let num = ((this.page-1)*100)+(i+1)
                          this.dt.number = i+1
                          this.dt.name=data.results[i].student_name
                          this.dt.gender=data.results[i].gender

                          if(data.results[i].is_oosc == true){
                            this.dt.oosc = 'YES'
                          }else if(data.results[i].is_oosc == false){
                            this.dt.oosc = 'NO'
                          }else{
                             this.dt.oosc = 'N/A' 
                          }

                          if(data.results[i].dropout_reason == null){
                            this.dt.dropoutreason='N/A'
                          }else{
                           this.dt.dropoutreason=data.results[i].dropout_reason 
                          }
                          
                          if(data.results[i].last_attendance == null){
                            this.dt.lastattendance='N/A'
                          }else{
                           this.dt.lastattendance=data.results[i].last_attendance 
                          }
                          
                         
                          this.dt.id = data.results[i].id
                          childs.push(this.dt)

                        }

                        this.children=childs;
                        //console.log(childs);
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
            

            //admin
            else{
              //search by name
              if(search.search){
              this.dropoutsService.searchData(search.search)
                  .subscribe(
                    data => //console.log(data)
                    { 
                      let res = data.results;
                      this.count =data.count
                      let childs =[];
                      let rows=[]
                      for (let i = 0; i < data.results.length; i++){
                        this.dt = {}
                        let num = ((this.page-1)*100)+(i+1)
                        this.dt.number = i+1
                        this.dt.name=data.results[i].student_name
                        this.dt.gender=data.results[i].gender

                        if(data.results[i].is_oosc == true){
                          this.dt.oosc = 'YES'
                        }else if(data.results[i].is_oosc == false){
                          this.dt.oosc = 'NO'
                        }else{
                           this.dt.oosc = 'N/A' 
                        }

                        if(data.results[i].dropout_reason == null){
                          this.dt.dropoutreason='N/A'
                        }else{
                         this.dt.dropoutreason=data.results[i].dropout_reason 
                        }
                        
                        if(data.results[i].last_attendance == null){
                          this.dt.lastattendance='N/A'
                        }else{
                         this.dt.lastattendance=data.results[i].last_attendance 
                        }
                        
                       
                        this.dt.id = data.results[i].id
                        childs.push(this.dt)

                      }

                      this.children=childs;
                      //console.log(childs);
                    },
                    error =>{
                      this.empty = "This field is required";
                      this.fail = "Failed to save data";
                    }
                  );
                }
                //search by partner
                else if(search.partner){
                  //showing total data of enrollment
                  this.dropoutsService.searchAPartnerData(search.partner)
                      .subscribe(
                        data => //console.log(data)
                        {
                          let res = data.results;
                          this.count =data.count
                         //this.count = this.fetchPartnerGirlChildTotal(search.partner)+this.fetchPartnerBoyChildTotal(search.partner) ;
                         //console.log(this.count, "jjjk");
                          let childs =[];
                          let rows=[]
                          for (let i = 0; i < data.results.length; i++){
                            this.dt = {}
                            let num = ((this.page-1)*100)+(i+1)
                            this.dt.number = i+1
                            this.dt.name=data.results[i].student_name
                            this.dt.gender=data.results[i].gender

                            if(data.results[i].is_oosc == true){
                              this.dt.oosc = 'YES'
                            }else if(data.results[i].is_oosc == false){
                              this.dt.oosc = 'NO'
                            }else{
                               this.dt.oosc = 'N/A' 
                            }

                            if(data.results[i].dropout_reason == null){
                              this.dt.dropoutreason='N/A'
                            }else{
                             this.dt.dropoutreason=data.results[i].dropout_reason 
                            }
                            
                            if(data.results[i].last_attendance == null){
                              this.dt.lastattendance='N/A'
                            }else{
                             this.dt.lastattendance=data.results[i].last_attendance 
                            }
                            
                           
                            this.dt.id = data.results[i].id
                            childs.push(this.dt)

                          }

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
                  this.dropoutsService.searchDataGender(search.gender)
                      .subscribe(
                        data => //console.log(data)
                        {
                          let res = data.results;
                          this.count =data.count
                          let childs =[];
                          let rows=[]
                          for (let i = 0; i < data.results.length; i++){
                            this.dt = {}
                            let num = ((this.page-1)*100)+(i+1)
                            this.dt.number = i+1
                            this.dt.name=data.results[i].student_name
                            this.dt.gender=data.results[i].gender

                            if(data.results[i].is_oosc == true){
                              this.dt.oosc = 'YES'
                            }else if(data.results[i].is_oosc == false){
                              this.dt.oosc = 'NO'
                            }else{
                               this.dt.oosc = 'N/A' 
                            }

                            if(data.results[i].dropout_reason == null){
                              this.dt.dropoutreason='N/A'
                            }else{
                             this.dt.dropoutreason=data.results[i].dropout_reason 
                            }
                            
                            if(data.results[i].last_attendance == null){
                              this.dt.lastattendance='N/A'
                            }else{
                             this.dt.lastattendance=data.results[i].last_attendance 
                            }
                            
                           
                            this.dt.id = data.results[i].id
                            childs.push(this.dt)

                          }

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
                  this.dropoutsService.searchDataGenderName(search.gender,search.search)
                      .subscribe(
                        data => //console.log(data)
                        {
                          let res = data.results;
                          this.count =data.count
                          let childs =[];
                          let rows=[]
                          for (let i = 0; i < data.results.length; i++){
                            this.dt = {}
                            let num = ((this.page-1)*100)+(i+1)
                            this.dt.number = i+1
                            this.dt.name=data.results[i].student_name
                            this.dt.gender=data.results[i].gender

                            if(data.results[i].is_oosc == true){
                              this.dt.oosc = 'YES'
                            }else if(data.results[i].is_oosc == false){
                              this.dt.oosc = 'NO'
                            }else{
                               this.dt.oosc = 'N/A' 
                            }

                            if(data.results[i].dropout_reason == null){
                              this.dt.dropoutreason='N/A'
                            }else{
                             this.dt.dropoutreason=data.results[i].dropout_reason 
                            }
                            
                            if(data.results[i].last_attendance == null){
                              this.dt.lastattendance='N/A'
                            }else{
                             this.dt.lastattendance=data.results[i].last_attendance 
                            }
                            
                           
                            this.dt.id = data.results[i].id
                            childs.push(this.dt)

                          }

                          this.children=childs;
                        //  console.log(childs);
                        },
                        error =>{
                          this.empty = "This field is required";
                          this.fail = "Failed to save data";
                        }
                      );
                }
                //search by name and partner
                else if(search.search && search.partner){

                  this.dropoutsService.searchDataNamePartner(search.partner,search.search)
                      .subscribe(
                        data => //console.log(data)
                        {
                          let res = data.results;
                          this.count = data.count;
                          let childs =[];
                          let rows=[]
                          for (let i = 0; i < data.results.length; i++){
                            this.dt = {}
                            let num = ((this.page-1)*100)+(i+1)
                            this.dt.number = i+1
                            this.dt.name=data.results[i].student_name
                            this.dt.gender=data.results[i].gender

                            if(data.results[i].is_oosc == true){
                              this.dt.oosc = 'YES'
                            }else if(data.results[i].is_oosc == false){
                              this.dt.oosc = 'NO'
                            }else{
                               this.dt.oosc = 'N/A' 
                            }

                            if(data.results[i].dropout_reason == null){
                              this.dt.dropoutreason='N/A'
                            }else{
                             this.dt.dropoutreason=data.results[i].dropout_reason 
                            }
                            
                            if(data.results[i].last_attendance == null){
                              this.dt.lastattendance='N/A'
                            }else{
                             this.dt.lastattendance=data.results[i].last_attendance 
                            }
                            
                           
                            this.dt.id = data.results[i].id
                            childs.push(this.dt)

                          }

                          this.children=childs;
                          //console.log(childs);
                        },
                        error =>{
                          this.empty = "This field is required";
                          this.fail = "Failed to save data";
                        }
                      );
                }
                //search by gender and partner
                else if(search.gender && search.partner){

                  this.dropoutsService.searchDataGenderPartner(search.partner,search.gender)
                      .subscribe(
                        data => //console.log(data)
                        {
                          let res = data.results;
                          this.count = data.count;
                          let childs =[];
                          let rows=[]
                          for (let i = 0; i < data.results.length; i++){
                            this.dt = {}
                            let num = ((this.page-1)*100)+(i+1)
                            this.dt.number = i+1
                            this.dt.name=data.results[i].student_name
                            this.dt.gender=data.results[i].gender

                            if(data.results[i].is_oosc == true){
                              this.dt.oosc = 'YES'
                            }else if(data.results[i].is_oosc == false){
                              this.dt.oosc = 'NO'
                            }else{
                               this.dt.oosc = 'N/A' 
                            }

                            if(data.results[i].dropout_reason == null){
                              this.dt.dropoutreason='N/A'
                            }else{
                             this.dt.dropoutreason=data.results[i].dropout_reason 
                            }
                            
                            if(data.results[i].last_attendance == null){
                              this.dt.lastattendance='N/A'
                            }else{
                             this.dt.lastattendance=data.results[i].last_attendance 
                            }
                            
                           
                            this.dt.id = data.results[i].id
                            childs.push(this.dt)

                          }

                          this.children=childs;
                          //console.log(childs);
                        },
                        error =>{
                          this.empty = "This field is required";
                          this.fail = "Failed to save data";
                        }
                      );
                }
                //search by name, gender and partner
                else if(search.search && search.gender && search.partner){
                  this.dropoutsService.searchDataNameGenderPartner(search.partner,search.gender,search.search)
                      .subscribe(
                        data => //console.log(data)
                        {
                          let res = data.results;
                          this.count =data.count
                          let childs =[];
                          let rows=[]
                          for (let i = 0; i < data.results.length; i++){
                            this.dt = {}
                            let num = ((this.page-1)*100)+(i+1)
                            this.dt.number = i+1
                            this.dt.name=data.results[i].student_name
                            this.dt.gender=data.results[i].gender

                            if(data.results[i].is_oosc == true){
                              this.dt.oosc = 'YES'
                            }else if(data.results[i].is_oosc == false){
                              this.dt.oosc = 'NO'
                            }else{
                               this.dt.oosc = 'N/A' 
                            }

                            if(data.results[i].dropout_reason == null){
                              this.dt.dropoutreason='N/A'
                            }else{
                             this.dt.dropoutreason=data.results[i].dropout_reason 
                            }
                            
                            if(data.results[i].last_attendance == null){
                              this.dt.lastattendance='N/A'
                            }else{
                             this.dt.lastattendance=data.results[i].last_attendance 
                            }
                            
                           
                            this.dt.id = data.results[i].id
                            childs.push(this.dt)

                          }

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
   
     if(event.srcElement.localName == 'button'){
         localStorage.setItem('schoolEdit', this.selected[0].school);
        // console.log('Edit Clicked')
         this.router.navigate(['/children/edit-child/', this.selected[0].id],{skipLocationChange: true});
       }else{
        // console.log('Page Clicked')
         this.getChildId(this.selected[0].id);
     }
   }

     private getChildId(id){

       this.router.navigate(['/children/child', id],{skipLocationChange: true});

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

    exportAttendance(){
      console.log('clicked right now');
      this.router.navigate(['/children/export-attendance', this.partnerId],{skipLocationChange: true});
      
    }

    onPage(event) {
      this.page=event.offset+1
      if(this.partnerId){
        this.fetchPartnerChildren(this.partnerId,event.offset, event.limit);
      }else if(this.partneradminid){
        this.fetchPartnerChildren(this.partnerId,event.offset, event.limit);
      }else{
        this.fetchChildren(event.offset, event.limit);
      }
    }

    ngOnInit(): void {
      this.loading = true;
      this.form = this.fb.group({
        searchType: [null],
        search: [null],
        gender: [null],
        partner: [null]
      });

      this.fetchPartners();
      this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
      this.partneradminid = JSON.parse(localStorage.getItem("partneradminId"));
      this.schoolId = JSON.parse(localStorage.getItem("schoolId"));
      let partnerName = localStorage.getItem("welcomeName");

      if(this.partnerId && partnerName){
        this.fetchPartnerChildren(this.partnerId,this.offset, this.limit);
      }
      else if(this.partneradminid && partnerName){
        this.fetchPartnerAdminChildren(this.partneradminid,this.offset, this.limit);
        
      }
      else if(this.schoolId && partnerName){
        //console.log('school yaah')
        this.fetchSchoolChildren(this.schoolId,this.offset, this.limit);
        
      }
      else{
        this.admin = localStorage.getItem("user-type");
       // console.log(this.admin);
        this.fetchChildren(this.offset, this.limit);
       
      }

    }
}
