import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventCreate from './components/EventCreate';
import EventDetail from './components/EventDetail';
import Login from './components/Login';
import Register from './components/Register';
import MyEvents from './components/MyEvents';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/create" element={<EventCreate />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-events" element={<MyEvents />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;