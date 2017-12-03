import { Component, OnInit, OnDestroy } from '@angular/core';
//import { CHART_DIRECTIVES, Highcharts,  } from 'angular2-highcharts';

@Component({
  selector: 'app-learnCharts',
  templateUrl: './learnCharts.component.html',
  styleUrls: ['./learnCharts.component.css']
})

export class LearnChartsComponent implements OnInit, OnDestroy { 
  
  chart :any;
  options: any;

  constructor(){
    this.options = {
      chart: {
        type: 'spline'
      },
      title: {
          text: 'Snow depth at '
      },
      subtitle: {
          text: 'Irregular time data in Highcharts JS'
      },
      xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
          },
          title: {
              text: 'Date'
          }
      },
      yAxis: {
          title: {
              text: 'Snow depth (m)'
          },
          min: 0
      },
      tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
      }
      
      /*chart: { type: 'spline' },
      title: { text : 'Learn Chart'},
      series: [
                {name: 'temp', data: [2,3,5,8,13], value:'Temp'},
                {name: 'pressure' ,data: [8,13,3,12,9]}
              ]
      */// ,credits: {
      //   enabled: true
      // }
    };
    //setInterval(() => this.chart.series[0].addPoint(Math.random() * 10), 1000);
  }
  

  ngOnInit(){}

  updateChart(chartInstance:any){
    this.chart = chartInstance;
  }
  
  ngOnDestroy(){}

}