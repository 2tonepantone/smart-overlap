
import React, { useState } from 'react';
import styles from './ContactManager.module.css';
import TimeZoneSelect from './TimeZoneSelect';
import AvailabilityInput from './AvailabilityInput';

const ContactManager = ({ contacts, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [name, setName] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [availability, setAvailability] = useState({});

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingContact(null);
    setName('');
    setTimeZone('');
    setAvailability({});
  };

  const handleSave = () => {
    if (editingContact) {
      onUpdate({ ...editingContact, name, timeZone, availability });
    } else {
      onAdd({ id: Date.now(), name, timeZone, availability });
    }
    handleCancel();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setTimeZone(contact.timeZone);
    setAvailability(contact.availability);
    setIsAdding(true);
  }

  return (
    <div className={styles.contactManager}>
      <h2>Your Contacts</h2>
      {isAdding || editingContact ? (
        <div className={styles.addContactForm}>
          <input
            type="text"
            placeholder="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TimeZoneSelect selectedTimeZone={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
          <AvailabilityInput availability={availability} onChange={setAvailability} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleAddClick}>Add Contact</button>
      )}

      <div className={styles.contactList}>
        {contacts.map(contact => (
          <div key={contact.id} className={styles.contactCard}>
            <h3>{contact.name}</h3>
            <p>Time Zone: {contact.timeZone}</p>
            <button onClick={() => handleEdit(contact)}>Edit</button>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactManager;
