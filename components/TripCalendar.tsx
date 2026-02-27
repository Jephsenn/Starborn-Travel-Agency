'use client';

import { useState, useMemo } from 'react';
import { format, eachDayOfInterval, isSameDay, parseISO, addDays } from 'date-fns';

interface Trip {
  startDate: string;
  endDate: string;
  tripType: string;
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
  isBooked: boolean;
}

interface Excursion {
  _id: string;
  port: string;
  date: string;
  excursionName: string;
  status: string;
}

interface TripCalendarProps {
  trip: Trip;
  events: Event[];
  excursions: Excursion[];
}

export default function TripCalendar({ trip, events, excursions }: TripCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const days = useMemo(() => {
    const start = parseISO(trip.startDate);
    const end = parseISO(trip.endDate);
    return eachDayOfInterval({ start, end });
  }, [trip.startDate, trip.endDate]);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const getExcursionsForDate = (date: Date) => {
    return excursions.filter(exc => isSameDay(parseISO(exc.date), date));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const selectedDateExcursions = selectedDate ? getExcursionsForDate(selectedDate) : [];

  const getEventTypeColor = (eventType: string) => {
    const colors: Record<string, string> = {
      flight: 'bg-blue-500',
      hotel_checkin: 'bg-green-500',
      hotel_checkout: 'bg-red-500',
      dining: 'bg-purple-500',
      activity: 'bg-yellow-500',
      excursion: 'bg-teal-500',
      port_day: 'bg-cyan-500',
      sea_day: 'bg-indigo-500',
      park_visit: 'bg-pink-500',
      transportation: 'bg-orange-500',
      meeting: 'bg-gray-500',
      free_time: 'bg-green-300',
      custom: 'bg-gray-600',
    };
    return colors[eventType] || 'bg-gray-400';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Grid */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">Trip Calendar</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Add empty cells for alignment */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: days[0].getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const dayExcursions = getExcursionsForDate(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square p-2 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-md'
                      : isToday
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-sm font-medium ${isToday ? 'text-secondary' : 'text-gray-700'}`}>
                        {format(day, 'd')}
                      </span>
                      <span className="text-xs text-gray-500">
                        Day {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event._id}
                          className={`text-xs px-1 py-0.5 rounded text-white truncate ${getEventTypeColor(event.eventType)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {trip.tripType === 'cruise' && dayExcursions.length > 0 && (
                        <div className="text-xs px-1 py-0.5 rounded bg-teal-500 text-white truncate">
                          {dayExcursions.length} excursion{dayExcursions.length > 1 ? 's' : ''}
                        </div>
                      )}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Event Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { type: 'flight', label: 'Flight' },
              { type: 'hotel_checkin', label: 'Check-in' },
              { type: 'hotel_checkout', label: 'Check-out' },
              { type: 'dining', label: 'Dining' },
              { type: 'activity', label: 'Activity' },
              { type: 'excursion', label: 'Excursion' },
              { type: 'port_day', label: 'Port Day' },
              { type: 'sea_day', label: 'Sea Day' },
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${getEventTypeColor(type)}`}></div>
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day Details */}
      <div className="lg:col-span-1">
        {selectedDate ? (
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Day {days.findIndex(d => isSameDay(d, selectedDate)) + 1} of {days.length}
            </p>

            {selectedDateEvents.length === 0 && selectedDateExcursions.length === 0 ? (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No events scheduled</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateEvents.map(event => (
                  <div key={event._id} className="border-l-4 pl-3 py-2" style={{ borderColor: getEventTypeColor(event.eventType).replace('bg-', '#') }}>
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      {event.isBooked && (
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 capitalize">{event.eventType.replace('_', ' ')}</p>
                    {(event.startTime || event.endTime) && (
                      <p className="text-sm text-gray-600 mt-1">
                        {event.startTime} {event.endTime && `- ${event.endTime}`}
                      </p>
                    )}
                    {event.location && (
                      <p className="text-sm text-gray-600 mt-1">
                        📍 {event.location}
                      </p>
                    )}
                  </div>
                ))}

                {selectedDateExcursions.length > 0 && (
                  <>
                    <div className="border-t pt-3 mt-3">
                      <h4 className="font-semibold text-gray-700 mb-2">Excursions</h4>
                    </div>
                    {selectedDateExcursions.map(exc => (
                      <div key={exc._id} className="border-l-4 border-teal-500 pl-3 py-2">
                        <h4 className="font-medium text-gray-800">{exc.excursionName}</h4>
                        <p className="text-sm text-gray-600">📍 {exc.port}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                          exc.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          exc.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                          exc.status === 'considering' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {exc.status}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Select a day to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
