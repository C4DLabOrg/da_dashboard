import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { SchoolattendanceService} from './schoolattendance.service';
import { FileUploader,FileSelectDirective, FileDropDirective, } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CustomValidators } from 'ng2-validation';

import {schoolAttendance} from './schoolattendance';
import {BaseUrl} from '../../../baseurl';

export class exportAttendance {
  constructor(
    public startDate: any,
    public endDate: any
  ){}
}


@Component({
  selector: 'app-schoolattendance',
  templateUrl: './schoolattendance.component.html',
  styleUrls: ['./schoolattendance.component.scss'],
  providers: [SchoolattendanceService]

})



export class SchoolattendanceComponent implements OnInit {



  @ViewChild('myfile') myfile;
  public schoolName;
  yearsSelect=[];
  public form: FormGroup;
  public importForm:FormGroup;
  public dateform:FormGroup;
  public submitted;
  public studentDataType : schoolAttendance;
  public empty;
  public fail;
  public importfile:any
  public success;
  public importAbort;
  fileError:any;
  abort: any;
  errors: any[];
  count: number = 0;
  offset: number = 0;
  limit: number = 100;

  file:File;
  columns = [
    { name: 'Rownumber' },
    { name: 'Error' }
  ];


  private baseApiUrl = BaseUrl.base_api_url;

  dt:any;
  ds:any;
  rows:any[];
  total_success:any;
  total_fails:any;
  success_percentage:any;
  errorDiv:boolean;
  uploadDiv:boolean;
  uploadButton:boolean;
  duplicateData: any;
  verifySuccess:any;
  loading: boolean;
  public sub;
  public link;
  public linkStudentDetails;
  id:any;

  constructor(
    private _schoolattendanceService: SchoolattendanceService,private http:Http,
    private fb: FormBuilder,
    private route:ActivatedRoute,private router: Router)
    {
    this.form = this.fb.group({
      myfile: [null, Validators.compose([Validators.required,])],
    });

    this.importForm = this.fb.group({
      myfile: [null, Validators.compose([Validators.required,])]
    });

   this.dateform = this.fb.group({
        startDate: [null, Validators.compose([Validators.required])],
        endDate: [null, Validators.compose([Validators.required])],
      });

    this.errorDiv = false;
    this.uploadDiv = false;
    this.uploadButton = false;
  }

  ngOnInit(): void {
    this.loading = false;
    this.schoolName = localStorage.getItem('attendanceschoolName');
    this.sub = this.route.params.subscribe(params => {
     this.id = +params['id'];
     //this.fileDownload(this.id);
     this.fileStudentsDownload(this.id);
   });
    this.years();
  }


  years(){
      let todayYear = (new Date()).getFullYear();
      
      for(let a=2016; a < todayYear+1; a++){
        //this.yr = {}
        //this.yr.year = a;
        this.yearsSelect.push(a);
      }

    }

    fileDownload(id,startDate,endDate){

      this._schoolattendanceService.getExportFile(id,startDate,endDate).subscribe(
        (data)  =>
        {
          //console.log(data.results[0]);
          //console.log(data);
          this.link = data.link;
          this.loading = false;
        }
      );
    }

    fileStudentsDownload(id){

      this._schoolattendanceService.getStudentDetailsExportFile(id).subscribe(
        (data)  =>
        {
          //console.log(data.results[0]);
          //console.log(data);
          this.linkStudentDetails = data.link;
          this.loading = false;
        }
      );
    }

    error;

     onSubmit(exportParameters: exportAttendance){
       this.loading = true;
    //this.partner = new exportAttendance(exportParameters.month,exportParameters.year);

      
      this.fileDownload(this.id, exportParameters.startDate, exportParameters.endDate);
    
  }

  AbortImport(){
    this.abort = this._schoolattendanceService.abortImport();
    //console.log(this.abort);
    if(this.abort){
      //console.log('Aborted');
    }else{
      //console.log('Inatudanganya');
    }
  }


    Importupload(){
      

      this.loading = true;
      //let studentDataTypes = new importStudent(imports.type_of_file);
       

      let myfile = this.myfile.nativeElement.files[0];
      //console.log(myfile);

      let fd=new FormData();
      fd.append("file",myfile);
      //console.log(fd);
      
      this._schoolattendanceService.sendImportAttendanceSchoolData(fd).subscribe(data=>
      {
        let res=data as any
        
        //interchanged the two
        this.total_fails = res.total_fails;
        this.total_success = res.total_success;
        this.success_percentage =res.success_percentage;
        this.success = "File Successfully Imported";
        this.loading = false;
        //console.log(res);
        //let message = JSON.parse(data[0].total_fails);
        //console.log("fails", message);

        //this.success = "Data Imported Successfully";
      },error=>{
        //console.log(error)

        this.fail = "Data Not Imported: "+error
      })
    }

  Progressupload(event){

  }

}
