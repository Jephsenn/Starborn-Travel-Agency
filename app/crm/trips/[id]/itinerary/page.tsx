'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { client } from '@/sanity/lib/client';
import { format, parseISO, isSameDay, eachDayOfInterval } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Trip {
  _id: string;
  tripName: string;
  tripType: string;
  startDate: string;
  endDate: string;
  client: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  cruiseDetails?: any;
  disneyDetails?: any;
  destinationDetails?: any;
}

interface ItineraryEvent {
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
  notes?: string;
}

interface Excursion {
  _id: string;
  port: string;
  date: string;
  excursionName: string;
  status: string;
  departureTime?: string;
  duration?: string;
}

export default function ItineraryPage() {
  const params = useParams();
  const tripId = params.id as string;
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [events, setEvents] = useState<ItineraryEvent[]>([]);
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const itineraryRef = useRef<HTMLDivElement>(null);

  const fetchData = React.useCallback(async () => {
    try {
      const [tripData, eventsData, excursionsData] = await Promise.all([
        client.fetch(
          `*[_type == "trip" && _id == $id][0] {
            ...,
            "client": client->{firstName, lastName, email, phone}
          }`,
          { id: tripId }
        ),
        client.fetch(
          `*[_type == "itineraryEvent" && references($id)] | order(date asc, startTime asc)`,
          { id: tripId }
        ),
        client.fetch(
          `*[_type == "excursion" && references($id) && status in ["booked", "confirmed"]] | order(date asc)`,
          { id: tripId }
        ),
      ]);
      setTrip(tripData);
      setEvents(eventsData);
      setExcursions(excursionsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      fetchData();
    }
  }, [tripId, fetchData]);

  const exportToPDF = async () => {
    if (!itineraryRef.current || !trip) return;

    setExporting(true);
    try {
      const element = itineraryRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // If content is too long, split into multiple pages
      const pageHeight = imgHeight * ratio;
      let heightLeft = pageHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, pageHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, pageHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${trip.tripName.replace(/[^a-z0-9]/gi, '_')}_Itinerary.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const exportToImage = async () => {
    if (!itineraryRef.current || !trip) return;

    setExporting(true);
    try {
      const element = itineraryRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${trip.tripName.replace(/[^a-z0-9]/gi, '_')}_Itinerary.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
        setExporting(false);
      });
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Failed to export image. Please try again.');
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
          <Link href="/crm" className="text-primary hover:underline">
            Return to CRM Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const days = eachDayOfInterval({
    start: parseISO(trip.startDate),
    end: parseISO(trip.endDate),
  });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const getExcursionsForDate = (date: Date) => {
    return excursions.filter(exc => isSameDay(parseISO(exc.date), date));
  };

  const getEventIcon = (eventType: string) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center gap-4 flex-wrap bg-white rounded-lg shadow p-4 print:hidden">
          <Link href={`/crm/trips/${tripId}`} className="text-primary hover:underline">
            ← Back to Trip Details
          </Link>
          <div className="flex gap-2">
            <button
              onClick={exportToPDF}
              disabled={exporting}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export PDF
                </>
              )}
            </button>
            <button
              onClick={exportToImage}
              disabled={exporting}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Export Image
                </>
              )}
            </button>
          </div>
        </div>

        {/* Itinerary Content */}
        <div ref={itineraryRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8">
            <h1 className="text-4xl font-bold mb-2">{trip.tripName}</h1>
            <p className="text-xl opacity-90 mb-4">
              {trip.client.firstName} {trip.client.lastName}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>📅 {format(parseISO(trip.startDate), 'MMMM d')} - {format(parseISO(trip.endDate), 'MMMM d, yyyy')}</span>
              <span>🧳 {days.length} {days.length === 1 ? 'Day' : 'Days'}</span>
              <span className="capitalize">✨ {trip.tripType} Trip</span>
            </div>
          </div>

          {/* Trip Details Summary */}
          <div className="border-b border-gray-200 p-6 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Trip Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Traveler</p>
                <p className="font-medium">{trip.client.firstName} {trip.client.lastName}</p>
                {trip.client.email && <p className="text-gray-600">{trip.client.email}</p>}
                {trip.client.phone && <p className="text-gray-600">{trip.client.phone}</p>}
              </div>
              
              {trip.tripType === 'cruise' && trip.cruiseDetails && (
                <div>
                  <p className="text-gray-600">Cruise Details</p>
                  {trip.cruiseDetails.cruiseLine && <p className="font-medium">{trip.cruiseDetails.cruiseLine}</p>}
                  {trip.cruiseDetails.shipName && <p>{trip.cruiseDetails.shipName}</p>}
                  {trip.cruiseDetails.cabinNumber && <p>Cabin: {trip.cruiseDetails.cabinNumber}</p>}
                  {trip.cruiseDetails.bookingNumber && <p className="text-xs text-gray-600">Booking #{trip.cruiseDetails.bookingNumber}</p>}
                </div>
              )}

              {trip.tripType === 'disney' && trip.disneyDetails && (
                <div>
                  <p className="text-gray-600">Disney Details</p>
                  {trip.disneyDetails.resortName && <p className="font-medium">{trip.disneyDetails.resortName}</p>}
                  {trip.disneyDetails.confirmationNumber && <p className="text-xs text-gray-600">Confirmation #{trip.disneyDetails.confirmationNumber}</p>}
                </div>
              )}

              {trip.tripType === 'destination' && trip.destinationDetails && (
                <div>
                  <p className="text-gray-600">Destination</p>
                  {trip.destinationDetails.destination && <p className="font-medium">{trip.destinationDetails.destination}</p>}
                  {trip.destinationDetails.hotelName && <p>{trip.destinationDetails.hotelName}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Daily Itinerary */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Itinerary</h2>
            <div className="space-y-6">
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const dayExcursions = getExcursionsForDate(day);
                const hasActivities = dayEvents.length > 0 || dayExcursions.length > 0;

                return (
                  <div key={day.toISOString()} className="border-l-4 border-primary pl-6 pb-6 relative">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-800">
                        {format(day, 'EEEE, MMMM d, yyyy')}
                      </h3>
                      <p className="text-sm text-gray-600">Day {index + 1} of {days.length}</p>
                    </div>

                    {!hasActivities ? (
                      <p className="text-gray-500 italic">No scheduled activities</p>
                    ) : (
                      <div className="space-y-3">
                        {dayEvents.map(event => (
                          <div key={event._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl flex-shrink-0">{getEventIcon(event.eventType)}</span>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-800">{event.title}</h4>
                                <p className="text-sm text-gray-600 capitalize">{event.eventType.replace('_', ' ')}</p>
                                
                                {(event.startTime || event.endTime) && (
                                  <p className="text-sm text-gray-700 mt-1">
                                    ⏰ {event.allDay ? 'All Day' : `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ''}`}
                                  </p>
                                )}
                                
                                {event.location && (
                                  <p className="text-sm text-gray-700 mt-1">📍 {event.location}</p>
                                )}
                                
                                {event.description && (
                                  <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                                )}
                                
                                {event.confirmationNumber && (
                                  <p className="text-xs text-gray-500 mt-2 font-mono">
                                    Confirmation: {event.confirmationNumber}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {dayExcursions.map(excursion => (
                          <div key={excursion._id} className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl flex-shrink-0">🚢</span>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{excursion.excursionName}</h4>
                                <p className="text-sm text-gray-600">Shore Excursion</p>
                                <p className="text-sm text-gray-700 mt-1">📍 {excursion.port}</p>
                                {excursion.departureTime && (
                                  <p className="text-sm text-gray-700">⏰ Departs {excursion.departureTime}</p>
                                )}
                                {excursion.duration && (
                                  <p className="text-sm text-gray-700">⏱️ Duration: {excursion.duration}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 text-center text-sm text-gray-600">
            <p>Itinerary prepared by Starborn Travel Agency</p>
            <p className="text-xs mt-1">Generated on {format(new Date(), 'MMMM d, yyyy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
