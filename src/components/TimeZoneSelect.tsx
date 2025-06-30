import React from 'react';
import { DateTime } from 'luxon';
import styles from './TimeZoneSelect.module.css';

// A more comprehensive list of IANA time zones, grouped by region
const timeZoneGroups = {
  Africa: DateTime.local().setZone('Africa/Abidjan').zone.name,
  America: DateTime.local().setZone('America/New_York').zone.name,
  Asia: DateTime.local().setZone('Asia/Tokyo').zone.name,
  Australia: DateTime.local().setZone('Australia/Sydney').zone.name,
  Europe: DateTime.local().setZone('Europe/London').zone.name,
  UTC: 'UTC',
};

const allTimeZones = Object.entries(timeZoneGroups).flatMap(
  ([group, exampleZone]) => {
    if (group === 'UTC') return { group: 'UTC', zone: 'UTC' };
    const zonesInGroup = Intl.supportedValuesOf('timeZone').filter((tz) =>
      tz.startsWith(group),
    );
    return zonesInGroup.map((zone) => ({ group, zone }));
  },
);

interface TimeZoneSelectProps {
  selectedTimeZone: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

const TimeZoneSelect: React.FC<TimeZoneSelectProps> = ({
  selectedTimeZone,
  onChange,
  label = 'Time Zone',
  id = 'timezone-select',
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        value={selectedTimeZone}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="" disabled>
          Select a time zone...
        </option>
        {allTimeZones.map(({ group, zone }) => (
          <option key={zone} value={zone}>
            {zone.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeZoneSelect;
