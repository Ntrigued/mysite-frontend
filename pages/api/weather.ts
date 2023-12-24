// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: any;
};

function allValuesFilled(obj) {
  let retval = true;
  if (obj == undefined || obj == null) {
    retval = false;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v) => {
      retval = retval && allValuesFilled(v);
    });
  } else if (obj instanceof Map) {
    obj.forEach((val, key) => {
      retval = retval && allValuesFilled(val);
    });
  }
  return retval;
}

async function get_weather_info(location_id) {
  const endpoint = "/api/weather";
  const query_url = endpoint + "?q=" + location_id + "&length=3";
  let res = await fetch(query_url);
  const json_data = await res.json();
  let days_info: Array<any> = [];
  [...Array(4).keys()].forEach((i) => {
    let forecast_day = json_data.forecast.forecastday[i].day;
    let hours_info: Array<any> = [];
    [...Array(24).keys()].forEach((j) => {
      let forecast_hour = json_data.forecast.forecastday[i].hour[j];
      hours_info[j] = new Map(
        Object.entries({
          feelslike_c: forecast_hour.feelslike_c,
          feelslike_f: forecast_hour.feelslike_f,
          temp_c: forecast_hour.temp_c,
          temp_f: forecast_hour.temp_f,
          wind_degree: forecast_hour.wind_degree,
          wind_dir: forecast_hour.wind_dir,
          wind_kph: forecast_hour.wind_kph,
          wind_mph: forecast_hour.wind_mph,
        }),
      );
    });
    days_info[i] = new Map(
      Object.entries({
        hours: hours_info,
        condition: new Map(
          Object.entries({
            text: forecast_day.condition.text,
            icon: forecast_day.condition.icon,
          }),
        ),
        chance_of_rain: forecast_day.daily_chance_of_rain,
        chance_of_snow: forecast_day.daily_chance_of_snow,
        maxtemp_c: forecast_day.maxtemp_c,
        maxtemp_f: forecast_day.maxtemp_f,
        mintemp_c: forecast_day.mintemp_c,
        mintemp_f: forecast_day.mintemp_f,
        avgtemp_c: forecast_day.avgtemp_c,
        avgtemp_f: forecast_day.avgtemp_f,
      }),
    );
  });

  try {
    let weather_data = new Map(
      Object.entries({
        location: new Map(
          Object.entries({
            name: json_data.location.name,
            region: json_data.location.region,
            country: json_data.location.country,
          }),
        ),
        current: new Map(
          Object.entries({
            condition: new Map(
              Object.entries({
                text: json_data.current.condition.text,
                icon: json_data.current.condition.icon,
              }),
            ),
            feelslike_c: json_data.current.feelslike_c,
            feelslike_f: json_data.current.feelslike_f,
            temp_c: json_data.current.temp_c,
            temp_f: json_data.current.temp_f,
            wind_degree: json_data.current.wind_degree,
            wind_dir: json_data.current.wind_dir,
            wind_kph: json_data.current.wind_kph,
            wind_mph: json_data.current.wind_mph,
          }),
        ),
        forecast: days_info,
      }),
    );
    if (!allValuesFilled(weather_data)) {
      throw Error("Missing data");
    }

    return weather_data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method != "GET") {
    res.status(405).json({});
  } else if (!req.query.q || typeof req.query.q != "string") {
    res.status(400).json({});
  } else {
    let query_string = req.query.q as string;
    query_string = query_string.trim();
    const forecast_base_url = process.env.NEXT_WEATHER_API_FORECAST_URL;
    const api_key = process.env.NEXT_WEATHER_API_KEY;
    const query_url =
      forecast_base_url +
      "?days=3&aqi=no&alerts=no" +
      "&key=" +
      api_key +
      "&q=" +
      query_string;

    const json_data = await fetch(query_url).then((resp) => resp.json());
    try {
      //const json_data = await fetch(query_url).then((resp) => resp.json());
      const weather_info = get_weather_info(json_data);
      res.status(200).json({ weather: weather_info, original: json_data });
    } catch (e) {
      //res.status(500).json({ error: "Error from upstream" });
      res.status(500).json({ error: e, original: json_data });
    }
  }
}
