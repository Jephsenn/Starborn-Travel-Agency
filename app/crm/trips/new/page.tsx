'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function NewTripPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClientId = searchParams.get('clientId');
  
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [tripType, setTripType] = useState<'cruise' | 'disney' | 'destination' | 'custom'>('cruise');
  
  const [formData, setFormData] = useState({
    tripName: '',
    clientId: preselectedClientId || '',
    tripType: 'cruise',
    startDate: '',
    endDate: '',
    status: 'planning',
    totalCost: '',
    depositPaid: '',
    balanceDue: '',
    paymentDueDate: '',
    // Cruise fields
    cruiseLine: '',
    shipName: '',
    cruiseNumber: '',
    bookingNumber: '',
    cabinNumber: '',
    cabinType: '',
    deckNumber: '',
    diningTime: '',
    tableNumber: '',
    // Disney fields
    disneyPark: '',
    resortName: '',
    roomType: '',
    confirmationNumber: '',
    diningPlan: '',
    // Destination fields
    destination: '',
    hotelName: '',
    hotelAddress: '',
    // Custom fields
    customDescription: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await (client.fetch as any)(
        `*[_type == "client"] | order(lastName asc) { _id, firstName, lastName }`
      );
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoadingClients(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const baseTrip: any = {
        _type: 'trip',
        tripName: formData.tripName,
        client: { _type: 'reference', _ref: formData.clientId },
        tripType: formData.tripType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
      };

      if (formData.totalCost) baseTrip.totalCost = parseFloat(formData.totalCost);
      if (formData.depositPaid) baseTrip.depositPaid = parseFloat(formData.depositPaid);
      if (formData.balanceDue) baseTrip.balanceDue = parseFloat(formData.balanceDue);
      if (formData.paymentDueDate) baseTrip.paymentDueDate = formData.paymentDueDate;

      // Add type-specific fields
      if (formData.tripType === 'cruise') {
        baseTrip.cruiseDetails = {
          cruiseLine: formData.cruiseLine,
          shipName: formData.shipName,
          cruiseNumber: formData.cruiseNumber,
          bookingNumber: formData.bookingNumber,
          cabinNumber: formData.cabinNumber,
          cabinType: formData.cabinType,
          deckNumber: formData.deckNumber,
          diningTime: formData.diningTime,
          tableNumber: formData.tableNumber,
        };
      } else if (formData.tripType === 'disney') {
        baseTrip.disneyDetails = {
          park: formData.disneyPark,
          resortName: formData.resortName,
          roomType: formData.roomType,
          confirmationNumber: formData.confirmationNumber,
          diningPlan: formData.diningPlan,
        };
      } else if (formData.tripType === 'destination') {
        baseTrip.destinationDetails = {
          destination: formData.destination,
          hotelName: formData.hotelName,
          hotelAddress: formData.hotelAddress,
          confirmationNumber: formData.confirmationNumber,
          roomType: formData.roomType,
        };
      } else if (formData.tripType === 'custom') {
        baseTrip.customDetails = {
          description: formData.customDescription,
        };
      }

      const newTrip = await client.create(baseTrip);
      router.push(`/crm/trips/${newTrip._id}`);
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Failed to create trip. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTripTypeChange = (newType: 'cruise' | 'disney' | 'destination' | 'custom') => {
    setTripType(newType);
    updateField('tripType', newType);
  };

  if (loadingClients) {
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
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-primary/80 flex items-center gap-2 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-4xl font-bold text-neutral-800">New Trip</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.tripName}
                  onChange={(e) => updateField('tripName', e.target.value)}
                  placeholder="e.g., Smith Family Caribbean Cruise 2026"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => updateField('clientId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a client...</option>
                  {clients.map(client => (
                    <option key={client._id} value={client._id}>
                      {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['cruise', 'disney', 'destination', 'custom'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleTripTypeChange(type)}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition ${
                        formData.tripType === type
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-primary'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => updateField('endDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="planning">Planning</option>
                  <option value="booked">Booked</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Cost</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.totalCost}
                  onChange={(e) => updateField('totalCost', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Paid</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.depositPaid}
                  onChange={(e) => updateField('depositPaid', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Balance Due</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.balanceDue}
                  onChange={(e) => updateField('balanceDue', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Due Date</label>
                <input
                  type="date"
                  value={formData.paymentDueDate}
                  onChange={(e) => updateField('paymentDueDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Cruise-Specific Fields */}
          {formData.tripType === 'cruise' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Cruise Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cruise Line</label>
                  <input
                    type="text"
                    value={formData.cruiseLine}
                    onChange={(e) => updateField('cruiseLine', e.target.value)}
                    placeholder="e.g., Royal Caribbean"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ship Name</label>
                  <input
                    type="text"
                    value={formData.shipName}
                    onChange={(e) => updateField('shipName', e.target.value)}
                    placeholder="e.g., Symphony of the Seas"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cruise Number</label>
                  <input
                    type="text"
                    value={formData.cruiseNumber}
                    onChange={(e) => updateField('cruiseNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking Number</label>
                  <input
                    type="text"
                    value={formData.bookingNumber}
                    onChange={(e) => updateField('bookingNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Number</label>
                  <input
                    type="text"
                    value={formData.cabinNumber}
                    onChange={(e) => updateField('cabinNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Type</label>
                  <input
                    type="text"
                    value={formData.cabinType}
                    onChange={(e) => updateField('cabinType', e.target.value)}
                    placeholder="e.g., Balcony"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deck Number</label>
                  <input
                    type="text"
                    value={formData.deckNumber}
                    onChange={(e) => updateField('deckNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dining Time</label>
                  <input
                    type="text"
                    value={formData.diningTime}
                    onChange={(e) => updateField('diningTime', e.target.value)}
                    placeholder="e.g., Early Seating - 6:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
                  <input
                    type="text"
                    value={formData.tableNumber}
                    onChange={(e) => updateField('tableNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Disney-Specific Fields */}
          {formData.tripType === 'disney' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Disney Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Park/Location</label>
                  <select
                    value={formData.disneyPark}
                    onChange={(e) => updateField('disneyPark', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select park...</option>
                    <option value="wdw">Walt Disney World</option>
                    <option value="disneyland">Disneyland</option>
                    <option value="dcl">Disney Cruise Line</option>
                    <option value="aulani">Aulani</option>
                    <option value="abd">Adventures by Disney</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resort Name</label>
                  <input
                    type="text"
                    value={formData.resortName}
                    onChange={(e) => updateField('resortName', e.target.value)}
                    placeholder="e.g., Contemporary Resort"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <input
                    type="text"
                    value={formData.roomType}
                    onChange={(e) => updateField('roomType', e.target.value)}
                    placeholder="e.g., Deluxe Studio"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Number</label>
                  <input
                    type="text"
                    value={formData.confirmationNumber}
                    onChange={(e) => updateField('confirmationNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dining Plan</label>
                  <input
                    type="text"
                    value={formData.diningPlan}
                    onChange={(e) => updateField('diningPlan', e.target.value)}
                    placeholder="e.g., Disney Dining Plan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Destination-Specific Fields */}
          {formData.tripType === 'destination' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Destination Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => updateField('destination', e.target.value)}
                    placeholder="e.g., Paris, France"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    value={formData.hotelName}
                    onChange={(e) => updateField('hotelName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <input
                    type="text"
                    value={formData.roomType}
                    onChange={(e) => updateField('roomType', e.target.value)}
                    placeholder="e.g., King Suite"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Address</label>
                  <textarea
                    value={formData.hotelAddress}
                    onChange={(e) => updateField('hotelAddress', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Number</label>
                  <input
                    type="text"
                    value={formData.confirmationNumber}
                    onChange={(e) => updateField('confirmationNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Custom Trip Fields */}
          {formData.tripType === 'custom' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Custom Trip Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trip Description</label>
                <textarea
                  value={formData.customDescription}
                  onChange={(e) => updateField('customDescription', e.target.value)}
                  rows={4}
                  placeholder="Describe this custom trip..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
