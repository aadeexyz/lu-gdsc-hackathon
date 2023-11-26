import { atom } from 'jotai';

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

const listingAtom = atom<Listing | null>(null);

export default listingAtom;