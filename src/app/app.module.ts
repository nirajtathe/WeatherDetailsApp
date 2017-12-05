import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule }  from '@angular/platform-browser';

import { ChartModule } from 'angular2-highcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TempChartComponent } from './components/tempchart/tempchart.component';
import { PressureChartComponent } from './components/pressureChart/pressureChart.component';
import { HumidityChartComponent } from './components/humidityChart/humidityChart.component';
import { WindChartComponent } from './components/windChart/windChart.component';
import { CloudChartComponent } from './components/cloudsChart/cloudsChart.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';

import { WeatherService } from './shared/weather.service';
import { UrlGuardService } from './shared/url-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    TempChartComponent,
    PressureChartComponent,
    HumidityChartComponent,
    WindChartComponent,
    CloudChartComponent,
    PageNotFoundComponent
  ],
  providers: [ WeatherService, UrlGuardService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }