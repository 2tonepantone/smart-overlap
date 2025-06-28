
import React from 'react';
import styles from './TimeProposerModal.module.css';
import { DateTime } from 'luxon';

const TimeProposerModal = ({ selectedTime, people, onClose, onCopy }) => {
  if (!selectedTime) {
    return null;
  }

  const proposalText = people.map(person => {
    const localTime = selectedTime.setZone(person.timeZone);
    return `${person.name}: ${localTime.toLocaleString(DateTime.DATETIME_FULL)}`;
  }).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(proposalText);
    onCopy();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>Proposed Time</h2>
        <pre>{proposalText}</pre>
        <div className={styles.modalActions}>
          <button onClick={handleCopy}>Copy to Clipboard</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TimeProposerModal;

