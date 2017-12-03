import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';

@Component({
  selector: 'app-cloudsChart',
  templateUrl: './cloudsChart.component.html',
  styleUrls: ['./cloudsChart.component.css']
})

export class CloudChartComponent implements OnInit, OnDestroy { 
  
  chart :any;
  options: any;

  constructor(private weatherService: WeatherService){
    this.options = {
      chart: {
        type: 'spline'
      },
      title: {
          text: 'Clouds at '+this.weatherService.getCity()
      },
      subtitle: {
          text: 'Showing Clouds at different time intervals'
      },
      xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { 
              millisecond: '%H:%M:%S.%L'
          },
          title: {
              text: 'Time'
          }
      },
      yAxis: {
          title: {
              text: 'Clouds'
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
      
      series: [{ name: 'Clouds', data: this.weatherService.getClouds()}]
    };
    setInterval(()=>{
      this.chart.series[0] = this.weatherService.getClouds();
      //this.chart.series[0].addPoint(this.weatherService.clouds[this.weatherService.clouds.length-1]);
    },70000);
  }
  

  ngOnInit(){}

  updateChart(chartInstance:any){
    this.chart = chartInstance;
  }
  
  ngOnDestroy(){}

}