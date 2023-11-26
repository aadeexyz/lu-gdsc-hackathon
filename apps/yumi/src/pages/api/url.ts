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
        // const response = await fetch(`https://api.bskdany.com/fb?url=${req.query.url}`);
        const response = await fetch(`https://free-planes-camp.tunnelapp.dev/fb?url=${req.query.url}`);
        const json = await response.json();
        const data = json as Listing;

        // const data: Listing = {
        //     "title": "Private room for rent",
        //     "price": "$665 / Month",
        //     "location": "Thunder Bay, ON",
        //     "listedOn": "Listed over a week ago · Available 2024/01/01",
        //     "unitDetails": [
        //         "Unit Details",
        //         "Apartment",
        //         "3 beds · 1 bath",
        //         "Central AC",
        //         "Central heating",
        //         "In-unit laundry",
        //         "Parking available",
        //         "Furnished",
        //         "1 month Lease",
        //         "2 persons live here",
        //         "Cable TV",
        //         "Dishwasher"
        //     ],
        //     "description": [
        //         "All inclusive. One bedroom available in a 3 bedroom, 1 bath apartment. Furnished room. FEMALES ONLY.",
        //         "5mins drive to LU campus. Bus stop just across. Available JAN 1st"
        //     ],
        //     "walkScore": [
        //         "93 out of 100",
        //         "Daily errands do not require a car."
        //     ],
        //     "transitScore": [
        //         "49 out of 100",
        //         "A few nearby public transportation options."
        //     ],
        //     "bikeScore": [
        //         "82 out of 100",
        //         "Biking is convenient for most trips."
        //     ],
        //     "nearByTransit": [
        //         [
        //             "Algoma & Bay",
        //             "Routes: 11, 13, 3M",
        //             "120 ft"
        //         ],
        //         [
        //             "Court & Bay",
        //             "Routes: 1, 2",
        //             "584 ft"
        //         ],
        //         [
        //             "Red River & St. Patrick's Square",
        //             "Routes: 3C, 3J",
        //             "2,251 ft"
        //         ]
        //     ],
        //     "sellerName": "Sharanya Yadava",
        //     "whenJoined": "2004"
        // };

        res.status(200).json({ listing: data });

    } catch {
        res.status(500).json({ error: "Something went wrong" });
    }
};

export default handler;
