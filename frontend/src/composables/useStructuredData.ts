import { onMounted, onUnmounted } from 'vue'
import dataService from '@/services/dataService'
import type { General, Contact, Event } from '@/types/data'

export function useOrganizationSchema() {
  let script: HTMLScriptElement | null = null

  const addSchema = () => {
    const general = dataService.get('general', {}) as Partial<General>
    const contact = dataService.get('contact', {}) as Partial<Contact>

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: general?.fullName || general?.name || '',
      url: general?.url || '',
      logo: general?.image || '',
      description: general?.description || '',
      email: contact?.email || '',
      address: {
        '@type': 'PostalAddress',
        addressLocality: contact?.location?.city || '',
        addressCountry: contact?.location?.country || '',
      },
      sameAs: [contact?.discord?.url || ''],
    }

    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)
  }

  onMounted(() => {
    addSchema()
  })

  onUnmounted(() => {
    if (script) {
      document.head.removeChild(script)
    }
  })
}

export function useEventsSchema() {
  let script: HTMLScriptElement | null = null

  const addSchema = () => {
    const events = dataService.get('events.list', []) as Event[]
    const general = dataService.get('general', {}) as Partial<General>
    const contact = dataService.get('contact', {}) as Partial<Contact>

    const eventSchemas = events.map((event: Event) => {
      // Parse date format: DD/MM/YYYY HH:MM
      const [datePart = '', timePart = ''] = event?.date?.split(' ') || ['', '']
      const [day = '1', month = '1', year = '2025'] = datePart
        .split('/')
        .map((v: string) => v || '0')
      const [hours = '0', minutes = '0'] = timePart.split(':').map((v: string) => v || '0')
      const startDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
      )

      return {
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: event?.title || '',
        startDate: startDate.toISOString(),
        location: {
          '@type': 'Place',
          name: general?.name || '',
          address: {
            '@type': 'PostalAddress',
            addressLocality: contact?.location?.city || '',
            addressCountry: contact?.location?.country || '',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: general?.fullName || general?.name || '',
          url: general?.url || '',
        },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        description: `${event?.format || ''} - ${event?.title || ''}`,
        url: event?.registration || '',
      }
    })

    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(eventSchemas)
    document.head.appendChild(script)
  }

  onMounted(() => {
    addSchema()
  })

  onUnmounted(() => {
    if (script) {
      document.head.removeChild(script)
    }
  })
}

export function useCREventSchema() {
  let script: HTMLScriptElement | null = null

  const addSchema = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const crData = dataService.get('crAquitaine', {}) as any
    const general = dataService.get('general', {}) as Partial<General>

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: crData?.hero?.title || 'CR Aquitaine 2026',
      description: crData?.intro || '',
      startDate: '2026-02-07T09:00:00+01:00',
      endDate: '2026-02-08T18:00:00+01:00',
      location: {
        '@type': 'Place',
        name: crData?.details?.location?.name || '',
        address: {
          '@type': 'PostalAddress',
          streetAddress: crData?.details?.location?.address || '',
          addressLocality: crData?.details?.location?.city || '',
          postalCode: crData?.details?.location?.postalCode || '',
          addressCountry: 'FR',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: general?.fullName || general?.name || '',
        url: general?.url || '',
      },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      offers: {
        '@type': 'Offer',
        price: '30',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: crData?.registration || '',
      },
      sport: 'Trading Card Game',
      url: `${general?.url || ''}/cr`,
    }

    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)
  }

  onMounted(() => {
    addSchema()
  })

  onUnmounted(() => {
    if (script) {
      document.head.removeChild(script)
    }
  })
}
