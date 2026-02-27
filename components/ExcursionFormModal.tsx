'use client';

import { useState } from 'react';
import { client } from '@/sanity/lib/client';

interface ExcursionFormModalProps {
  tripId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingExcursion?: any;
}

export default function ExcursionFormModal({ tripId, isOpen, onClose, onSuccess, existingExcursion }: ExcursionFormModalProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    port: existingExcursion?.port || '',
    date: existingExcursion?.date || '',
    excursionName: existingExcursion?.excursionName || '',
    excursionCode: existingExcursion?.excursionCode || '',
    description: existingExcursion?.description || '',
    duration: existingExcursion?.duration || '',
    departureTime: existingExcursion?.departureTime || '',
    returnTime: existingExcursion?.returnTime || '',
    cost: existingExcursion?.cost || '',
    numberOfParticipants: existingExcursion?.numberOfParticipants || '1',
    status: existingExcursion?.status || 'available',
    confirmationNumber: existingExcursion?.confirmationNumber || '',
    difficulty: existingExcursion?.difficulty || 'easy',
    isWheelchairAccessible: existingExcursion?.isWheelchairAccessible || false,
    minAge: existingExcursion?.minAge || '',
    notes: existingExcursion?.notes || '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const excursionData: any = {
        _type: 'excursion',
        trip: { _type: 'reference', _ref: tripId },
        port: formData.port,
        date: formData.date,
        excursionName: formData.excursionName,
        excursionCode: formData.excursionCode || undefined,
        description: formData.description || undefined,
        duration: formData.duration || undefined,
        departureTime: formData.departureTime || undefined,
        returnTime: formData.returnTime || undefined,
        cost: formData.cost ? parseFloat(formData.cost) : undefined,
        numberOfParticipants: formData.numberOfParticipants ? parseInt(formData.numberOfParticipants) : undefined,
        status: formData.status,
        confirmationNumber: formData.confirmationNumber || undefined,
        difficulty: formData.difficulty,
        isWheelchairAccessible: formData.isWheelchairAccessible,
        minAge: formData.minAge ? parseInt(formData.minAge) : undefined,
        notes: formData.notes || undefined,
      };

      if (existingExcursion) {
        await client.patch(existingExcursion._id).set(excursionData).commit();
      } else {
        await client.create(excursionData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving excursion:', error);
      alert('Failed to save excursion. Please try again.');
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
              {existingExcursion ? 'Edit Excursion' : 'Add New Excursion'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Port <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.port}
                    onChange={(e) => updateField('port', e.target.value)}
                    placeholder="e.g., Cozumel, Mexico"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excursion Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.excursionName}
                  onChange={(e) => updateField('excursionName', e.target.value)}
                  placeholder="e.g., Mayan Ruins Adventure"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excursion Code</label>
                  <input
                    type="text"
                    value={formData.excursionCode}
                    onChange={(e) => updateField('excursionCode', e.target.value)}
                    placeholder="e.g., CZM-201"
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
                    <option value="available">Available</option>
                    <option value="considering">Considering</option>
                    <option value="booked">Booked</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="not_selected">Not Selected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  placeholder="Describe the excursion..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    placeholder="e.g., 4 hours"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                  <input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => updateField('departureTime', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Time</label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => updateField('returnTime', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost (per person)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => updateField('cost', e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Participants</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numberOfParticipants}
                    onChange={(e) => updateField('numberOfParticipants', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => updateField('difficulty', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                    <option value="strenuous">Strenuous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Age</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minAge}
                    onChange={(e) => updateField('minAge', e.target.value)}
                    placeholder="e.g., 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isWheelchairAccessible}
                    onChange={(e) => updateField('isWheelchairAccessible', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Wheelchair Accessible</span>
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
                {saving ? 'Saving...' : existingExcursion ? 'Update Excursion' : 'Add Excursion'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
