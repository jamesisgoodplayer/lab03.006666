import type { AirlineEvent } from "@/Airline";
export interface passengerEvent {
    _id: string;
    name: string;
    trips: number;
    airline: AirlineEvent[];
}
