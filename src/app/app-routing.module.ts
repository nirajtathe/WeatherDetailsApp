import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TempChartComponent } from './components/tempchart/tempchart.component';
import { PressureChartComponent } from './components/pressureChart/pressureChart.component';
import { HumidityChartComponent } from './components/humidityChart/humidityChart.component';
import { WindChartComponent } from './components/windChart/windChart.component';
import { CloudChartComponent } from './components/cloudsChart/cloudsChart.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';

import { UrlGuardService } from './shared/url-guard.service';

const appRoutes:Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home' , component: HomeComponent },
    { path: 'temp', canActivate: [UrlGuardService], component: TempChartComponent },
    { path: 'pressure', canActivate: [UrlGuardService], component: PressureChartComponent },
    { path: 'humidity', canActivate: [UrlGuardService], component: HumidityChartComponent },
    { path: 'wind', canActivate: [UrlGuardService], component: WindChartComponent },
    { path: 'cloud', canActivate: [UrlGuardService], component: CloudChartComponent},
    { path: 'pageNotFound', component: PageNotFoundComponent},
    { path: '**', redirectTo: '/pageNotFound'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}