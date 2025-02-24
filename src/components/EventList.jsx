import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterCapacity, setFilterCapacity] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredAndSortedEvents = events
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterCapacity === 'all') return matchesSearch;
      if (filterCapacity === 'small') return matchesSearch && event.capacity <= 200;
      if (filterCapacity === 'medium') return matchesSearch && event.capacity > 200 && event.capacity <= 1000;
      if (filterCapacity === 'large') return matchesSearch && event.capacity > 1000;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'capacity') return b.capacity - a.capacity;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-options">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="capacity">Sort by Capacity</option>
            <option value="title">Sort by Title</option>
          </select>
          
          <select value={filterCapacity} onChange={(e) => setFilterCapacity(e.target.value)}>
            <option value="all">All Capacities</option>
            <option value="small">Small Events (≤ 200)</option>
            <option value="medium">Medium Events (201-1000)</option>
            <option value="large">Large Events (> 1000)</option>
          </select>
        </div>
      </div>

      <div className="events-grid">
        {filteredAndSortedEvents.map((event) => (
          <div key={event._id} className="event-card">
            <div className="event-date-badge">
              {new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <h3>{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <div className="event-details">
              <p>
                <i className="far fa-calendar"></i>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {event.location}
              </p>
              <p>
                <i className="fas fa-users"></i>
                {event.capacity} attendees
              </p>
            </div>
            <Link to={`/event/${event._id}`} className="view-details-btn">
              View Details →
            </Link>
          </div>
        ))}
      </div>
      
      {filteredAndSortedEvents.length === 0 && (
        <div className="no-events">
          <p>No events found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default EventList;