export default async function get_weather_info(location_id: string) {
  console.log(process.env.NEXT_PUBLIC_WEATHER_ENDPOINT);
  const endpoint = process.env.NEXT_PUBLIC_WEATHER_ENDPOINT as string;
  const query_url = endpoint + "?q=" + location_id;
  console.log(query_url);
  try {
    let res = await fetch(query_url);
    return res;
  } catch (e) {
    return Promise.resolve(e);
  }
}
