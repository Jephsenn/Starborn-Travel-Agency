'use client';

import { useState } from 'react';
import { client } from '@/sanity/lib/client';

interface EventFormModalProps {
  tripId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingEvent?: any;
}

export default function EventFormModal({ tripId, isOpen, onClose, onSuccess, existingEvent }: EventFormModalProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: existingEvent?.title || '',
    eventType: existingEvent?.eventType || 'activity',
    date: existingEvent?.date || '',
    startTime: existingEvent?.startTime || '',
    endTime: existingEvent?.endTime || '',
    allDay: existingEvent?.allDay || false,
    location: existingEvent?.location || '',
    description: existingEvent?.description || '',
    confirmationNumber: existingEvent?.confirmationNumber || '',
    cost: existingEvent?.cost || '',
    isPaid: existingEvent?.isPaid || false,
    isBooked: existingEvent?.isBooked || false,
    notes: existingEvent?.notes || '',
  });

  const eventTypes = [
    { value: 'flight', label: 'Flight' },
    { value: 'hotel', label: 'Hotel Check-in/out' },
    { value: 'dining', label: 'Dining Reservation' },
    { value: 'activity', label: 'Activity' },
    { value: 'excursion', label: 'Shore Excursion' },
    { value: 'port_day', label: 'Port Day' },
    { value: 'sea_day', label: 'Sea Day' },
    { value: 'park_visit', label: 'Theme Park Visit' },
    { value: 'show', label: 'Show/Entertainment' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'tour', label: 'Guided Tour' },
    { value: 'meeting', label: 'Meeting/Appointment' },
    { value: 'other', label: 'Other' },
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const eventData: any = {
        _type: 'itineraryEvent',
        trip: { _type: 'reference', _ref: tripId },
        title: formData.title,
        eventType: formData.eventType,
        date: formData.date,
        allDay: formData.allDay,
        location: formData.location || undefined,
        description: formData.description || undefined,
        confirmationNumber: formData.confirmationNumber || undefined,
        cost: formData.cost ? parseFloat(formData.cost) : undefined,
        isPaid: formData.isPaid,
        isBooked: formData.isBooked,
        notes: formData.notes || undefined,
      };

      if (!formData.allDay) {
        eventData.startTime = formData.startTime || undefined;
        eventData.endTime = formData.endTime || undefined;
      }

      if (existingEvent) {
        await client.patch(existingEvent._id).set(eventData).commit();
      } else {
        await client.create(eventData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800">
              {existingEvent ? 'Edit Event' : 'Add New Event'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Flight to Miami"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) => updateField('eventType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allDay}
                      onChange={(e) => updateField('allDay', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">All Day Event</span>
                  </label>
                </div>
              </div>

              {!formData.allDay && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => updateField('startTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => updateField('endTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="e.g., Miami International Airport"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => updateField('cost', e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBooked}
                    onChange={(e) => updateField('isBooked', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Booked</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPaid}
                    onChange={(e) => updateField('isPaid', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Paid</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : existingEvent ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
