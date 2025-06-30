import React, { useState } from 'react';
import styles from './OverlapGrid.module.css';
import { DateTime } from 'luxon';
import { generateTimeSlots, isAvailable } from '../utils/timeUtils';
import { Person } from '../types/types';
import TimeProposerModal from './TimeProposerModal';

interface OverlapGridProps {
  people: Person[];
  days?: number;
}

const OverlapGrid: React.FC<OverlapGridProps> = ({ people, days = 7 }) => {
  const [selectedTime, setSelectedTime] = useState<DateTime | null>(null);

  if (!people || people.length === 0) {
    return <p>Add yourself and some contacts to see the overlap.</p>;
  }

  const timeSlots = generateTimeSlots(30); // 30-minute intervals
  const today = DateTime.now();
  const weekDates = Array.from({ length: days }, (_, i) =>
    today.plus({ days: i }),
  );

  const getSummaryCellClass = (availableCount: number): string => {
    const total = people.length;
    if (availableCount === total) return styles.allAvailable;
    if (availableCount >= total * 0.75) return styles.majorityAvailable;
    if (availableCount > 0) return styles.someAvailable;
    return styles.noneAvailable;
  };

  const handleCellClick = (dateTime: DateTime) => {
    setSelectedTime(dateTime);
    // Later, this will open the TimeProposerModal
    console.log(`Selected time: ${dateTime.toISO()}`);
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {/* Header Row */}
        <div className={`${styles.header} ${styles.personHeader}`}></div>
        {timeSlots.map((slot, index) => (
          <div key={slot} className={styles.header}>
            {index % 2 === 0 ? slot : ''} {/* Show every other time slot */}
          </div>
        ))}

        {/* Rows for each day */}
        {weekDates.map((date) => (
          <React.Fragment key={date.toISODate()}>
            <div className={styles.dateHeader}>
              {date.toLocaleString(DateTime.DATE_FULL)}
            </div>

            {/* Summary Row for the day */}
            <div className={styles.row}>
              <div className={`${styles.header} ${styles.personHeader}`}>
                Overlap
              </div>
              {timeSlots.map((slot) => {
                const dt = date.set({
                  hour: parseInt(slot.split(':')[0]),
                  minute: parseInt(slot.split(':')[1]),
                });
                const availableCount = people.filter((p) =>
                  isAvailable(p, dt),
                ).length;
                return (
                  <div
                    key={slot}
                    className={`${styles.cell} ${getSummaryCellClass(availableCount)}`}
                    onClick={() => handleCellClick(dt)}
                    title={`${availableCount} / ${people.length} available`}
                  />
                );
              })}
            </div>

            {/* Individual Person Rows for the day */}
            {people.map((person) => (
              <div key={person.id} className={styles.row}>
                <div className={`${styles.header} ${styles.personHeader}`}>
                  {person.name}
                </div>
                {timeSlots.map((slot) => {
                  const dt = date.set({
                    hour: parseInt(slot.split(':')[0]),
                    minute: parseInt(slot.split(':')[1]),
                  });
                  const available = isAvailable(person, dt);
                  return (
                    <div
                      key={slot}
                      className={`${styles.cell} ${available ? styles.individualAvailable : styles.individualUnavailable}`}
                      title={available ? 'Available' : 'Unavailable'}
                    />
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <TimeProposerModal
        selectedTime={selectedTime}
        people={people}
        onClose={() => setSelectedTime(null)}
      />
    </div>
  );
};

export default OverlapGrid;
