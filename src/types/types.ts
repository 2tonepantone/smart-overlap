export type Availability = {
  [key: string]: { start: string; end: string };
};

export type Person = {
  id: string;
  name: string;
  timeZone: string;
  availability: Availability;
};

export type Page = 'Grid' | 'People' | 'Me';
