import React, { useState, useEffect } from 'react';
import styles from './ContactManager.module.css';
import Modal from './Modal/Modal';
import TimeZoneSelect from './TimeZoneSelect';
import AvailabilityInput from './AvailabilityInput';
import { Person, Availability } from '../types/types';

interface ContactManagerProps {
  contacts: Person[];
  onAdd: (contact: Person) => void;
  onUpdate: (contact: Person) => void;
  onDelete: (contactId: string) => void;
}

const ContactForm: React.FC<{
  onSave: (person: Person) => void;
  onCancel: () => void;
  existingContact?: Person | null;
}> = ({ onSave, onCancel, existingContact }) => {
  const [name, setName] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [availability, setAvailability] = useState<Availability>({});

  useEffect(() => {
    if (existingContact) {
      setName(existingContact.name);
      setTimeZone(existingContact.timeZone);
      setAvailability(existingContact.availability);
    } else {
      setName('');
      setTimeZone('');
      setAvailability({});
    }
  }, [existingContact]);

  const handleSave = () => {
    const contactData: Person = {
      id: existingContact ? existingContact.id : Date.now().toString(),
      name,
      timeZone,
      availability,
    };
    onSave(contactData);
  };

  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="Contact Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.formInput}
      />
      <TimeZoneSelect selectedTimeZone={timeZone} onChange={setTimeZone} />
      <AvailabilityInput
        availability={availability}
        onChange={setAvailability}
        title="Set Contact's Availability"
      />
      <div className={styles.formActions}>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
      </div>
    </div>
  );
};

const ContactManager: React.FC<ContactManagerProps> = ({
  contacts,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Person | null>(null);

  const handleOpenModal = (contact?: Person) => {
    setEditingContact(contact || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleSaveContact = (contact: Person) => {
    if (editingContact) {
      onUpdate(contact);
    } else {
      onAdd(contact);
    }
    handleCloseModal();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Contacts</h2>
        <button onClick={() => handleOpenModal()} className={styles.addButton}>
          + Add Contact
        </button>
      </div>
      <div className={styles.contactList}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.contactCard}>
            <div className={styles.contactInfo}>
              <h4>{contact.name}</h4>
              <p>{contact.timeZone.replace(/_/g, ' ')}</p>
            </div>
            <div className={styles.contactActions}>
              <button onClick={() => handleOpenModal(contact)}>Edit</button>
              <button onClick={() => onDelete(contact.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <ContactForm
          onSave={handleSaveContact}
          onCancel={handleCloseModal}
          existingContact={editingContact}
        />
      </Modal>
    </div>
  );
};

export default ContactManager;
