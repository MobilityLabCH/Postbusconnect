type Trip = {
  id: string;
  partner_id: string;
  route: { from_stop_id: string; to_stop_id: string };
  date: string; departure_time: string;
  capacity: number;
  booked: number;
  pricing_model: { type: 'flat' | 'per_passenger'; amount_chf: number };
  visibility: { public: boolean };
};

type Booking = {
  id: string; trip_id: string;
  passengers: { first_name?: string; last_name?: string }[];
  source: 'hotel'|'ot'|'operator'|'direct';
  created_at: string;
};

export const db = {
  trips: new Map<string, Trip>(),
  bookings: new Map<string, Booking>()
};
