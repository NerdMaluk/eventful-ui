import { useState } from 'react';
import { createEvent as createEventApi } from '../api/events.api';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0); 


  const submit = async () => {
    if (!title || !description || !location || !date) {
      setError('All fields are required.');
      return;
    }

    try {
      await createEventApi({ title, description, location, date, capacity, price });
      navigate('/events');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        <h2>Create Event</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <input
          type= "datetime-local"
          placeholder="Date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
         
        <input type="number" placeholder="Capacity"
         value={capacity} 
         onChange={e => setCapacity(parseInt(e.target.value))} />

        <input type="number" placeholder="Price"
         value={price}
         onChange={e => setPrice(parseInt(e.target.value))} />

        <button onClick={submit}>Create Event</button>
      </div>
    </div>
  );
}

