import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';

@Component({
  selector: 'app-pressureChart',
  templateUrl: './pressureChart.component.html',
  styleUrls: ['./pressureChart.component.css']
})

export class PressureChartComponent implements OnInit, OnDestroy { 
  
  chart :any;
  options: any;

  constructor(private weatherService: WeatherService){
    this.options = {
      chart: {
        type: 'spline'
      },
      title: {
          text: 'Pressure at '+this.weatherService.getCity()
      },
      subtitle: {
          text: 'Showing Pressure at different time intervals'
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
              text: 'Pressure'
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
      series: [{name: 'Pressure', data: this.weatherService.getPressure()},]
    };
    setInterval(()=>{
      this.chart.series[0] = this.weatherService.getPressure();
      //this.chart.series[0].addPoint(this.weatherService.pressure[this.weatherService.pressure.length-1]);
    },70000);
  }
  

  ngOnInit(){}

  updateChart(chartInstance:any){
    this.chart = chartInstance;
  }
  
  ngOnDestroy(){}

}