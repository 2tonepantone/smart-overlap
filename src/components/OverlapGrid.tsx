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

type GroupedSlot = {
  isAvailable: boolean;
  slots: string[];
};

const OverlapGrid: React.FC<OverlapGridProps> = ({ people, days = 7 }) => {
  const [selectedTime, setSelectedTime] = useState<DateTime | null>(null);

  if (!people || people.length === 0) {
    return <p>Add yourself and some contacts to see the overlap.</p>;
  }

  const timeSlots = generateTimeSlots(30);
  const today = DateTime.now();
  const weekDates = Array.from({ length: days }, (_, i) =>
    today.plus({ days: i }),
  );

  const handleCellClick = (dateTime: DateTime) => {
    setSelectedTime(dateTime);
  };

  const groupSlotsByAvailability = (date: DateTime): GroupedSlot[] => {
    if (people.length === 0) {
      return [{ isAvailable: false, slots: timeSlots }];
    }

    const grouped: GroupedSlot[] = [];
    let currentGroup: GroupedSlot | null = null;

    timeSlots.forEach((slot) => {
      const dt = date.set({
        hour: parseInt(slot.split(':')[0]),
        minute: parseInt(slot.split(':')[1]),
      });
      const isSomeoneUnavailable = people.some((p) => !isAvailable(p, dt));

      if (currentGroup === null) {
        currentGroup = { isAvailable: !isSomeoneUnavailable, slots: [slot] };
      } else if (currentGroup.isAvailable === !isSomeoneUnavailable) {
        currentGroup.slots.push(slot);
      } else {
        grouped.push(currentGroup);
        currentGroup = { isAvailable: !isSomeoneUnavailable, slots: [slot] };
      }
    });

    if (currentGroup) {
      grouped.push(currentGroup);
    }

    return grouped;
  };

  // For the header, we'll use the first day's availability to determine grouping.
  const headerGroups = groupSlotsByAvailability(weekDates[0]);

  return (
    <div className={styles.gridContainer}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `150px ${headerGroups
            .map((g) => (g.isAvailable ? `repeat(${g.slots.length}, 50px)` : '100px'))
            .join(' ')}`,
        }}
      >
        {/* Header Row */}
        <div className={`${styles.header} ${styles.personHeader}`}></div>
        {headerGroups.map((group, groupIndex) => {
          if (!group.isAvailable) {
            const startTime = group.slots[0];
            const lastSlot = group.slots[group.slots.length - 1];
            const endTime = DateTime.fromFormat(lastSlot, 'HH:mm')
              .plus({ minutes: 30 })
              .toFormat('HH:mm');
            return (
              <div
                key={`header-group-${groupIndex}`}
                className={`${styles.header} ${styles.collapsedHeader}`}
              >
                {`${startTime} - ${endTime}`}
              </div>
            );
          }
          return group.slots.map((slot, slotIndex) => (
            <div key={`header-slot-${slotIndex}`} className={styles.header}>
              {slotIndex % 2 === 0 ? slot : ''}
            </div>
          ));
        })}

        {/* Rows for each day */}
        {weekDates.map((date) => {
          const dailyGroups = groupSlotsByAvailability(date);
          return (
            <React.Fragment key={date.toISODate()}>
              <div className={styles.dateHeader}>
                {date.toLocaleString(DateTime.DATE_FULL)}
              </div>

              {people.map((person) => (
                <div key={`${person.id}-${date.toISODate()}`} className={styles.row}>
                  <div className={`${styles.header} ${styles.personHeader}`}>
                    {person.name}
                  </div>
                  {dailyGroups.map((group, groupIndex) => {
                    if (!group.isAvailable) {
                      return (
                        <div
                          key={`cell-group-${groupIndex}`}
                          className={`${styles.cell} ${styles.individualUnavailable} ${styles.collapsedCell}`}
                        />
                      );
                    }
                    return group.slots.map((slot) => {
                      const dt = date.set({
                        hour: parseInt(slot.split(':')[0]),
                        minute: parseInt(slot.split(':')[1]),
                      });
                      const available = isAvailable(person, dt);
                      return (
                        <div
                          key={slot}
                          className={`${styles.cell} ${
                            available
                              ? styles.individualAvailable
                              : styles.individualUnavailable
                          }`}
                          onClick={() => handleCellClick(dt)}
                          title={available ? 'Available' : 'Unavailable'}
                        />
                      );
                    });
                  })}
                </div>
              ))}
            </React.Fragment>
          );
        })}
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
