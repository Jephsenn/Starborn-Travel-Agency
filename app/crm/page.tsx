'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import CRMSearch from '@/components/CRMSearch';

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface Trip {
  _id: string;
  tripName: string;
  tripType: string;
  startDate: string;
  endDate: string;
  status: string;
  client: {
    firstName: string;
    lastName: string;
  };
}

export default function CRMDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'clients' | 'trips'>('clients');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientsData, tripsData] = await Promise.all([
        client.fetch(`*[_type == "client"] | order(lastName asc) {
          _id,
          firstName,
          lastName,
          email,
          phone
        }`),
        client.fetch(`*[_type == "trip"] | order(startDate desc) {
          _id,
          tripName,
          tripType,
          startDate,
          endDate,
          status,
          "client": client->{firstName, lastName}
        }[0...10]`),
      ]);
      setClients(clientsData);
      setTrips(tripsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 mb-2">Travel CRM</h1>
          <p className="text-neutral-600">Manage your clients and their trips</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl">
          <CRMSearch />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
            <p className="text-3xl font-bold text-primary mt-2">{clients.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Active Trips</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {trips.filter(t => ['planning', 'booked', 'confirmed'].includes(t.status)).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">Upcoming Trips</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {trips.filter(t => new Date(t.startDate) > new Date()).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {trips.filter(t => t.status === 'in_progress').length}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/crm/clients/new"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Client
            </Link>
            <Link
              href="/crm/trips/new"
              className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Trip
            </Link>
            <a
              href="/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open Sanity Studio
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('clients')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                  activeTab === 'clients'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Clients ({clients.length})
              </button>
              <button
                onClick={() => setActiveTab('trips')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                  activeTab === 'trips'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Recent Trips ({trips.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'clients' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {client.firstName} {client.lastName}
                        </td>
                        <td className="py-3 px-4">{client.email}</td>
                        <td className="py-3 px-4">{client.phone || '—'}</td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/crm/clients/${client._id}`}
                            className="text-primary hover:text-primary/80 font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {clients.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500">
                          No clients yet. Add your first client to get started!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Trip Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Dates</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.map((trip) => (
                      <tr key={trip._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{trip.tripName}</td>
                        <td className="py-3 px-4">
                          {trip.client?.firstName} {trip.client?.lastName}
                        </td>
                        <td className="py-3 px-4 capitalize">{trip.tripType}</td>
                        <td className="py-3 px-4">
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            trip.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                            trip.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                            trip.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {trip.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/crm/trips/${trip._id}`}
                            className="text-primary hover:text-primary/80 font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {trips.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          No trips yet. Create your first trip to get started!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
