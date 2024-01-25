import { useState, useEffect } from "react";
import { get_weather_info } from "./WeatherApiHandler";
import DailyWeatherBoxes from "./DailyWeatherBoxes";
import QuickInfo from "./QuickInfo";
import WeatherRows from "./WeatherRows";

export default function WeatherApp(props: any) {
  const [weather_info, setWeatherInfo] = useState({});

  useEffect(() => {
    get_weather_info("53718")
      .then((data) => {
        console.log("RESOLVED");
        console.log(data);
        setWeatherInfo(data.weather);
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }, []);
  return (
    <div>
      <QuickInfo />
      <DailyWeatherBoxes />
      <WeatherRows />
      <pre>{JSON.stringify(weather_info, null, 2)}</pre>
    </div>
  );
}
