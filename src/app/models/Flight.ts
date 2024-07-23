type Context = {
  status: string;
  sessionId: string;
  totalResults: number;
};

type Carrier = {
  id: number;
  logoUrl: string;
  name: string;
  alternateId?: string;
  allianceId?: number;
  displayCode?: string;
};

type Segment = {
  id: string;
  origin: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  destination: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
};

type Leg = {
  id: string;
  origin: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  destination: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operating: Carrier[];
    operationType: string;
  };
  segments: Segment[];
};

type Price = {
  raw: number;
  formatted: string;
  pricingOptionId: string;
};

type FarePolicy = {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
};

type Itinerary = {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: Record<string, any>;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
};

type Airport = {
  id: string;
  entityId: string;
  name: string;
};

type CityAirport = {
  city: string;
  airports: Airport[];
};

type FilterStats = {
  duration: {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
  };
  airports: CityAirport[];
  carriers: Carrier[];
  stopPrices: {
    direct: {
      isPresent: boolean;
      formattedPrice: string;
    };
    one: {
      isPresent: boolean;
    };
    twoOrMore: {
      isPresent: boolean;
    };
  };
};

export type Flight = {
  context: Context;
  itineraries: Itinerary[];
  messages: any[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
  token: string;
};