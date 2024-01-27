export default function DailyWeatherBoxes(params: any) {
  /*horizontal row of 3 boxes for 3 day forecast, only used in desktop format*/
  const forecast_data = params.forecast_data;

  forecast_data.forEach((day: any) => {
    const daily_info = day.daily_info;
    const chance_of_rain = daily_info.chance_of_rain;
    const chance_of_snow = daily_info.chance_of_snow;
    const maxtemp_c = daily_info.maxtemp_c;
    const maxtemp_f = daily_info.maxtemp_f;
    const mintemp_c = daily_info.mintemp_c;
    const mintemp_f = daily_info.mintemp_f;
    const avgtemp_c = daily_info.avgtemp_c;
    const avgtemp_f = daily_info.avgtemp_f;
  });
  return <div></div>;
}
