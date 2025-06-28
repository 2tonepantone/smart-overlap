
import { DateTime } from 'luxon';

export const generateTimeSlots = (interval = 30) => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }
  return slots;
};

export const isAvailable = (person, dateTime) => {
  if (!person.availability || !person.timeZone) {
    return false;
  }

  const userTime = dateTime.setZone(person.timeZone);
  const dayOfWeek = userTime.weekdayLong; // Monday, Tuesday, etc.

  const dayAvailability = person.availability[dayOfWeek];
  if (!dayAvailability) {
    return false;
  }

  const { start, end } = dayAvailability;
  const startTime = DateTime.fromISO(start, { zone: person.timeZone });
  const endTime = DateTime.fromISO(end, { zone: person.timeZone });

  // Handle overnight availability
  if (endTime < startTime) {
    // Available from start time on day D to end time on day D+1
    const userTimeInPersonTZ = userTime.setZone(person.timeZone);
    const startDateTime = startTime.set({ year: userTimeInPersonTZ.year, month: userTimeInPersonTZ.month, day: userTimeInPersonTZ.day });
    const endDateTime = endTime.set({ year: userTimeInPersonTZ.year, month: userTimeInPersonTZ.month, day: userTimeInPersonTZ.day }).plus({ days: 1 });
    return userTimeInPersonTZ >= startDateTime && userTimeInPersonTZ < endDateTime;
  }

  // Normal same-day availability
  return userTime.hour >= startTime.hour && userTime.hour < endTime.hour;
};
