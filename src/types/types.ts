export interface Availability {
  [day: string]: { start: string; end: string };
}

export interface Person {
  id: string;
  name: string;
  timeZone: string;
  availability: Availability;
}
