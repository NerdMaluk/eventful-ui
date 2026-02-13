import { useEffect, useState } from 'react';
import { getEvents } from '../api/events.api';
import type { Event } from '../types/event';
import EventCard from '../components/EventCard';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="container">
      <h2>Upcoming Events</h2>
        {loading ? <p>Loading...</p> : events.map(e => <EventCard key={e.id} event={e} />)}
    </div>
  );
}

