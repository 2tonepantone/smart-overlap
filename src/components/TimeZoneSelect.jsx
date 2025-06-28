
import React from 'react';
import styles from './TimeZoneSelect.module.css';

const timeZones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const TimeZoneSelect = ({ selectedTimeZone, onChange }) => {
  return (
    <select value={selectedTimeZone} onChange={onChange} className={styles.timeZoneSelect}>
      <option value="" disabled>Select your time zone</option>
      {timeZones.map(tz => (
        <option key={tz} value={tz}>{tz}</option>
      ))}
    </select>
  );
};

export default TimeZoneSelect;
