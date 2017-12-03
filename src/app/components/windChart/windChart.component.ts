import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';

@Component({
  selector: 'app-windChart',
  templateUrl: './windChart.component.html',
  styleUrls: ['./windChart.component.css']
})

export class WindChartComponent implements OnInit, OnDestroy { 
  
  chart :any;
  options: any;

  constructor(private weatherService: WeatherService){
    this.options = {
      chart: {
        type: 'spline'
      },
      title: {
          text: 'Wind speed and degree at '+this.weatherService.getCity()
      },
      subtitle: {
          text: 'Showing Wind speed and Degree at different time intervals'
      },
      xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
              // month: '%e. %b',
              // year: '%b',
              //second: '%H:%M:%S'
              millisecond: '%H:%M:%S.%L'
          },
          title: {
              text: 'Time'
          }
      },
      yAxis: {
          title: {
              text: 'Wind Speed and Degree'
          },
          min: 0
      },
      tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x: %H:%M:%S}: {point.y:.2f}'
      },
      plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        }
      },
      
      series: [
                { name: 'Wind Speed', data: this.weatherService.getWindSpeed()},
                { name: 'Wind Degree', data: this.weatherService.getWindDeg()}
              ]
    };
    setInterval(()=>{
      this.chart.series[0] = this.weatherService.getWindSpeed();
      //this.chart.series[0].addPoint(this.weatherService.windSpeed[this.weatherService.windSpeed.length-1]);
      this.chart.series[1] = this.weatherService.getWindDeg();
      //this.chart.series[1].addPoint(this.weatherService.windDeg[this.weatherService.windDeg.length-1]);
    },70000);
  }
  

  ngOnInit(){}

  updateChart(chartInstance:any){
    this.chart = chartInstance;
  }
  
  ngOnDestroy(){}

}