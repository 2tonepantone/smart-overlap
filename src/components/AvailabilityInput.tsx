import React from 'react';
import styles from './AvailabilityInput.module.css';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

import { Availability } from '../types/types';

interface AvailabilityInputProps {
  availability: Availability;
  onChange: (availability: Availability) => void;
}

const AvailabilityInput: React.FC<AvailabilityInputProps> = ({
  availability,
  onChange,
}) => {
  const handleDayChange = (day: string) => {
    const newAvailability = { ...availability };
    if (newAvailability[day]) {
      delete newAvailability[day];
    } else {
      newAvailability[day] = { start: '09:00', end: '17:00' };
    }
    onChange(newAvailability);
  };

  const handleTimeChange = (
    day: string,
    timeType: 'start' | 'end',
    value: string,
  ) => {
    const newAvailability = { ...availability };
    newAvailability[day][timeType] = value;
    onChange(newAvailability);
  };

  return (
    <div className={styles.availabilityInput}>
      <h3>Your Availability</h3>
      {daysOfWeek.map((day) => (
        <div key={day} className={styles.dayRow}>
          <label>
            <input
              type="checkbox"
              checked={!!availability[day]}
              onChange={() => handleDayChange(day)}
            />
            {day}
          </label>
          {availability[day] && (
            <div className={styles.timeInputs}>
              <input
                type="time"
                value={availability[day].start}
                onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
              />
              <span>-</span>
              <input
                type="time"
                value={availability[day].end}
                onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvailabilityInput;
