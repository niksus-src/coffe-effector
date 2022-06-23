export type coffeType = {
  length: number;
  data: Array<Coffe> | never[];
};

export type Coffe = {
  _id: string;
  name: string;
  desc: string;
  geography: string;
  sourness: number;
  special: string;
  kind: string;
  sale: boolean;
  roasting: number;
  bitterness: number;
  saturation: number;
  imgSrc: string;
  taste: Array<string>;
  processing: string;
  manufacturer: string;
  sournessDegree: string;
  price: {
    [index: string]: number;
  };
  oldPrice: {
    [index: string]: number | null;
  };
};

export type Filters = {
  roasting: string | null;
  geography: string | null;
  sourness: string | null;
  special: string | null;
  kind: string | null;
  allAny: boolean;
};
