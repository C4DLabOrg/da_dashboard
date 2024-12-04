import { Component, OnInit } from '@angular/core';
import {SocialService} from './social.service';


@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  providers: [SocialService]
})
export class SocialComponent implements OnInit {
  email: any;
  name:any;
  phone:any;
  error:any;
  usertype: any;
  admin: any;
  county: any;
  subcounty: any;
  emiscode: any;

  images: any[] = [];
  num: number = 1;

  constructor(
    private _socialService: SocialService
  ) {

    for (this.num; this.num <= 9; this.num += 1) this.images.push(this.num);

  }

  public pieChartColors: any[] = [{ backgroundColor: ["#f44336", "#3f51b5", "#ffeb3b", "#4caf50", "#2196f"] }];
  public pieOptions:any = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };
  public pieChartLabels:string[] = ['MS Word', 'Typing', 'Sage Pastel'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  id:number;
  ngOnInit(){
    this.usertype = localStorage.getItem('user-type');

    if(this.usertype == 'partner'){
      this.id = JSON.parse(localStorage.getItem("partnerId"));
      this.fetchPartnerDetails(this.id);
    }
    else if (this.usertype == 'admin'){
      this.admin = 'Unicef';
      this.phone = 'N/A';
      this.email = 'N/A';
      this.name = 'Unicef';
    }
    else{
      //console.log(this.usertype);
      this.id = JSON.parse(localStorage.getItem("schoolId"));
      this.fetchSchoolDetails(this.id);
      //console.log("Is a school");
    }
  }

  fetchPartnerDetails(id){
    this._socialService.fetchUserProfile(id)
           .subscribe(
                (res)=>{

                  this.email = res.email;
                  this.name = res.name;
                  this.phone = res.phone;
                  //console.log(this.phone);
                },
              (err) => {
                this.error = err;
              },
            );
  }

  fetchSchoolDetails(id){
    this._socialService.fetchSchoolProfile(id)
           .subscribe(
                (res)=>{
                  //console.log(res);
                  let data = res.results;
                  this.email = data[0].email;
                  this.name = data[0].school_name;
                  this.phone = data[0].phone_no;
                  this.county = data[0].county;
                  this.subcounty = data[0].zone;
                  this.emiscode = data[0].emis_code;

                },
              (err) => {
                this.error = err;
              },
            );
  }

  fetchAdminDetails(){
    this._socialService.fetchAdminDetails()
     .subscribe(
          (res)=>{

            this.email = res.email;
            this.name = res.name;
            this.phone = res.phone;
          },
        (err) => {
          this.error = err;
        },
      );
  }
  editAccount() {

    // Get the data from the service
    //console.log('here');
    this._socialService.fetchAdminDetails()
     .subscribe(
          (res)=>{

            this.email = res.email;
            this.phone = res.phone;
          },
        (err) => {
          this.error = err;
        },
      );

     //console.log(this.email);
     //console.log(this.phone);
  }

}
