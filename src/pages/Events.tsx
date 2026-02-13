import { useEffect, useState } from 'react';
import { getEvents } from '../api/events.api';
import type { Event } from '../types/event';
import EventCard from '../components/EventCard';
import './Events.css';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>

      {events.length === 0 && <p>No events available.</p>}

      <div className="events-grid">
        {events.map(e => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}





