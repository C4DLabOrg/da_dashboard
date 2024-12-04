import {Component, OnInit, ElementRef} from '@angular/core';
import {NgModel} from '@angular/forms';
import {AppModule} from '../../app.module';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Router, NavigationEnd } from '@angular/router';
import { SchoolRegistration } from './school';
import { Response } from '@angular/http';
import {EditschoolService} from './editschool.service';

@Component({
  selector: 'add-school',
  templateUrl: './editschool.component.html',
  styleUrls: ['./editschool.component.scss'],
  providers: [EditschoolService]
})


export class EditschoolComponent implements OnInit {
  editing = {};
  rows = [];

  constructor(
    private _schoolRegistrationService: EditschoolService,
    private fb: FormBuilder,
    private router: Router
  ){}


  public success;
  public fail;
  public empty;
  public schoolConstituency;
  public schoolCounty;
  public submitted: boolean =  true;
  public school: SchoolRegistration;
  public form: FormGroup;
  countyName:any;
  county:any;
  subcounties:any;
  zones:any;
  partnerId:any=[];
  subcountyForm:boolean = false;
  schoolId:any;

  ngOnInit(){
    //this.onSubmit;
    this.form = this.fb.group({
      schoolName: [null, Validators.compose([Validators.required,])],
      schoolCode: [null],
      emisCode: [null],
      county: [null, Validators.compose([Validators.required])],
      zone: [null, Validators.compose([Validators.required])],
      waterSource: [null, Validators.compose([Validators.required])],
      long_geo_cordinates: [null],
      lat_geo_cordinates: [null]
    });
    this.getSchoolCounties();
    //this.getSchoolConstituencies();
    this.partnerId = JSON.parse(localStorage.getItem("partnerId"));
    this.schoolId = localStorage.getItem("schoolId");

    this.fetchSchool(this.schoolId);

  }

schoolname:any;
schoolEmisCode:any;
countySchool:any;
subcountyname:any;
subcountyid:any;
longitude:any;
latitude:any;
watersource:any;
schoolcode:any;

  public fetchSchool(id){
  this._schoolRegistrationService.getSchoolData(id).subscribe(
    (data)  =>
    {
      console.log(data);
      let res = data.results;
      this.schoolname=res[0].school_name;
      this.schoolEmisCode = res[0].emis_code;
      this.countySchool = res[0].county_name;
      this.subcountyname = res[0].subcounty_name;
      this.subcountyid = res[0].subcounty;
      this.watersource = res[0].source_of_water;
      this.longitude = res[0].geo_coordinates.lng;
      this.latitude = res[0].geo_coordinates.lat;
      this.schoolcode = res[0].school_code;
      
    }
  );
}
  
  county_name:any;
  subcounty_name:any;

  onSelect(event, county, countyid){
   // console.log(event, countyid, 'county')
    this.county_name = countyid;

    this.subcountyForm = true;
    this.getSchoolConstituencies(countyid);
  }

  onSelectSubCounty(event, subcounty, subcountyid){
   // console.log(event, subcounty, subcountyid, 'subcounty')
    this.subcounty_name = subcountyid
  }

  onSubmit(registerSchool: SchoolRegistration){
    if(!this.submitted){

      //edit
    }else{
      let e_code = localStorage.getItem('editEmisCode');
     
      console.log(e_code);

      this.school = new SchoolRegistration(registerSchool.schoolName, 
                    registerSchool.schoolCode, 
                    registerSchool.emisCode, 
                    registerSchool.long_geo_cordinates,
                    registerSchool.lat_geo_cordinates,
                    registerSchool.waterSource, 
                    registerSchool.zone,
                    registerSchool.county);

      this._schoolRegistrationService.sendData({
            partners: [this.partnerId],
            school_name: registerSchool.schoolName,
            school_code: registerSchool.schoolCode,
            geo_cordinates: {lat:registerSchool.long_geo_cordinates,lng:registerSchool.lat_geo_cordinates},
            emis_code: registerSchool.emisCode,
            county: this.county_name,
            subcounty: this.subcounty_name,
            source_of_water: registerSchool.waterSource
          })
          .subscribe(
            data => //console.log(data)
            {
              //console.log(data);
              //console.log("Added School Successfully"),
              this.success = "Edited School Successfully";
              
              localStorage.removeItem('editEmisCode');

              this.form.reset();
            },
            error =>{
              if(error.emis_code[0]){
                this.fail = 'Emis code already exists!'
              }else{
                this.fail = "Failed to save data";
              }
            }
          );
        }
  }


  navigateBack(){
    //console.log('navigateBack');
    localStorage.removeItem('editEmisCode');
    this.router.navigate(['/schools/view-schools']);
    //this.form.reset();
  }

  getSchoolCounties(){

    this._schoolRegistrationService.getCounties()
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



  getSchoolConstituencies(data){
     this.subcounties = this.countyName.filter(ct=>ct.id==data)[0].sub_counties;
    //console.log(data,this.subcounties, 'yeah');
  }
}
