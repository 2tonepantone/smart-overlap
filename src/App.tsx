
import './index.css';
import TimeZoneSelect from './components/TimeZoneSelect.tsx';
import AvailabilityInput from './components/AvailabilityInput.tsx';
import ContactManager from './components/ContactManager.tsx';
import OverlapGrid from './components/OverlapGrid.tsx';
import { useState, useEffect } from 'react';
import { loadState, saveState } from './utils/localStorage.ts';
import { Availability, Person } from './types/types';

function App() {
  const [myTimeZone, setMyTimeZone] = useState<string>(loadState<string>('myTimeZone') || '');
  const [myAvailability, setMyAvailability] = useState<Availability>(loadState<Availability>('myAvailability') || {});
  const [contacts, setContacts] = useState<Person[]>(loadState<Person[]>('contacts') || []);

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
    setContacts(contacts.map((c: Person) => c.id === updatedContact.id ? updatedContact : c));
  };

  const deleteContact = (contactId: string) => {
    setContacts(contacts.filter((c: Person) => c.id !== contactId));
  };

  const allPeople: Person[] = [
    { id: 'self', name: 'Me', timeZone: myTimeZone, availability: myAvailability },
    ...contacts
  ];

  return (
    <div className="container">
      <header>
        <h1>Smart Overlap Scheduler</h1>
        <p>Find the perfect time across time zones, hassle-free.</p>
      </header>
      <main>
        <div className="config-section">
            <div className="self-config">
                <h2>Your Details</h2>
                <TimeZoneSelect selectedTimeZone={myTimeZone} onChange={e => setMyTimeZone(e.target.value)} />
                <AvailabilityInput availability={myAvailability} onChange={setMyAvailability} />
            </div>
            <ContactManager 
              contacts={contacts} 
              onAdd={addContact} 
              onUpdate={updateContact} 
              onDelete={deleteContact} 
            />
        </div>
        <OverlapGrid people={allPeople} />
      </main>
    </div>
  )
}

export default App
