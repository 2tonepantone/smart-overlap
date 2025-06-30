import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import TimeZoneSelect from './components/TimeZoneSelect';
import AvailabilityInput from './components/AvailabilityInput';
import ContactManager from './components/ContactManager';
import OverlapGrid from './components/OverlapGrid';
import { loadState, saveState } from './utils/localStorage';
import { Availability, Person, Page } from './types/types';

function App() {
  const [activePage, setActivePage] = useState<Page>('Grid');
  const [myTimeZone, setMyTimeZone] = useState<string>(
    loadState<string>('myTimeZone') || '',
  );
  const [myAvailability, setMyAvailability] = useState<Availability>(
    loadState<Availability>('myAvailability') || {},
  );
  const [contacts, setContacts] = useState<Person[]>(
    loadState<Person[]>('contacts') || [],
  );

  useEffect(() => {
    saveState<string>('myTimeZone', myTimeZone);
  }, [myTimeZone]);

  useEffect(() => {
    saveState<Availability>('myAvailability', myAvailability);
  }, [myAvailability]);

  useEffect(() => {
    saveState<Person[]>('contacts', contacts);
  }, [contacts]);

  const addContact = (contact: Person) => {
    setContacts([...contacts, contact]);
  };

  const updateContact = (updatedContact: Person) => {
    setContacts(
      contacts.map((c: Person) =>
        c.id === updatedContact.id ? updatedContact : c,
      ),
    );
  };

  const deleteContact = (contactId: string) => {
    setContacts(contacts.filter((c: Person) => c.id !== contactId));
  };

  const allPeople: Person[] = [
    {
      id: 'self',
      name: 'Me',
      timeZone: myTimeZone,
      availability: myAvailability,
    },
    ...contacts,
  ];

  const renderPageContent = () => {
    switch (activePage) {
      case 'Grid':
        return <OverlapGrid people={allPeople} />;
      case 'People':
        return (
          <ContactManager
            contacts={contacts}
            onAdd={addContact}
            onUpdate={updateContact}
            onDelete={deleteContact}
          />
        );
      case 'Me':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-lg)',
            }}
          >
            <TimeZoneSelect
              selectedTimeZone={myTimeZone}
              onChange={setMyTimeZone}
              label="My Time Zone"
            />
            <AvailabilityInput
              availability={myAvailability}
              onChange={setMyAvailability}
              title="My Availability"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activePage={activePage} onPageChange={setActivePage}>
      {renderPageContent()}
    </Layout>
  );
}

export default App;
