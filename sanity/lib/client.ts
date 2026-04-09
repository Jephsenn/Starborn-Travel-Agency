import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

// When projectId is not configured, return a client stub that yields empty results
// so the site falls back to local placeholder data gracefully.
let client: SanityClient

if (projectId) {
  client = createClient({ apiVersion, dataset, projectId, useCdn })
} else {
  client = { fetch: async () => [] } as unknown as SanityClient
}

export { client }
