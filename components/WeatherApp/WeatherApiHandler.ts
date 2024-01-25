function allValuesFilled(obj: any) {
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

export async function get_weather_info(location_id: string) {
  const endpoint = "/api/weather";
  const query_url = endpoint + "?q=" + location_id + "&length=3";
  console.error("fetching from: ", query_url);
  let res = await fetch(query_url);
  const json_data = await res.json();
  return json_data;
}
