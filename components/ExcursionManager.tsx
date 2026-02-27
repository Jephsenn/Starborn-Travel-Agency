'use client';

import { useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';

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
  meetingLocation?: string;
  cost?: number;
  numberOfParticipants?: number;
  status: string;
  confirmationNumber?: string;
  difficultyLevel?: string;
  wheelchairAccessible?: boolean;
  includesMeals?: boolean;
  whatToBring?: string[];
  notes?: string;
}

interface ExcursionManagerProps {
  tripId: string;
  excursions: Excursion[];
  onRefresh: () => void;
}

export default function ExcursionManager({ tripId, excursions, onRefresh }: ExcursionManagerProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedExcursions, setExpandedExcursions] = useState<Set<string>>(new Set());

  const toggleExpansion = (excursionId: string) => {
    setExpandedExcursions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(excursionId)) {
        newSet.delete(excursionId);
      } else {
        newSet.add(excursionId);
      }
      return newSet;
    });
  };

  const filteredExcursions = useMemo(() => {
    if (filterStatus === 'all') return excursions;
    return excursions.filter(exc => exc.status === filterStatus);
  }, [excursions, filterStatus]);

  const groupedByPort = useMemo(() => {
    const groups: Record<string, Excursion[]> = {};
    filteredExcursions.forEach(exc => {
      const key = `${exc.port}|${exc.date}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(exc);
    });
    return groups;
  }, [filteredExcursions]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available: 'bg-gray-100 text-gray-800',
      considering: 'bg-yellow-100 text-yellow-800',
      booked: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      not_selected: 'bg-gray-100 text-gray-500',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return 'text-gray-600';
    const colors: Record<string, string> = {
      easy: 'text-green-600',
      moderate: 'text-yellow-600',
      strenuous: 'text-red-600',
    };
    return colors[difficulty] || 'text-gray-600';
  };

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: excursions.length,
      available: 0,
      considering: 0,
      booked: 0,
      confirmed: 0,
      cancelled: 0,
      not_selected: 0,
    };
    excursions.forEach(exc => {
      if (counts[exc.status] !== undefined) {
        counts[exc.status]++;
      }
    });
    return counts;
  }, [excursions]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-neutral-800">Excursions</h2>
          <a
            href={`/studio/desk/excursion;template=excursion;trip=${tripId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            + Add Excursion
          </a>
        </div>
        <p className="text-gray-600">
          Manage shore excursions and port activities for this cruise.
        </p>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg transition ${
            filterStatus === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({statusCounts.all})
        </button>
        {[
          { value: 'available', label: 'Available' },
          { value: 'considering', label: 'Considering' },
          { value: 'booked', label: 'Booked' },
          { value: 'confirmed', label: 'Confirmed' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilterStatus(value)}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === value
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label} ({statusCounts[value]})
          </button>
        ))}
      </div>

      {/* Excursions List */}
      {filteredExcursions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No excursions</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filterStatus === 'all' 
              ? 'Get started by adding shore excursions for this cruise.'
              : 'No excursions found with this status.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedByPort).sort((a, b) => {
            const [, dateA] = a.split('|');
            const [, dateB] = b.split('|');
            return dateA.localeCompare(dateB);
          }).map(portKey => {
            const [port, date] = portKey.split('|');
            const portExcursions = groupedByPort[portKey];

            return (
              <div key={portKey}>
                <div className="sticky top-0 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg px-4 py-3 mb-4 z-10 shadow-sm">
                  <h3 className="text-lg font-bold text-neutral-800">⚓ {port}</h3>
                  <p className="text-sm text-gray-700">
                    {format(parseISO(date), 'EEEE, MMMM d, yyyy')} • {portExcursions.length} excursion{portExcursions.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="space-y-3 ml-4">
                  {portExcursions.map(excursion => {
                    const isExpanded = expandedExcursions.has(excursion._id);
                    
                    return (
                      <div
                        key={excursion._id}
                        className="border-l-4 border-teal-500 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                      >
                        <button
                          onClick={() => toggleExpansion(excursion._id)}
                          className="w-full text-left p-4 hover:bg-gray-50 transition"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">🚢</span>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-800">{excursion.excursionName}</h4>
                                  {excursion.excursionCode && (
                                    <p className="text-sm text-gray-500 font-mono mt-1">{excursion.excursionCode}</p>
                                  )}
                                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
                                    {excursion.duration && <span>⏱️ {excursion.duration}</span>}
                                    {excursion.departureTime && <span>🕐 Departs {excursion.departureTime}</span>}
                                    {excursion.cost && (
                                      <span className="font-medium text-gray-800">
                                        💰 ${excursion.cost.toLocaleString()}
                                        {excursion.numberOfParticipants && excursion.numberOfParticipants > 1 && 
                                          ` × ${excursion.numberOfParticipants}`
                                        }
                                      </span>
                                    )}
                                  </div>
                                  {excursion.difficultyLevel && (
                                    <div className="mt-2">
                                      <span className={`text-xs font-medium ${getDifficultyColor(excursion.difficultyLevel)}`}>
                                        {excursion.difficultyLevel.toUpperCase()} DIFFICULTY
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(excursion.status)}`}>
                                {excursion.status.replace('_', ' ')}
                              </span>
                              <svg
                                className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
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
                          <div className="px-4 pb-4 pt-2 border-t bg-gray-50 space-y-3">
                            {excursion.description && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Description</p>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">{excursion.description}</p>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                              {excursion.departureTime && (
                                <div>
                                  <p className="text-sm font-semibold text-gray-700">Departure Time</p>
                                  <p className="text-sm text-gray-600">{excursion.departureTime}</p>
                                </div>
                              )}
                              {excursion.returnTime && (
                                <div>
                                  <p className="text-sm font-semibold text-gray-700">Return Time</p>
                                  <p className="text-sm text-gray-600">{excursion.returnTime}</p>
                                </div>
                              )}
                              {excursion.meetingLocation && (
                                <div className="col-span-2">
                                  <p className="text-sm font-semibold text-gray-700">Meeting Location</p>
                                  <p className="text-sm text-gray-600">📍 {excursion.meetingLocation}</p>
                                </div>
                              )}
                            </div>

                            {excursion.confirmationNumber && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Confirmation Number</p>
                                <p className="text-sm text-gray-600 font-mono">{excursion.confirmationNumber}</p>
                              </div>
                            )}

                            {(excursion.wheelchairAccessible || excursion.includesMeals) && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1">Features</p>
                                <div className="flex flex-wrap gap-2">
                                  {excursion.wheelchairAccessible && (
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                      ♿ Wheelchair Accessible
                                    </span>
                                  )}
                                  {excursion.includesMeals && (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                      🍽️ Meals Included
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {excursion.whatToBring && excursion.whatToBring.length > 0 && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">What to Bring</p>
                                <ul className="text-sm text-gray-600 list-disc list-inside">
                                  {excursion.whatToBring.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {excursion.notes && (
                              <div>
                                <p className="text-sm font-semibold text-gray-700">Notes</p>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">{excursion.notes}</p>
                              </div>
                            )}

                            <div className="pt-2 border-t flex gap-2">
                              <a
                                href={`/studio/structure/excursion;${excursion._id}`}
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
