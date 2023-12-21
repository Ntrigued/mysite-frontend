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
    const forecast_base_url = process.env.NEXT_WEATHERAPI_FORECAST_URL;
    const api_key = process.env.NEXT_WEATHERAPI_API_KEY;
    const query_url =
      forecast_base_url + "?key=" + api_key + "&q=" + req.query.q;

    try {
      const json_data = await fetch(query_url).then((resp) => resp.json());
      res.status(200).json(json_data);
    } catch (e) {
      res.status(500).json({ error: "Error from upstream" });
    }
  }
}
