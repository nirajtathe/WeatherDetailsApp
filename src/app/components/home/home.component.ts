import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{

  data: any;
  sub: Subscription;
  error: any;
  constructor(private weatherService: WeatherService){}
  
  ngOnInit(){
    window.navigator.geolocation.getCurrentPosition((position)=>{
      this.weatherService.setLocation(position.coords.latitude,position.coords.longitude);
      if(this.weatherService.locationSet === true){
        this.sub= this.weatherService.getLatestData().
        subscribe(
          (res: any)=>{
            this.data = res;
        });
      }
    });

    if(this.weatherService.locationSet === true){
      this.sub= this.weatherService.getLatestData().
      subscribe(
        (res: any)=>{
          this.data = res;
      });
    }
  }

  setLocationData(form: NgForm){
    this.weatherService.setPostalData(form.controls.countryCode.value,
      form.controls.postalCode.value);

    
    this.sub= this.weatherService.getLatestData().
    subscribe(
      (res: any)=>{
        this.data = res;        
      },
      (error:any)=>{
        console.log(error);
        this.error = error;
      }
    );
  }  

  errorNullify(){
    this.weatherService.locationSet = false;
    this.error = undefined;
  }
  
  ngOnDestroy(){
  }

}