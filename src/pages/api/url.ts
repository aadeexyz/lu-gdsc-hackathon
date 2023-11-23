import type { NextApiRequest, NextApiResponse } from "next";

type Listing = {
    title: string;
    price: string;
    location: string;
    listedOn: string;
    unitDetails: string[];
    description: string[];
    walkScore: string[];
    transitScore: string[];
    bikeScore: string[];
    nearByTransit: string[][];
    sellerName: string;
    whenJoined: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(`https://api.bskdany.com/fb?url=${req.query.url}`);
        const json = await response.json();
        const data = json as Listing;

        res.status(200).json({ listing: data });

    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

export default handler;
