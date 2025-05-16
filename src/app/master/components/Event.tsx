import { useState } from "react";
import { Calendar, Clock, MapPin, User, Award, Info } from "lucide-react";

const eventsData = [
  {
    id: 1,
    name: "Tech Fest 2025",
    date: "2025-04-15",
    time: "09:00 AM - 05:00 PM",
    venue: "Auditorium Hall",
    description: "A technical fest with various competitions, workshops, and guest lectures.",
    guest: { name: "Dr. A. P. Sharma", designation: "AI & Robotics Expert" },
    reason: "To encourage students in technical advancements and innovation.",
    category: "technology",
    registrationOpen: true
  },
  {
    id: 2,
    name: "Sports Meet",
    date: "2025-05-10",
    time: "08:00 AM - 06:00 PM",
    venue: "Main Stadium",
    description: "Annual sports meet with various track and field events.",
    guest: { name: "Ms. P. V. Sindhu", designation: "Olympic Badminton Champion" },
    reason: "To promote physical fitness and sportsmanship among students.",
    category: "sports",
    registrationOpen: true
  },
  {
    id: 3,
    name: "Cultural Night",
    date: "2025-06-01",
    time: "06:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    description: "An evening filled with music, dance, and drama performances by students.",
    guest: { name: "Mr. A. R. Rahman", designation: "Music Composer & Director" },
    reason: "To celebrate cultural diversity and artistic talents of students.",
    category: "cultural",
    registrationOpen: false
  },
];

const EventModule = () => {
  const [events] = useState(eventsData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [highlightedEvent, setHighlightedEvent] = useState(null);

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Filter events by category
  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(event => event.category === activeFilter);

  // Get background gradient based on category
  const getCategoryStyle = (category) => {
    switch(category) {
      case "technology":
        return "bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500";
      case "sports":
        return "bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500";
      case "cultural":
        return "bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500";
      default:
        return "bg-gradient-to-br from-gray-50 to-slate-50 border-l-4 border-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with title and description */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Upcoming Events</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Join us for these exciting opportunities to learn, connect, and grow together
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "all" 
                ? "bg-gray-800 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border border-gray-300 shadow-sm`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveFilter("technology")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "technology" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border border-gray-300 shadow-sm`}
          >
            Technology
          </button>
          <button
            onClick={() => setActiveFilter("sports")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "sports" 
                ? "bg-green-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border border-gray-300 shadow-sm`}
          >
            Sports
          </button>
          <button
            onClick={() => setActiveFilter("cultural")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "cultural" 
                ? "bg-purple-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border border-gray-300 shadow-sm`}
          >
            Cultural
          </button>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${getCategoryStyle(event.category)}`}
              onMouseEnter={() => setHighlightedEvent(event.id)}
              onMouseLeave={() => setHighlightedEvent(null)}
            >
              {/* Event Header */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
                  {event.registrationOpen && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Registration Open
                    </span>
                  )}
                </div>
                
                {/* Event Details with Icons */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="mt-4 text-gray-700">{event.description}</p>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200"></div>
              
              {/* Guest Info */}
              {event.guest && (
                <div className="p-6 pt-4">
                  <div className="flex items-start">
                    <User className="w-5 h-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Guest Speaker</h4>
                      <p className="text-gray-700 font-medium">{event.guest.name}</p>
                      <p className="text-gray-600 text-sm">{event.guest.designation}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reason/Purpose */}
              {event.reason && (
                <div className={`p-6 pt-2 ${event.guest ? "" : "pt-4"}`}>
                  <div className="flex items-start">
                    <Award className="w-5 h-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Purpose</h4>
                      <p className="text-gray-700">{event.reason}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Button */}
              <div className="p-4 bg-white">
                <button 
                  className={`w-full py-2 rounded-md font-medium transition-colors ${
                    event.registrationOpen 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!event.registrationOpen}
                >
                  {event.registrationOpen ? "Register Now" : "Registration Closed"}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Info className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-800">No events found</h3>
            <p className="mt-2 text-gray-600">Try selecting a different category or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModule;