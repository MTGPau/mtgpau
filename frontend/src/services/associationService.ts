import associationData from '@/data/association.json'

export interface Contact {
  email: string
  discord: string
  location: {
    city: string
    country: string
    fullAddress: string
  }
}

export interface Social {
  discord: {
    url: string
    label: string
  }
}

export interface Schedule {
  responseTime: string
  availability: string
}

export interface Format {
  name: string
  description: string
}

export interface Event {
  id: string
  title: string
  frequency: string
  schedule: string
  description: string
  format: string
  level: string
  registration: string
  special?: boolean
  highlight?: boolean
}

export interface Feature {
  title: string
  description: string
}

export interface Info {
  membership: string
  level: string
  atmosphere: string
}

export interface Legal {
  copyright: string
  trademark: string
}

export interface AssociationData {
  name: string
  fullName: string
  description: string
  tagline: string
  contact: Contact
  social: Social
  schedule: Schedule
  mission: string[]
  formats: Format[]
  events: Event[]
  benefits: string[]
  features: Feature[]
  info: Info
  legal: Legal
}

class AssociationService {
  private data: AssociationData

  constructor() {
    this.data = associationData as AssociationData
  }

  // General info
  getName(): string {
    return this.data.name
  }

  getFullName(): string {
    return this.data.fullName
  }

  getDescription(): string {
    return this.data.description
  }

  getTagline(): string {
    return this.data.tagline
  }

  // Contact
  getContact(): Contact {
    return this.data.contact
  }

  getEmail(): string {
    return this.data.contact.email
  }

  getDiscordUrl(): string {
    return this.data.contact.discord
  }

  getLocation(): string {
    return this.data.contact.location.fullAddress
  }

  getCity(): string {
    return this.data.contact.location.city
  }

  // Social
  getSocial(): Social {
    return this.data.social
  }

  // Schedule
  getSchedule(): Schedule {
    return this.data.schedule
  }

  getAvailability(): string {
    return this.data.schedule.availability
  }

  // Mission
  getMission(): string[] {
    return this.data.mission
  }

  // Formats
  getFormats(): Format[] {
    return this.data.formats
  }

  // Events
  getEvents(): Event[] {
    return this.data.events
  }

  getEventById(id: string): Event | undefined {
    return this.data.events.find((event) => event.id === id)
  }

  getHighlightedEvents(): Event[] {
    return this.data.events.filter((event) => event.highlight)
  }

  getSpecialEvents(): Event[] {
    return this.data.events.filter((event) => event.special)
  }

  // Benefits
  getBenefits(): string[] {
    return this.data.benefits
  }

  // Features
  getFeatures(): Feature[] {
    return this.data.features
  }

  // Info
  getInfo(): Info {
    return this.data.info
  }

  // Legal
  getLegal(): Legal {
    return this.data.legal
  }

  getCopyright(): string {
    return this.data.legal.copyright
  }

  getTrademark(): string {
    return this.data.legal.trademark
  }

  // Utility methods
  getMailtoLink(subject?: string): string {
    const email = this.getEmail()
    return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`
  }

  getCurrentYear(): number {
    return new Date().getFullYear()
  }
}

// Export singleton instance
export const associationService = new AssociationService()

// Export default for convenience
export default associationService
