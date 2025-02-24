import express from 'express';
import { Event } from '../models/Event.js';
import { User } from '../models/User.js';
import { auth, isAdmin } from '../middleware/auth.js';

export const eventRouter = express.Router();

// Get all events (public)
eventRouter.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single event by ID (public)
eventRouter.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create event (admin only)
eventRouter.post('/', auth, isAdmin, async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Register for event (authenticated users)
eventRouter.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is already registered
    if (user.registeredEvents.includes(event._id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }
    
    // Add event to user's registered events
    user.registeredEvents.push(event._id);
    await user.save();
    
    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's registered events
eventRouter.get('/my-events', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('registeredEvents');
    res.json(user.registeredEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});