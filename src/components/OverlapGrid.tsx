import React, { useState } from 'react';
import styles from './OverlapGrid.module.css';
import { DateTime } from 'luxon';
import { generateTimeSlots, isAvailable } from '../utils/timeUtils.ts';
import TimeProposerModal from './TimeProposerModal.tsx';
import { Person } from '../types/types';

interface OverlapGridProps {
  people: Person[];
  days?: number;
}

const OverlapGrid: React.FC<OverlapGridProps> = ({ people, days = 7 }) => {
  const [selectedTime, setSelectedTime] = useState<DateTime | null>(null);

  if (!people || people.length === 0) {
    return <p>Add yourself and some contacts to see the overlap.</p>;
  }

  const timeSlots = generateTimeSlots();
  const today = DateTime.now();
  const weekDates = Array.from({ length: days }, (_, i) =>
    today.plus({ days: i }),
  );

  const getCellClass = (availableCount: number): string => {
    if (availableCount === people.length) {
      return styles.allAvailable; // Green
    }
    if (availableCount >= people.length / 2) {
      return styles.someAvailable; // Yellow
    }
    return styles.noneAvailable; // Red/Grey
  };

  const handleCellClick = (date: DateTime, slot: string) => {
    const [hour, minute] = slot.split(':').map(Number);
    const dt = date.set({ hour, minute });
    setSelectedTime(dt);
  };

  return (
    <div className={styles.gridContainer}>
      <h2>Availability Grid</h2>
      <div className={styles.gridScrollWrapper}>
        <table className={styles.overlapGrid}>
          <thead>
            <tr>
              <th className={styles.personHeader}>Person</th>
              {timeSlots.map((slot) => (
                <th key={slot}>{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekDates.map((date) => {
              const availabilityBySlot = timeSlots.map((slot) => {
                const [hour, minute] = slot.split(':').map(Number);
                const dt = date.set({ hour, minute });
                return people.filter((person) => isAvailable(person, dt))
                  .length;
              });

              return (
                <React.Fragment key={date.toISODate()}>
                  <tr>
                    <td
                      colSpan={timeSlots.length + 1}
                      className={styles.dateHeader}
                    >
                      {date.toLocaleString(DateTime.DATE_FULL)}
                    </td>
                  </tr>
                  <tr className={styles.summaryRow}>
                    <td className={styles.personHeader}>Overlap</td>
                    {availabilityBySlot.map((count, index) => (
                      <td
                        key={index}
                        className={`${styles.summaryCell} ${getCellClass(count)}`}
                        onClick={() => handleCellClick(date, timeSlots[index])}
                      >
                        <span className={styles.timeDisplay}>
                          {timeSlots[index]}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {people.map((person) => (
                    <tr key={person.id || 'self'}>
                      <td className={styles.personHeader}>{person.name}</td>
                      {timeSlots.map((slot) => {
                        const [hour, minute] = slot.split(':').map(Number);
                        const dt = date.set({ hour, minute });
                        const available = isAvailable(person, dt);
                        return (
                          <td
                            key={slot}
                            className={`${
                              available ? styles.available : styles.unavailable
                            } ${styles.personCell}`}
                            onClick={() => handleCellClick(date, slot)}
                          >
                            <span className={styles.timeDisplay}>{slot}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <TimeProposerModal
        selectedTime={selectedTime}
        people={people}
        onClose={() => setSelectedTime(null)}
        onCopy={() => alert('Copied to clipboard!')}
      />
    </div>
  );
};

export default OverlapGrid;
