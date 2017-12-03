import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

// by coord
// var d={"coord":{"lon":73.77,"lat":18.61},
//     "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],
//     "base":"stations",
//     "main":{"temp":292.272,"pressure":950.76,"humidity":70,"temp_min":292.272,
//     "temp_max":292.272,"sea_level":1025.71,"grnd_level":950.76},
//     "wind":{"speed":2.02,"deg":98.0012},
//     "clouds":{"all":88},
//     "dt":1512241357,
//     "sys":{"message":0.0069,
//     "country":"IN","sunrise":1512177726,"sunset":1512217624},"id":1274165,
//     "name":"Chinchvad","cod":200};

@Injectable()
export class WeatherService implements OnInit{
    locationSet: boolean =false;

    city: string='';
    temp: any[] = [];
    temp_min:any[] = [];
    temp_max: any[] = [];
    pressure: any[] = [];
    humidity:any[] = [];
    windSpeed:any[] = [];
    windDeg: any[] = [];
    clouds: any[] = [];

    appId: string = '4207fcc3c3dcc9d88b60982d25132c2b';
    gmt530: number = 19800000;
    lat: number;
    lon: number;
    searchByCoord: boolean= false;

    countryCode: string;
    postalCode: string;
    searchByPostalCode: boolean= false;

    constructor(private http: HttpClient) {
        setInterval(()=>{
            this.fetchCurrentWeather();
        },60000);
     }

    setLocation(lat:number,lon:number){
        this.lat = lat;
        this.lon = lon;
        this.searchByCoord =true;
        this.locationSet = true;
   }

   setPostalData(countryCode: string, postalCode: string){
       this.countryCode = countryCode;
       this.postalCode = postalCode;
       this.searchByPostalCode =true;
       this.locationSet = true;
   }

    ngOnInit(){}

    getTemp(){
        return this.temp;
    }
    getPressure(){
        return this.pressure;
    }
    getHumidity(){
        return this.humidity;
    }
    getWindSpeed(){
        return this.windSpeed;
    }
    getWindDeg(){
        return this.windDeg;
    }
    getClouds(){
        return this.clouds;
    }

    getCity(){
        return this.city;
    }

    fetchCurrentWeather(){
        //not able to fetch the data by setting the header. 
        //Therefore, Directly added the key in GET url
        if(this.searchByCoord){
            this.http.get<Observable<Object>>(
                'http://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.lon
                +'&APPID='+this.appId
            ).subscribe(
                (res:any)=>{
                    //time is added with 
                    this.temp.push([(new Date().getTime())+this.gmt530,res.main.temp]);
                    this.temp_min.push([(new Date().getTime())+this.gmt530,res.main.temp_min]);
                    this.temp_max.push([(new Date().getTime())+this.gmt530,res.main.temp_max]);
                    this.pressure.push([(new Date().getTime())+this.gmt530,res.main.pressure]);
                    this.humidity.push([(new Date().getTime())+this.gmt530,res.main.humidity]);
                    this.windSpeed.push([(new Date().getTime())+this.gmt530,res.wind.speed]);
                    this.windDeg.push([(new Date().getTime())+this.gmt530,res.wind.deg]);
                    this.clouds.push([(new Date().getTime())+this.gmt530,res.clouds.all]);
                    this.city = res.name;
                },
                (error:any)=>{
                    console.log(error);
                }
            );
        }else if(this.searchByPostalCode){
            this.http.get<Observable<Object>>(
                'http://api.openweathermap.org/data/2.5/weather?zip='
                +this.postalCode+','+this.countryCode
                +'&APPID='+this.appId
            ).subscribe(
                (res:any)=>{
                    this.temp.push([(new Date().getTime())+this.gmt530,res.main.temp]);
                    this.temp_min.push([(new Date().getTime())+this.gmt530,res.main.temp_min]);
                    this.temp_max.push([(new Date().getTime())+this.gmt530,res.main.temp_max]);
                    this.pressure.push([(new Date().getTime())+this.gmt530,res.main.pressure]);
                    this.humidity.push([(new Date().getTime())+this.gmt530,res.main.humidity]);
                    this.windSpeed.push([(new Date().getTime())+this.gmt530,res.wind.speed]);
                    this.windDeg.push([(new Date().getTime())+this.gmt530,res.wind.deg]);
                    this.clouds.push([(new Date().getTime())+this.gmt530,res.clouds.all]);
                    this.city = res.name;
                },
                (error:any)=>{
                    console.log(error);
                }
            );
        }
    }

    getLatestData(){
        if(this.searchByCoord){//if(this.lat!==undefined && this.lon!==undefined){
            //this.fetchCurrentWeather();
            return this.http.get<Observable<Object>>(
                'http://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.lon
                +'&APPID='+this.appId
            );
        }else if(this.searchByPostalCode){
            //this.fetchCurrentWeather();
            return this.http.get<Observable<Object>>(
                'http://api.openweathermap.org/data/2.5/weather?zip='
                +this.postalCode+','+this.countryCode
                +'&APPID='+this.appId
            );
        }else{
            return (Observable.create((obs: Observer<string>)=>{
                obs.next('Unable to Load Data because location is not accessible.');
            }));
        }
    }

}