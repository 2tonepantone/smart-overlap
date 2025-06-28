
import './index.css';
import TimeZoneSelect from './components/TimeZoneSelect';
import AvailabilityInput from './components/AvailabilityInput';
import ContactManager from './components/ContactManager';
import OverlapGrid from './components/OverlapGrid';
import { useState, useEffect } from 'react';
import { loadState, saveState } from './utils/localStorage';

function App() {
  const [myTimeZone, setMyTimeZone] = useState(loadState('myTimeZone') || '');
  const [myAvailability, setMyAvailability] = useState(loadState('myAvailability') || {});
  const [contacts, setContacts] = useState(loadState('contacts') || []);

  useEffect(() => {
    saveState('myTimeZone', myTimeZone);
  }, [myTimeZone]);

  useEffect(() => {
    saveState('myAvailability', myAvailability);
  }, [myAvailability]);

  useEffect(() => {
    saveState('contacts', contacts);
  }, [contacts]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const updateContact = (updatedContact) => {
    setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(c => c.id !== contactId));
  };

  const allPeople = [
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
