'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

interface SearchResult {
  type: 'client' | 'trip';
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export default function CRMSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const [clients, trips] = await Promise.all([
          (client.fetch as any)(
            `*[_type == "client" && (
              firstName match $query + "*" || 
              lastName match $query + "*" || 
              email match $query + "*"
            )][0...5] {
              _id,
              firstName,
              lastName,
              email
            }`,
            { query: query }
          ),
          (client.fetch as any)(
            `*[_type == "trip" && tripName match $query + "*"][0...5] {
              _id,
              tripName,
              tripType,
              "client": client->{firstName, lastName}
            }`,
            { query: query }
          ),
        ]);

        const searchResults: SearchResult[] = [
          ...clients.map((c: any) => ({
            type: 'client' as const,
            id: c._id,
            title: `${c.firstName} ${c.lastName}`,
            subtitle: c.email,
            href: `/crm/clients/${c._id}`,
          })),
          ...trips.map((t: any) => ({
            type: 'trip' as const,
            id: t._id,
            title: t.tripName,
            subtitle: `${t.client?.firstName} ${t.client?.lastName} • ${t.tripType}`,
            href: `/crm/trips/${t._id}`,
          })),
        ];

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search clients or trips..."
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-20">
            {results.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {loading ? 'Searching...' : 'No results found'}
              </div>
            ) : (
              <div>
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          result.type === 'client'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {result.type === 'client' ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {result.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
