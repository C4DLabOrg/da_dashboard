import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { FileUploader,FileSelectDirective, FileDropDirective, } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CustomValidators } from 'ng2-validation';
import {exportAttendance} from './exportattendance';




@Component({
  selector: 'app-exportattendance',
  templateUrl: './exportattendance.component.html',
  styleUrls: ['./exportattendance.component.scss'],
  providers: [EnrollmentService]

})



export class ExportattendanceComponent implements OnInit {


  public form: FormGroup;
  public submitted;
  public empty;
  public fail;
  public importfile:any
  public success;
  public importAbort;
  loading: boolean;
  public sub;
  public link;
  id:any;
  yearsSelect=[];
  yr:any;
  public partner: exportAttendance;

  constructor(
    private enrollmentService: EnrollmentService,private http:Http,
    private fb: FormBuilder,
    private route:ActivatedRoute,private router: Router)
    {
    this.form = this.fb.group({
      month: [null, Validators.compose([Validators.required,])],
      year: [null, Validators.compose([Validators.required,])],
    });
  }

  ngOnInit(): void {
    this.loading = false;
    this.sub = this.route.params.subscribe(params => {
     this.id = +params['id'];
     //this.fileDownload(this.id);
   });
    this.years();
  }
error:any;

  onSubmit(exportParameters: exportAttendance){
    this.partner = new exportAttendance(exportParameters.month,exportParameters.year);

    this.enrollmentService.getExportFile(this.id,exportParameters.month,exportParameters.year).subscribe(
        (data)  =>
        {
          //console.log(data.results[0]);
          //console.log(data);
          this.link = data.link;
        },
        (error)=>{
        this.error='No data for this period!';
        }
      );
    
  }

    fileDownload(event){
      console.log(event);
      /*
      this.enrollmentService.getExportFile(this.id).subscribe(
        (data)  =>
        {
          //console.log(data.results[0]);
          //console.log(data);
          this.link = data.link;
        }
      );
      */
    }

    years(){
      let todayYear = (new Date()).getFullYear();
      
      for(let a=2016; a < todayYear+1; a++){
        //this.yr = {}
        //this.yr.year = a;
        this.yearsSelect.push(a);
      }

    }
}