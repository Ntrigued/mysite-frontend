import { useState, useEffect } from "react";
import get_weather_info from "./WeatherApiHandler";

export default function WeatherApp(props: any) {
  const [weather_info, setWeatherInfo] = useState({});
  useEffect(() => {
    get_weather_info("75003")
      .then((data: string) => {
        console.log("RESOLVED");
        console.log(data);
        //setWeatherInfo(data);
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  });
  return <div></div>;
}
