import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { 
    CanActivate, 
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { WeatherService } from './weather.service';

@Injectable()
export class UrlGuardService implements CanActivate{
    
    constructor(private router: Router, private weatherService: WeatherService) {      
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
            Observable<boolean> | Promise<boolean> | boolean
    {   
            //returning the true: if location is set
            //         else redirect to start page to set location
            if(this.weatherService.locationSet){
                return true;
            }else{
                this.router.navigate(['/']);
            }
            return false;
    }

}