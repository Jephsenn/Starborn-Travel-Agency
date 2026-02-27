'use client';

import { useState, useMemo } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';

interface Trip {
  tripName: string;
  startDate: string;
  endDate: string;
}

interface Event {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  location?: string;
  description?: string;
  confirmationNumber?: string;
  cost?: number;
  isPaid: boolean;
  isBooked: boolean;
  notes?: string;
  contactInfo?: {
    name?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
}

interface ItineraryViewProps {
  trip: Trip;
  events: Event[];
  onRefresh: () => void;
}

export default function ItineraryView({ trip, events, onRefresh }: ItineraryViewProps) {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<string>('all');

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const groupedEvents = useMemo(() => {
    const filtered = filterType === 'all' 
      ? events 
      : events.filter(e => e.eventType === filterType);

    const groups: Record<string, Event[]> = {};
    filtered.forEach(event => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
    });

    // Sort events within each day by time
    Object.keys(groups).forEach(date => {
      groups[date].sort((a, b) => {
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;
        if (!a.startTime || !b.startTime) return 0;
        return a.startTime.localeCompare(b.startTime);
      });
    });

    return groups;
  }, [events, filterType]);

  const eventTypes = useMemo(() => {
    const types = new Set(events.map(e => e.eventType));
    return Array.from(types);
  }, [events]);

  const getEventTypeIcon = (eventType: string) => {
    const icons: Record<string, string> = {
      flight: '✈️',
      hotel_checkin: '🏨',
      hotel_checkout: '🚪',
      dining: '🍽️',
      activity: '🎯',
      excursion: '🚢',
      port_day: '⚓',
      sea_day: '🌊',
      park_visit: '🎢',
      transportation: '🚗',
      meeting: '📅',
      free_time: '🌴',
      custom: '📌',
    };
    return icons[eventType] || '📌';
  };

  const getEventTypeColor = (eventType: string) => {
    const colors: Record<string, string> = {
      flight: 'border-blue-500 bg-blue-50',
      hotel_checkin: 'border-green-500 bg-green-50',
      hotel_checkout: 'border-red-500 bg-red-50',
      dining: 'border-purple-500 bg-purple-50',
      activity: 'border-yellow-500 bg-yellow-50',
      excursion: 'border-teal-500 bg-teal-50',
      port_day: 'border-cyan-500 bg-cyan-50',
      sea_day: 'border-indigo-500 bg-indigo-50',
      park_visit: 'border-pink-500 bg-pink-50',
      transportation: 'border-orange-500 bg-orange-50',
      meeting: 'border-gray-500 bg-gray-50',
      free_time: 'border-green-300 bg-green-50',
      custom: 'border-gray-600 bg-gray-50',
    };
    return colors[eventType] || 'border-gray-400 bg-gray-50';
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filterType === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Events ({events.length})
        </button>
        {eventTypes.map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg transition capitalize ${
              filterType === type
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getEventTypeIcon(type)} {type.replace('_', ' ')} ({events.filter(e => e.eventType === type).length})
          </button>
        ))}
      </div>

      {/* Events List */}
      {Object.keys(groupedEvents).length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filterType === 'all' ? 'Get started by adding your first event.' : 'No events of this type found.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedEvents).sort().map((date, dayIndex) => {
            const dayEvents = groupedEvents[date];
            const parsedDate = parseISO(date);
            const tripStart = parseISO(trip.startDate);
            const tripEnd = parseISO(trip.endDate);
            
            // Calculate day number
            let dayNumber = 1;
            let currentDate = new Date(tripStart);
            while (!isSameDay(currentDate, parsedDate) && currentDate <= tripEnd) {
              currentDate.setDate(currentDate.getDate() + 1);
              dayNumber++;
            }

            return (
              <div key={date}>
                <div className="sticky top-0 bg-gray-100 rounded-lg px-4 py-3 mb-4 z-10 shadow-sm">
                  <h3 className="text-lg font-bold text-neutral-800">
                    {format(parsedDate, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <p className="text-sm text-gray-600">Day {dayNumber} • {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</p>
                </div>

                <div className="space-y-3 ml-4">
                  {dayEvents.map((event) => {
                    const isExpanded = expandedEvents.has(event._id);
                    
                    return (
                      <div
                        key={event._id}
                        className={`border-l-4 rounded-lg overflow-hidden transition-all ${getEventTypeColor(event.eventType)}`}
                      >
                        <button
                          onClick={() => toggleEventExpansion(event._id)}
                          className="w-full text-left p-4 hover:bg-white/50 transition"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{getEventTypeIcon(event.eventType)}</span>
                                <div>
                                  <h4 className="font-bold text-gray-800">{event.title}</h4>
                                  <p className="text-sm text-gray-600 capitalize">{event.eventType.replace('_', ' ')}</p>
                                </div>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                                {event.allDay ? (
                                  <span>All Day</span>
                                ) : (
                                  <>
                                    {event.startTime && <span>🕐 {event.startTime}</span>}
                                    {event.endTime && <span>→ {event.endTime}</span>}
                                  </>
                                )}
                                {event.location && <span>📍 {event.location}</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {event.isBooked && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  Booked
                                </span>
                              )}
                              {event.isPaid && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                  Paid
                                </span>
                              )}
                              <svg
                                className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 bg-white border-t space-y-3">
                            {event.description && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Description</p>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">{event.description}</p>
                              </div>
                            )}
                            
                            {event.confirmationNumber && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Confirmation Number</p>
                                <p className="text-sm text-gray-600 font-mono">{event.confirmationNumber}</p>
                              </div>
                            )}

                            {event.cost && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Cost</p>
                                <p className="text-sm text-gray-600">${event.cost.toLocaleString()}</p>
                              </div>
                            )}

                            {event.contactInfo && (event.contactInfo.name || event.contactInfo.phone || event.contactInfo.email) && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Contact Information</p>
                                <div className="text-sm text-gray-600 space-y-1">
                                  {event.contactInfo.name && <p>👤 {event.contactInfo.name}</p>}
                                  {event.contactInfo.phone && <p>📞 {event.contactInfo.phone}</p>}
                                  {event.contactInfo.email && <p>📧 {event.contactInfo.email}</p>}
                                  {event.contactInfo.website && (
                                    <p>🌐 <a href={event.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{event.contactInfo.website}</a></p>
                                  )}
                                </div>
                              </div>
                            )}

                            {event.notes && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Notes</p>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">{event.notes}</p>
                              </div>
                            )}

                            <div className="pt-2 border-t flex gap-2">
                              <a
                                href={`/studio/structure/itineraryEvent;${event._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                Edit in Studio
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
