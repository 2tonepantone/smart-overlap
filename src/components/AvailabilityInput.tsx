import React from 'react';
import styles from './AvailabilityInput.module.css';
import { Availability } from '../types/types';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface AvailabilityInputProps {
  availability: Availability;
  onChange: (availability: Availability) => void;
  title?: string;
}

const AvailabilityInput: React.FC<AvailabilityInputProps> = ({
  availability,
  onChange,
  title = 'Set Your Weekly Availability',
}) => {
  const handleDayToggle = (day: string) => {
    const newAvailability = { ...availability };
    if (newAvailability[day]) {
      delete newAvailability[day];
    } else {
      // Default to a common availability window when enabling a day
      newAvailability[day] = { start: '09:00', end: '17:00' };
    }
    onChange(newAvailability);
  };

  const handleTimeChange = (
    day: string,
    timeType: 'start' | 'end',
    value: string,
  ) => {
    // Ensure the day is initialized before setting time
    if (!availability[day]) return;

    const newAvailability = { ...availability };
    newAvailability[day] = { ...newAvailability[day], [timeType]: value };
    onChange(newAvailability);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayRow}>
            <label className={styles.dayLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={!!availability[day]}
                onChange={() => handleDayToggle(day)}
              />
              <span>{day}</span>
            </label>

            {availability[day] && (
              <div className={styles.timeInputs}>
                <input
                  type="time"
                  className={styles.timeInput}
                  value={availability[day].start}
                  onChange={(e) =>
                    handleTimeChange(day, 'start', e.target.value)
                  }
                />
                <span className={styles.separator}>to</span>
                <input
                  type="time"
                  className={styles.timeInput}
                  value={availability[day].end}
                  onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityInput;
