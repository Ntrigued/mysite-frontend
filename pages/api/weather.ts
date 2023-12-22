// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: any;
};

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
      forecast_base_url + "?key=" + api_key + "&q=" + query_string;

    try {
      const json_data = await fetch(query_url).then((resp) => resp.json());
      res.status(200).json(json_data);
    } catch (e) {
      res.status(500).json({ error: "Error from upstream" });
    }
  }
}
