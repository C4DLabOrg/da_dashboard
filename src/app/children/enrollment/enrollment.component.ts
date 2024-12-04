import { Component, OnInit,ViewChild} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EnrollmentService } from './enrollment.service';
import {ViewpartnersService} from '../../partners/viewpartners/viewpartners.service'
import { FormBuilder, FormGroup, FormArray, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Search } from '../../search';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
  providers: [EnrollmentService,ViewpartnersService],
})


export class EnrollmentComponent implements OnInit {


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
      {name: 'Number'},
      { name: 'Name', filtering:{filterString: '', placeholder: 'Filter by name'} },
      { name: 'Gender' },
      { name: 'School' },
      { name: 'Class' },

    ];

  constructor(private enrollmentService: EnrollmentService, private partnerService: ViewpartnersService, private router: Router,private fb: FormBuilder){}
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
  //admin
  fetchAllChildren():void{
    this.enrollmentService.fetchAllChildren().subscribe(data =>{
      this.allChildren = data.count;
      //console.log(data, "All children");
    })
  }


  fetchChildren(offset,limit): void {
    this.enrollmentService.fetchChildren(this.page).subscribe(data => {
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
        this.dt.school = data[i].school_name
        this.dt.class=data[i].class_name
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


    //individual partners
    fetchAllPartnerChildren(id):void{
      this.enrollmentService.fetchAllPartnerChildren(id).subscribe(data =>{
        this.allChildren = data.count;
        //console.log(this.count);
        //console.log(this.enrollmentPercentage);
        //console.log(data, "All children");
      })
    }

    fetchAllPartnerAdminChildren(id):void{
      this.enrollmentService.fetchAllPartnerAdminChildren(id).subscribe(data =>{
        this.allChildren = data.count;
        //console.log(this.count);
        //console.log(this.enrollmentPercentage);
        //console.log(data, "All children");
      })
    }

    fetchAllSchoolChildren(id):void{
      this.enrollmentService.fetchAllSchoolChildren(id).subscribe(data =>{
        this.allChildren = data.count;
        //console.log(this.count);
        //console.log(this.enrollmentPercentage);
        //console.log(data, "All children");
      })
    }

    fetchPartnerChildren(id,offset,limit): void {
      this.enrollmentService.fetchPartnerChildren(id,this.page).subscribe(data => {
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
      this.enrollmentService.fetchPartnerAdminChildren(id,this.page).subscribe(data => {
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

    fetchBoyChildTotal(){
      this.enrollmentService.fetchBoyChildTotal().subscribe(data => {
        this.males = data.count;
      });
      return this.males;
    }
    //partner
    fetchPartnerBoyChildTotal(id):number{
      this.enrollmentService.fetchPartnerBoyChildTotal(id).subscribe(data => {
        this.males = data.count;
      });
      return this.males;
    }

    fetchPartnerAdminBoyChildTotal(id):number{
      this.enrollmentService.fetchPartnerAdminBoyChildTotal(id).subscribe(data => {
        this.males = data.count;
      });
      return this.males;
    }

    //school
    fetchSchoolBoyChildTotal(id):number{
      this.enrollmentService.fetchSchoolBoyChildTotal(id).subscribe(data => {
        this.males = data.count;
      });
      return this.males;
    }

    fetchGirlChildTotal(){
      this.enrollmentService.fetchGirlChildTotal().subscribe(data => {
          this.females = data.count;
      });
      return this.females;
    }

    fetchPartnerGirlChildTotal(id):number{
      this.enrollmentService.fetchPartnerGirlChildTotal(id).subscribe(data => {
        this.females = data.count;

      });
      return this.females;
    }

    fetchPartnerAdminGirlChildTotal(id):number{
      this.enrollmentService.fetchPartnerAdminGirlChildTotal(id).subscribe(data => {
        this.females = data.count;
      });
      return this.females;
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
        else if(this.partnerId){
            //search by name

            if(search.search){
              this.enrollmentService.fetchPartnerSearchNameBoyChildTotal(search.search,this.partnerId).subscribe(data => {
                this.males = data.count;
              });


              this.enrollmentService.fetchPartnerSearchNameGirlChildTotal(search.search,this.partnerId).subscribe(data => {
                this.females = data.count;
              });

              this.enrollmentService.searchPartnerData(this.partnerId, search.search)
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
                      this.dt.emiscode=res[i].emis_code
                      this.dt.name=res[i].student_name
                      this.dt.gender=res[i].gender
                      this.dt.attendance=res[i].last_attendance
                      this.dt.school = res[i].school_name
                      this.dt.class=res[i].class_name
                      this.dt.id = res[i].id
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
                this.enrollmentService.searchPartnerDataGender(this.partnerId,search.gender)
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

                this.enrollmentService.searchPartnerDataGenderName(this.partnerId,search.gender,search.search)
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
                          this.dt.emiscode=res[i].emis_code
                          this.dt.name=res[i].student_name
                          this.dt.gender=res[i].gender
                          this.dt.attendance=res[i].last_attendance
                          this.dt.school = res[i].school_name
                          this.dt.class=res[i].class_name
                          this.dt.id = res[i].id
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
                this.enrollmentService.fetchPartnerAdminSearchNameBoyChildTotal(search.search,this.partneradminid).subscribe(data => {
                  this.males = data.count;
                });


                this.enrollmentService.fetchPartnerAdminSearchNameGirlChildTotal(search.search,this.partneradminid).subscribe(data => {
                  this.females = data.count;
                });

                this.enrollmentService.searchPartnerAdminData(this.partneradminid, search.search)
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
                        this.dt.emiscode=res[i].emis_code
                        this.dt.name=res[i].student_name
                        this.dt.gender=res[i].gender
                        this.dt.attendance=res[i].last_attendance
                        this.dt.school = res[i].school_name
                        this.dt.class=res[i].class_name
                        this.dt.id = res[i].id
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
                this.enrollmentService.searchPartnerAdminDataGender(this.partneradminid,search.gender)
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

                this.enrollmentService.searchPartnerAdminDataGenderName(this.partneradminid,search.gender,search.search)
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
                          this.dt.emiscode=res[i].emis_code
                          this.dt.name=res[i].student_name
                          this.dt.gender=res[i].gender
                          this.dt.attendance=res[i].last_attendance
                          this.dt.school = res[i].school_name
                          this.dt.class=res[i].class_name
                          this.dt.id = res[i].id
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
              this.enrollmentService.searchData(search.search)
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
                  let g = this.fetchPartnerGirlChildTotal(search.partner);
                  let b = this.fetchPartnerBoyChildTotal(search.partner);
                  this.enrollmentService.searchAPartnerData(search.partner)
                      .subscribe(
                        data => //console.log(data)
                        {
                          let res = data.results;
                         this.count = this.fetchPartnerGirlChildTotal(search.partner)+this.fetchPartnerBoyChildTotal(search.partner) ;
                         //console.log(this.count, "jjjk");
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
                  this.enrollmentService.searchDataGender(search.gender)
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
                  this.enrollmentService.searchDataGenderName(search.gender,search.search)
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
                  this.fetchPartnerGirlChildTotal(search.partner);
                  this.fetchPartnerBoyChildTotal(search.partner);

                  this.enrollmentService.searchDataNamePartner(search.partner,search.search)
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
                            this.dt.emiscode=res[i].emis_code
                            this.dt.name=res[i].student_name
                            this.dt.gender=res[i].gender
                            this.dt.attendance=res[i].last_attendance
                            this.dt.school = res[i].school_name
                            this.dt.class=res[i].class_name
                            this.dt.id = res[i].id
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
                  this.fetchPartnerGirlChildTotal(search.partner);
                  this.fetchPartnerBoyChildTotal(search.partner);

                  this.enrollmentService.searchDataGenderPartner(search.partner,search.gender)
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
                            this.dt.emiscode=res[i].emis_code
                            this.dt.name=res[i].student_name
                            this.dt.gender=res[i].gender
                            this.dt.attendance=res[i].last_attendance
                            this.dt.school = res[i].school_name
                            this.dt.class=res[i].class_name
                            this.dt.id = res[i].id
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
                  this.enrollmentService.searchDataNameGenderPartner(search.partner,search.gender,search.search)
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
        this.fetchPartnerBoyChildTotal(this.partnerId);
        this.fetchPartnerGirlChildTotal(this.partnerId);
        this.count = this.fetchPartnerBoyChildTotal(this.partnerId)+this.fetchPartnerGirlChildTotal(this.partnerId);
        this.fetchAllPartnerChildren(this.partnerId);
      }
      else if(this.partneradminid && partnerName){
        this.fetchPartnerAdminChildren(this.partneradminid,this.offset, this.limit);
        this.fetchPartnerAdminBoyChildTotal(this.partneradminid);
        this.fetchPartnerAdminGirlChildTotal(this.partneradminid);

        this.count = this.fetchPartnerBoyChildTotal(this.partneradminid)+this.fetchPartnerAdminGirlChildTotal(this.partneradminid);
        this.fetchAllPartnerAdminChildren(this.partneradminid);
      }
      else if(this.schoolId && partnerName){
        //console.log('school yaah')
        this.fetchSchoolChildren(this.schoolId,this.offset, this.limit);
        this.fetchSchoolBoyChildTotal(this.schoolId);
        this.fetchSchoolGirlChildTotal(this.schoolId);
        this.count = this.fetchSchoolBoyChildTotal(this.schoolId)+this.fetchSchoolGirlChildTotal(this.schoolId);
        this.fetchAllSchoolChildren(this.schoolId);
      }
      else{
        this.admin = localStorage.getItem("user-type");
        this.fetchChildren(this.offset, this.limit);
        this.fetchBoyChildTotal();
        this.fetchGirlChildTotal();
        this.count = this.fetchBoyChildTotal()+this.fetchGirlChildTotal();
        this.fetchAllChildren();
      }

    }
}
