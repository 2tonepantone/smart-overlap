import React, { useState } from 'react';
import styles from './TimeProposerModal.module.css';
import Modal from './Modal/Modal';
import { DateTime } from 'luxon';
import { Person } from '../types/types';

interface TimeProposerModalProps {
  selectedTime: DateTime | null;
  people: Person[];
  onClose: () => void;
}

const TimeProposerModal: React.FC<TimeProposerModalProps> = ({
  selectedTime,
  people,
  onClose,
}) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');

  if (!selectedTime) {
    return null;
  }

  const getProposalText = () => {
    return people
      .map((person) => {
        const localTime = selectedTime.setZone(person.timeZone);
        return `${person.name}: ${localTime.toLocaleString(DateTime.DATETIME_FULL)}`;
      })
      .join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getProposalText());
    setCopyButtonText('Copied!');
    setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000);
  };

  return (
    <Modal
      isOpen={!!selectedTime}
      onClose={onClose}
      title="Proposed Meeting Time"
    >
      <div className={styles.timeList}>
        {people.map((person) => {
          const localTime = selectedTime.setZone(person.timeZone);
          return (
            <div key={person.id} className={styles.timeEntry}>
              <span className={styles.personName}>{person.name}</span>
              <div className={styles.timeDetails}>
                <div className={styles.localTime}>
                  {localTime.toLocaleString(DateTime.TIME_SIMPLE)}
                </div>
                <div className={styles.timeZone}>
                  {localTime.toLocaleString(DateTime.DATE_SHORT)} (
                  {person.timeZone.replace(/_/g, ' ')})
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.actions}>
        <button onClick={onClose} className={styles.button}>
          Close
        </button>
        <button
          onClick={handleCopy}
          className={`${styles.button} ${styles.copyButton}`}
        >
          {copyButtonText}
        </button>
      </div>
    </Modal>
  );
};

export default TimeProposerModal;
