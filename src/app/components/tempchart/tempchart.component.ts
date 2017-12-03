import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../shared/weather.service';

@Component({
  selector: 'app-tempchart',
  templateUrl: './tempchart.component.html',
  styleUrls: ['./tempchart.component.css']
})

export class TempChartComponent implements OnInit, OnDestroy { 
  
  chart :any;
  options: any;

  constructor(private weatherService: WeatherService){
    this.options = {
      chart: {
        type: 'spline'
      },
      title: {
          text: 'Temperature at '+this.weatherService.getCity()
      },
      subtitle: {
          text: 'Showing Temperature at different time intervals'
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
              text: 'Temperature'
          },
          min: 0
      },
      tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x: %H:%M:%S}: {point.y:.2f} f'
      },
      plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        }
      },
      series: [
          {name: 'Temperature', data: this.weatherService.temp},
          {name: 'Temperature Min', data: this.weatherService.temp_min},
          {name: 'Temperature Max', data: this.weatherService.temp_max}
        ]
    };
    setInterval(()=>{
        this.chart.series[0]= this.weatherService.temp;
        this.chart.series[1]= this.weatherService.temp_min;
        this.chart.series[2]= this.weatherService.temp_max;
        
    //   this.chart.series[0].addPoint(this.weatherService.temp[this.weatherService.temp.length-1]);
    //   this.chart.series[1].addPoint(this.weatherService.temp_min[this.weatherService.temp_min.length-1]); //= this.weatherService.temp_min;
    //   this.chart.series[2].addPoint(this.weatherService.temp_max[this.weatherService.temp_max.length-1]); //= this.weatherService.temp_max;
    },70000);
  }
  

  ngOnInit(){
  }

  updateChart(chartInstance:any){
    this.chart = chartInstance;
  }
  
  ngOnDestroy(){
  }

}