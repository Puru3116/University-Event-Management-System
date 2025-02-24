import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <div className="event-info">
        <p className="description">{event.description}</p>
        <div className="details">
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Capacity:</strong> {event.capacity} people</p>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;

