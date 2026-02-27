'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import dynamic from 'next/dynamic';
import EventFormModal from '@/components/EventFormModal';
import ExcursionFormModal from '@/components/ExcursionFormModal';

const TripCalendar = dynamic(() => import('@/components/TripCalendar'), { ssr: false });
const ItineraryView = dynamic(() => import('@/components/ItineraryView'), { ssr: false });
const ExcursionManager = dynamic(() => import('@/components/ExcursionManager'), { ssr: false });

interface Trip {
  _id: string;
  tripName: string;
  tripType: string;
  startDate: string;
  endDate: string;
  status: string;
  totalCost?: number;
  depositPaid?: number;
  balanceDue?: number;
  paymentDueDate?: string;
  client: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  cruiseDetails?: any;
  disneyDetails?: any;
  destinationDetails?: any;
  customDetails?: any;
  notes?: string;
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
  cost?: number;
  isPaid: boolean;
  isBooked: boolean;
  notes?: string;
}

interface Excursion {
  _id: string;
  port: string;
  date: string;
  excursionName: string;
  excursionCode?: string;
  description?: string;
  duration?: string;
  departureTime?: string;
  returnTime?: string;
  cost?: number;
  numberOfParticipants?: number;
  status: string;
  confirmationNumber?: string;
}

export default function TripDetail() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [events, setEvents] = useState<ItineraryEvent[]>([]);
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'itinerary' | 'excursions'>('overview');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showExcursionModal, setShowExcursionModal] = useState(false);

  const fetchTripData = React.useCallback(async () => {
    try {
      const [tripData, eventsData, excursionsData] = await Promise.all([
        client.fetch(
          `*[_type == "trip" && _id == $id][0] {
            ...,
            "client": client->{_id, firstName, lastName, email}
          }`,
          { id: tripId }
        ),
        client.fetch(
          `*[_type == "itineraryEvent" && references($id)] | order(date asc, startTime asc)`,
          { id: tripId }
        ),
        client.fetch(
          `*[_type == "excursion" && references($id)] | order(date asc)`,
          { id: tripId }
        ),
      ]);
      setTrip(tripData);
      setEvents(eventsData);
      setExcursions(excursionsData);
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      fetchTripData();
    }
  }, [tripId, fetchTripData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trip details...</p>
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

  const getTripDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link href="/crm" className="text-primary hover:underline mb-4 inline-block">
            ← Back to CRM Dashboard
          </Link>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-neutral-800 mb-2">{trip.tripName}</h1>
              <p className="text-neutral-600">
                <Link href={`/crm/clients/${trip.client._id}`} className="hover:underline">
                  {trip.client.firstName} {trip.client.lastName}
                </Link>
                {' • '}
                <span className="capitalize">{trip.tripType}</span>
                {' • '}
                {getTripDuration()}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href={`/studio/structure/trip;${tripId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Edit in Studio
              </a>
              <Link
                href={`/crm/trips/${tripId}/itinerary`}
                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition"
              >
                View Full Itinerary
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                  activeTab === 'calendar'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                  activeTab === 'itinerary'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Itinerary ({events.length})
              </button>
              {trip.tripType === 'cruise' && (
                <button
                  onClick={() => setActiveTab('excursions')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                    activeTab === 'excursions'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Excursions ({excursions.length})
                </button>
              )}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Trip Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Trip Information */}
                  <div>
                    <h2 className="text-xl font-bold text-neutral-800 mb-4">Trip Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="text-gray-800 font-medium">
                          {new Date(trip.startDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="text-gray-800 font-medium">
                          {new Date(trip.endDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-gray-800 font-medium">{getTripDuration()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            trip.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                            trip.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                            trip.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {trip.status?.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Type-Specific Details */}
                  {trip.tripType === 'cruise' && trip.cruiseDetails && (
                    <div>
                      <h2 className="text-xl font-bold text-neutral-800 mb-4">Cruise Details</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {trip.cruiseDetails.cruiseLine && (
                          <div>
                            <p className="text-sm text-gray-500">Cruise Line</p>
                            <p className="text-gray-800">{trip.cruiseDetails.cruiseLine}</p>
                          </div>
                        )}
                        {trip.cruiseDetails.shipName && (
                          <div>
                            <p className="text-sm text-gray-500">Ship Name</p>
                            <p className="text-gray-800">{trip.cruiseDetails.shipName}</p>
                          </div>
                        )}
                        {trip.cruiseDetails.cruiseNumber && (
                          <div>
                            <p className="text-sm text-gray-500">Cruise Number</p>
                            <p className="text-gray-800">{trip.cruiseDetails.cruiseNumber}</p>
                          </div>
                        )}
                        {trip.cruiseDetails.bookingNumber && (
                          <div>
                            <p className="text-sm text-gray-500">Booking Number</p>
                            <p className="text-gray-800">{trip.cruiseDetails.bookingNumber}</p>
                          </div>
                        )}
                        {trip.cruiseDetails.cabinNumber && (
                          <div>
                            <p className="text-sm text-gray-500">Cabin Number</p>
                            <p className="text-gray-800">{trip.cruiseDetails.cabinNumber}</p>
                          </div>
                        )}
                        {trip.cruiseDetails.cabinType && (
                          <div>
                            <p className="text-sm text-gray-500">Cabin Type</p>
                            <p className="text-gray-800">{trip.cruiseDetails.cabinType}</p>
                          </div>
                        )}
                        {trip.cruiseDetails.deckNumber && (
                          <div>
                            <p className="text-sm text-gray-500">Deck Number</p>
                            <p className="text-gray-800">{trip.cruiseDetails.deckNumber}</p>
                          </div>
                        )}
                        {trip.cruiseDetails.diningTime && (
                          <div>
                            <p className="text-sm text-gray-500">Dining Time</p>
                            <p className="text-gray-800">{trip.cruiseDetails.diningTime}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {trip.tripType === 'disney' && trip.disneyDetails && (
                    <div>
                      <h2 className="text-xl font-bold text-neutral-800 mb-4">Disney Details</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {trip.disneyDetails.park && (
                          <div>
                            <p className="text-sm text-gray-500">Park/Location</p>
                            <p className="text-gray-800">{trip.disneyDetails.park}</p>
                          </div>
                        )}
                        {trip.disneyDetails.resortName && (
                          <div>
                            <p className="text-sm text-gray-500">Resort</p>
                            <p className="text-gray-800">{trip.disneyDetails.resortName}</p>
                          </div>
                        )}
                        {trip.disneyDetails.roomType && (
                          <div>
                            <p className="text-sm text-gray-500">Room Type</p>
                            <p className="text-gray-800">{trip.disneyDetails.roomType}</p>
                          </div>
                        )}
                        {trip.disneyDetails.confirmationNumber && (
                          <div>
                            <p className="text-sm text-gray-500">Confirmation Number</p>
                            <p className="text-gray-800">{trip.disneyDetails.confirmationNumber}</p>
                          </div>
                        )}
                        {trip.disneyDetails.diningPlan && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-500">Dining Plan</p>
                            <p className="text-gray-800">{trip.disneyDetails.diningPlan}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {trip.tripType === 'destination' && trip.destinationDetails && (
                    <div>
                      <h2 className="text-xl font-bold text-neutral-800 mb-4">Destination Details</h2>
                      <div className="space-y-4">
                        {trip.destinationDetails.destination && (
                          <div>
                            <p className="text-sm text-gray-500">Destination</p>
                            <p className="text-gray-800 text-lg font-medium">{trip.destinationDetails.destination}</p>
                          </div>
                        )}
                        {trip.destinationDetails.hotelName && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Hotel</p>
                              <p className="text-gray-800">{trip.destinationDetails.hotelName}</p>
                            </div>
                            {trip.destinationDetails.confirmationNumber && (
                              <div>
                                <p className="text-sm text-gray-500">Confirmation Number</p>
                                <p className="text-gray-800">{trip.destinationDetails.confirmationNumber}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {trip.notes && (
                    <div>
                      <h2 className="text-xl font-bold text-neutral-800 mb-4">Trip Notes</h2>
                      <p className="text-gray-700 whitespace-pre-wrap">{trip.notes}</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Financial & Quick Actions */}
                <div className="space-y-6">
                  {/* Financial Information */}
                  {(trip.totalCost || trip.depositPaid || trip.balanceDue) && (
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h2 className="text-xl font-bold text-neutral-800 mb-4">Financial Information</h2>
                      <div className="space-y-3">
                        {trip.totalCost && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Cost</span>
                            <span className="font-bold text-gray-800">${trip.totalCost.toLocaleString()}</span>
                          </div>
                        )}
                        {trip.depositPaid && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Deposit Paid</span>
                            <span className="font-medium text-green-600">${trip.depositPaid.toLocaleString()}</span>
                          </div>
                        )}
                        {trip.balanceDue && (
                          <div className="flex justify-between border-t pt-3">
                            <span className="text-gray-600">Balance Due</span>
                            <span className="font-bold text-red-600">${trip.balanceDue.toLocaleString()}</span>
                          </div>
                        )}
                        {trip.paymentDueDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Due Date</span>
                            <span className="text-gray-700">{new Date(trip.paymentDueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-neutral-800 mb-4">Quick Stats</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Events</span>
                        <span className="font-bold text-gray-800">{events.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booked Events</span>
                        <span className="font-medium text-green-600">
                          {events.filter(e => e.isBooked).length}
                        </span>
                      </div>
                      {trip.tripType === 'cruise' && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Excursions</span>
                          <span className="font-bold text-gray-800">{excursions.length}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-neutral-800 mb-4">Quick Actions</h2>
                    <button
                      onClick={() => setShowEventModal(true)}
                      className="block w-full bg-primary text-white text-center px-4 py-3 rounded-lg hover:bg-primary/90 transition"
                    >
                      Add Event
                    </button>
                    {trip.tripType === 'cruise' && (
                      <button
                        onClick={() => setShowExcursionModal(true)}
                        className="block w-full bg-secondary text-white text-center px-4 py-3 rounded-lg hover:bg-secondary/90 transition"
                      >
                        Add Excursion
                      </button>
                    )}
                    <Link
                      href={`/crm/trips/${tripId}/itinerary`}
                      className="block w-full bg-gray-700 text-white text-center px-4 py-3 rounded-lg hover:bg-gray-600 transition"
                    >
                      View Full Itinerary
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <TripCalendar trip={trip} events={events} excursions={excursions} />
            )}

            {activeTab === 'itinerary' && (
              <ItineraryView trip={trip} events={events} onRefresh={fetchTripData} />
            )}

            {activeTab === 'excursions' && trip.tripType === 'cruise' && (
              <ExcursionManager tripId={tripId} excursions={excursions} onRefresh={fetchTripData} />
            )}
          </div>
        </div>

        {/* Modals */}
        <EventFormModal
          tripId={tripId}
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          onSuccess={fetchTripData}
        />
        <ExcursionFormModal
          tripId={tripId}
          isOpen={showExcursionModal}
          onClose={() => setShowExcursionModal(false)}
          onSuccess={fetchTripData}
        />
      </div>
    </div>
  );
}
