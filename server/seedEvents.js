import mongoose from 'mongoose';
import { Event } from './models/Event.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');

dotenv.config({ path: envPath });

const defaultEvents = [
  {
    title: "Tech Innovation Summit 2025",
    description: "Join industry leaders for a day of cutting-edge technology discussions and networking opportunities. Featured topics include AI, blockchain, and quantum computing.",
    date: "2025-06-15T09:00:00.000Z",
    location: "Silicon Valley Convention Center",
    capacity: 500
  },
  {
    title: "Global Music Festival",
    description: "Experience three days of incredible live performances from international artists across multiple genres. Food vendors and art installations will create an unforgettable atmosphere.",
    date: "2025-07-20T16:00:00.000Z",
    location: "Central Park Arena",
    capacity: 10000
  },
  {
    title: "Culinary Masterclass Series",
    description: "Learn from world-renowned chefs as they share their secrets and techniques. Includes hands-on cooking sessions and wine pairing workshops.",
    date: "2025-05-10T14:00:00.000Z",
    location: "Metropolitan Cooking School",
    capacity: 100
  },
  {
    title: "Startup Weekend Challenge",
    description: "Turn your idea into a business in 54 hours! Network with entrepreneurs, work with mentors, and pitch to investors.",
    date: "2025-08-05T17:00:00.000Z",
    location: "Innovation Hub",
    capacity: 200
  },
  {
    title: "Wellness & Yoga Retreat",
    description: "A weekend of mindfulness, yoga sessions, meditation workshops, and healthy living discussions led by certified instructors.",
    date: "2025-09-12T08:00:00.000Z",
    location: "Mountain View Resort",
    capacity: 150
  },
  {
    title: "Digital Art Exhibition",
    description: "Explore the intersection of technology and creativity with interactive installations, VR experiences, and digital artwork from emerging artists.",
    date: "2025-04-25T11:00:00.000Z",
    location: "Modern Art Gallery",
    capacity: 300
  },
  {
    title: "Sports & Fitness Expo",
    description: "Discover the latest in sports equipment, nutrition, and training techniques. Meet professional athletes and participate in workshops.",
    date: "2025-10-08T10:00:00.000Z",
    location: "Sports Complex",
    capacity: 1000
  },
  {
    title: "Environmental Sustainability Conference",
    description: "Join environmental experts and activists to discuss climate solutions, renewable energy, and sustainable practices for a better future.",
    date: "2025-11-15T09:00:00.000Z",
    location: "Green Energy Center",
    capacity: 400
  },
  {
    title: "Fashion Week Preview",
    description: "Get an exclusive look at upcoming fashion trends with runway shows, designer meetups, and industry networking opportunities.",
    date: "2025-03-20T18:00:00.000Z",
    location: "Metropolitan Fashion Center",
    capacity: 600
  },
  {
    title: "Gaming & eSports Tournament",
    description: "Compete in various gaming tournaments, try new releases, and watch professional eSports matches live. Prizes and giveaways included!",
    date: "2025-12-01T13:00:00.000Z",
    location: "eSports Arena",
    capacity: 2000
  }
];

async function seedEvents() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert default events
    await Event.insertMany(defaultEvents);
    console.log('Successfully seeded default events');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
}

seedEvents();