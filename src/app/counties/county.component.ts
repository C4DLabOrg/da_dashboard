import { Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CountyService} from './county.service';
import { MapsAPILoader } from "angular2-google-maps/core";

//import {MapsAPILoader} from '@agm/core';

declare var google:any;

export class Marker {
  constructor(
    public lat:any,
    public lng:any,
    public draggable:any
  ) { }
}


@Component({
  selector: 'app-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CountyService]

})
export class CountyComponent implements OnInit, AfterViewInit {


lat: number = 0.1768696;
lng: number = 37.9083264;
zoom: number = 6;

styles: any = [{
  featureType: 'all',
  stylers: [{
    saturation: -80,
    visibility: 'off'
  }]
}, {
  featureType: 'landscape',
  elementType: 'geometry',
  stylers: [{
    hue: '#00ffee'
  }, {
    saturation: 50
  },{visibility: 'on'},{color:'#fcfcfc'}]
}, {
  featureType: 'poi.business',
  elementType: 'labels',
  stylers: [{
    visibility: 'off'
  }]
}];

/*var mapStyle = [{
        'stylers': [
        {'visibility': 'off'}]
      }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
      }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': '#bfd4ff'}]
      }];*/

draggable: boolean = true;
kaunt = [];
ct:any;
count =[];

selections =[{select:'Total Children'},{select: 'Newly Enrolled'},{select: 'Dropouts'}];
  //http://technobytz.com/mapping-angular-google-maps-api-geojson.html

  constructor(private countyService: CountyService, private mapsApiLoader:MapsAPILoader){}

  ngOnInit(){

    this.getCountiesData();

      this.getMapData((data) => {
        let properties = data.features
        let kaunt = []
        for (let i=0;i<properties.length; i++){
          this.kaunti ={}
          this.kaunti.countyName = properties[i].properties.COUNTY;
          kaunt.push(this.kaunti);
        }
      });
      var activeInfoWindow;


      var countyMin = Number.MAX_VALUE, countyMax = -Number.MAX_VALUE;


      this.mapsApiLoader.load().then(() => {


        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center:{lat: 0.176869, lng: 37.9083264}
          //center: {lat: -28, lng: 137}
        });

        this.map.data.setStyle({
          //icon: '//example.com/path/to/image.png',
          fillColor: '#521DB7',
          strokeColor: '#521DB7',
          strokeWeight: 2
        });


          this.map.data.setStyle(function(feature) {
           var color = '#521DB7';

           return  ({
              fillColor: color,
              strokeColor: color,
              strokeWeight: 2
            });
         });

         var infoWindow = new google.maps.InfoWindow();
         var marker = new google.maps.Marker();

          this.map.data.addListener('mouseover', function(event) {
            var kaunty = JSON.parse(localStorage.getItem('countyDataAPi'));
            var countyName;
            var enrolled;
            var total;
            var dropouts;
            if(event.feature.f.COUNTY){
              for(var i = 0; i< kaunty.length;i++){

                var id = kaunty.indexOf(kaunty[i].name);
                var countyName = kaunty[i].name;
                var enrolled = kaunty[i].enrolled;
                var total = kaunty[i].total;
                var dropouts = kaunty[i].dropouts;

                if(countyName == event.feature.f.COUNTY){
                  localStorage.setItem('county_name', countyName);
                  localStorage.setItem('county_enrolls', enrolled);
                  localStorage.setItem('county_total', total);
                  localStorage.setItem('county_dropouts', dropouts);
                }
              }

                var county_name = localStorage.getItem('county_name');
                var county_enrolls = localStorage.getItem('county_enrolls');
                var county_total = localStorage.getItem('county_total');
                var county_dropouts  = localStorage.getItem('county_dropouts');

                var myCenter = new google.maps.LatLng(event.feature.f.Lat,event.feature.f.Lng);
                marker.setPosition(myCenter);
                marker.setMap(this.map);

                if(county_name == event.feature.f.COUNTY){
                  infoWindow.setContent(
                    county_name+'<p><small>Total Registered Children: '+county_total+'</small></p><p><small>Total Newly Enrolled Children: '+county_enrolls+'</small></p><p><small>Dropouts: '+county_dropouts+'</small></p>'
                  );
                  infoWindow.open(this.map, marker);
                }else{
                  infoWindow.setContent(
                    '<p><small>No data available for '+event.feature.f.COUNTY+' County</small></p>'
                  );
                  infoWindow.open(this.map, marker);
                }


            }

            this.map.data.revertStyle();
            this.map.data.overrideStyle(event.feature, {strokeWeight: 8, fillColor: 'red'});
            });

          this.map.data.addListener(marker,'mouseout', function(event) {
            this.map.data.revertStyle();
            infoWindow.close(this.map,marker);
          });


        this.map.data.loadGeoJson('assets/data/kenyancounties.json');


                }
            );



      /*function initMap() {

      }*/

      google.maps.event.addDomListener(window, "load");
  }

  private map:any;
  countyName:any;
  kaunti:any;
  ngAfterViewInit(){
    
      

  }

  getCountiesData(){
    this.countyService.getCountiesData().subscribe(data=>{
      data = data.results;
      for(let a=0; a<data.length; a++){
        this.ct = {}
        this.ct.name = data[a].value;
        this.ct.enrolled = data[a].enrolled_females + data[a].enrolled_males;
        this.ct.total = data[a].old_females + data[a].old_males;
        this.ct.dropouts = data[a].dropout_total;
        this.count.push(this.ct);
      }
      localStorage.setItem('countyDataAPi', JSON.stringify(this.count));
    }),error =>{

    }
  }

  getData(){
    this.getMapData((data) => {
      let properties = data.features

      for (let i=0;i<properties.length; i++){
        this.kaunti ={}
        this.kaunti.countyName = properties[i].properties.COUNTY;
        this.kaunt.push(this.kaunti);
      }
      return this.kaunt;
    });
  }

  getMapData(data){
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/kenyancounties.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }


    infoWindowShow:boolean = false;
    mouseOverMarker(infoWindow, gm, event){
      // console.log(event)
      if (gm.lastOpen != null) {
          gm.lastOpen.close();
      }

      gm.lastOpen = infoWindow;

      infoWindow.open();
    }


}
