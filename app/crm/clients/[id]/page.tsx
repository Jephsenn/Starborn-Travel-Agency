'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  dateOfBirth?: string;
  passportNumber?: string;
  passportExpiry?: string;
  preferences?: string;
  notes?: string;
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
}

interface Trip {
  _id: string;
  tripName: string;
  tripType: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function ClientDetail() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [clientData, setClientData] = useState<Client | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClientData = React.useCallback(async () => {
    try {
      const [clientResult, clientTrips] = await Promise.all([
        client.fetch(`*[_type == "client" && _id == $id][0]`, { id: clientId }),
        client.fetch(`*[_type == "trip" && references($id)] | order(startDate desc)`, { id: clientId }),
      ]);
      setClientData(clientResult);
      setTrips(clientTrips);
    } catch (error) {
      console.error('Error fetching client:', error);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchClientData();
    }
  }, [clientId, fetchClientData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading client details...</p>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Client Not Found</h2>
          <Link href="/crm" className="text-primary hover:underline">
            Return to CRM Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link href="/crm" className="text-primary hover:underline mb-4 inline-block">
            ← Back to CRM Dashboard
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-neutral-800 mb-2">
                {clientData.firstName} {clientData.lastName}
              </h1>
              <p className="text-neutral-600">{clientData.email}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/crm/clients/${clientId}/edit`}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Edit Client
              </Link>
              <Link
                href={`/crm/trips/new?clientId=${clientId}`}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Create Trip
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{clientData.email}</p>
                </div>
                {clientData.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800">{clientData.phone}</p>
                  </div>
                )}
                {clientData.address && (
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-800">
                      {clientData.address.street && <>{clientData.address.street}<br /></>}
                      {clientData.address.city && clientData.address.state && (
                        <>{clientData.address.city}, {clientData.address.state} {clientData.address.zipCode}<br /></>
                      )}
                      {clientData.address.country}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {clientData.passportNumber && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold text-neutral-800 mb-4">Passport Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Passport Number</p>
                    <p className="text-gray-800">{clientData.passportNumber}</p>
                  </div>
                  {clientData.passportExpiry && (
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="text-gray-800">{new Date(clientData.passportExpiry).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {clientData.emergencyContact && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold text-neutral-800 mb-4">Emergency Contact</h2>
                <div className="space-y-3">
                  {clientData.emergencyContact.name && (
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-gray-800">{clientData.emergencyContact.name}</p>
                    </div>
                  )}
                  {clientData.emergencyContact.relationship && (
                    <div>
                      <p className="text-sm text-gray-500">Relationship</p>
                      <p className="text-gray-800">{clientData.emergencyContact.relationship}</p>
                    </div>
                  )}
                  {clientData.emergencyContact.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800">{clientData.emergencyContact.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {clientData.preferences && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-neutral-800 mb-4">Travel Preferences</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{clientData.preferences}</p>
              </div>
            )}
          </div>

          {/* Trips */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-neutral-800">Trips</h2>
                <Link
                  href={`/crm/trips/new?clientId=${clientId}`}
                  className="text-primary hover:underline font-medium"
                >
                  + Add Trip
                </Link>
              </div>

              {trips.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No trips yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new trip.</p>
                  <div className="mt-6">
                    <Link
                      href={`/crm/trips/new?clientId=${clientId}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                    >
                      Create Trip
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <Link
                      key={trip._id}
                      href={`/crm/trips/${trip._id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{trip.tripName}</h3>
                          <p className="text-sm text-gray-600 capitalize mt-1">{trip.tripType} Trip</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            trip.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                            trip.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                            trip.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {trip.status.replace('_', ' ')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {clientData.notes && (
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h2 className="text-xl font-bold text-neutral-800 mb-4">Internal Notes</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{clientData.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
