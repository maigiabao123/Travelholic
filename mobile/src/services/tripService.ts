import { apiRequest } from './api';

export type TravelType =
  | 'Solo'
  | 'Couple'
  | 'Family'
  | 'Friends'
  | 'Business';

export type Trip = {
  id: number;
  user_id: number;
  name: string;
  destination: string;
  country: string;
  start_date: string;
  end_date: string;
  budget: number;
  currency_code: string | null;
  description: string | null;
  travel_type: TravelType | null;
  transportation_type: string | null;
  hotel_name: string | null;
  cover_image_url: string | null;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
};

type TripDetailResponse = {
  trip: Trip;
};

type TripsResponse = {
  trips: Trip[];
};

// Lấy chi tiết một trip
export function getTripById(
  tripId: string | number,
): Promise<TripDetailResponse> {
  return apiRequest<TripDetailResponse>(`/api/trips/${tripId}`);
}

// Lấy danh sách trip của người dùng
export function getMyTrips(): Promise<TripsResponse> {
  return apiRequest<TripsResponse>('/api/trips');
}

// Lấy trip sắp tới
export function getUpcomingTrip(): Promise<TripDetailResponse> {
  return apiRequest<TripDetailResponse>('/api/trips/upcoming');
}