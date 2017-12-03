import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';

@Component({
  selector: 'app-humidityChart',
  templateUrl: './humidityChart.component.html',
  styleUrls: ['./humidityChart.component.css']
})

export class HumidityChartComponent implements OnInit, OnDestroy { 
  
  chart :any;
  options: any;

  constructor(private weatherService: WeatherService){
    this.options = {
      chart: {
        type: 'spline'
      },
      title: {
          text: 'Humidity at '+this.weatherService.getCity()
      },
      subtitle: {
          text: 'Showing Humidity at different time intervals'
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
              text: 'Humidity'
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
      series: [{ name: 'Humidity', data: this.weatherService.getHumidity()}]
    };
    setInterval(()=>{
        this.chart.series[0]= this.weatherService.humidity;
      //this.chart.series[0].addPoint(this.weatherService.humidity[this.weatherService.humidity.length-1]);
    },70000);
  }
  

  ngOnInit(){}

  updateChart(chartInstance:any){
    this.chart = chartInstance;
  }
  
  ngOnDestroy(){}

}