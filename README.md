# WeatherDetailsApp
Angular 5 Application using Webpack
This application uses the location if allowed by the user and display the weather details for that location.
If the location is not allowed, then user needs to add the postal code (/zip code) and country code (Ex: IN for India). If the sata is valid then correct weather details will be displayed to the user.

5 charts are created after the data is fetched successfully. It will keep adding the data with an interval of 1 minute.
1) Temperature (Avg, Min and Max) Chart
2) Pressure Chart
3) Humidity Chart
4) Wind (Speed and Degree) Chart
5) Cloud (all) Chart

No one can access the chart url unless the location is specified. 

To create the chart, I have added angular2-highcharts.

There is 1 minute daily at the start before the chart is prepared. It won't have the data till first 1 minute later it will update the data automatically.

Contact me for anything related to this application.

Thanks,
Niraj T.
