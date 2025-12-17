import generalData from '@/data/general.json'
import contactData from '@/data/contact.json'
import homeData from '@/data/home.json'
import aboutData from '@/data/about.json'
import eventsData from '@/data/events.json'

// General types
export interface General {
  name: string
  fullName: string
  description: string
  tagline: string
  legal: {
    copyright: string
    trademark: string
  }
}

// Contact types
export interface ContactData {
  email: string
  discord: {
    url: string
    label: string
  }
  location: {
    city: string
    country: string
    fullAddress: string
  }
  availability: {
    responseTime: string
    message: string
  }
  benefits: string[]
}

// Home types
export interface HomeData {
  hero: {
    title: string
    subtitle: string
  }
  features: Array<{
    title: string
    description: string
  }>
  cta: {
    title: string
    description: string
  }
}

// About types
export interface AboutData {
  hero: {
    title: string
    subtitle: string
  }
  history: {
    title: string
    paragraphs: string[]
  }
  mission: {
    title: string
    intro: string
    items: string[]
  }
  formats: {
    title: string
    intro: string
    items: Array<{
      name: string
      description: string
    }>
  }
  info: {
    title: string
    items: {
      membership: { title: string; description: string }
      level: { title: string; description: string }
      atmosphere: { title: string; description: string }
    }
  }
  joinCta: {
    title: string
    description: string
  }
}

// Events types
export interface Event {
  id: string
  title: string
  frequency: string
  schedule: string
  description: string
  format: string
  level: string
  registration: string
  badge: string
  badgeType: 'regular' | 'special' | 'highlight'
}

export interface EventsData {
  hero: {
    title: string
    subtitle: string
  }
  intro: string
  events: Event[]
  cta: {
    title: string
    description: string
  }
}

class AssociationService {
  private general: General
  private contact: ContactData
  private home: HomeData
  private about: AboutData
  private events: EventsData

  constructor() {
    this.general = generalData as General
    this.contact = contactData as ContactData
    this.home = homeData as HomeData
    this.about = aboutData as AboutData
    this.events = eventsData as EventsData
  }

  // ========== GENERAL ==========
  getName(): string {
    return this.general.name
  }

  getFullName(): string {
    return this.general.fullName
  }

  getDescription(): string {
    return this.general.description
  }

  getTagline(): string {
    return this.general.tagline
  }

  getCopyright(): string {
    return this.general.legal.copyright
  }

  getTrademark(): string {
    return this.general.legal.trademark
  }

  getCurrentYear(): number {
    return new Date().getFullYear()
  }

  // ========== CONTACT ==========
  getEmail(): string {
    return this.contact.email
  }

  getDiscordUrl(): string {
    return this.contact.discord.url
  }

  getDiscordLabel(): string {
    return this.contact.discord.label
  }

  getLocation(): string {
    return this.contact.location.fullAddress
  }

  getCity(): string {
    return this.contact.location.city
  }

  getCountry(): string {
    return this.contact.location.country
  }

  getAvailability(): string {
    return this.contact.availability.message
  }

  getResponseTime(): string {
    return this.contact.availability.responseTime
  }

  getBenefits(): string[] {
    return this.contact.benefits
  }

  getMailtoLink(subject?: string): string {
    const email = this.getEmail()
    return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`
  }

  getContactData(): ContactData {
    return this.contact
  }

  // ========== HOME ==========
  getHomeHero() {
    return this.home.hero
  }

  getFeatures() {
    return this.home.features
  }

  getHomeCta() {
    return this.home.cta
  }

  getHomeData(): HomeData {
    return this.home
  }

  // ========== ABOUT ==========
  getAboutHero() {
    return this.about.hero
  }

  getHistory() {
    return this.about.history
  }

  getMission() {
    return this.about.mission
  }

  getFormats() {
    return this.about.formats
  }

  getAboutInfo() {
    return this.about.info
  }

  getJoinCta() {
    return this.about.joinCta
  }

  getAboutData(): AboutData {
    return this.about
  }

  // ========== EVENTS ==========
  getEventsHero() {
    return this.events.hero
  }

  getEventsIntro(): string {
    return this.events.intro
  }

  getEvents(): Event[] {
    return this.events.events
  }

  getEventById(id: string): Event | undefined {
    return this.events.events.find((event) => event.id === id)
  }

  getEventsByBadgeType(type: 'regular' | 'special' | 'highlight'): Event[] {
    return this.events.events.filter((event) => event.badgeType === type)
  }

  getHighlightedEvents(): Event[] {
    return this.getEventsByBadgeType('highlight')
  }

  getSpecialEvents(): Event[] {
    return this.getEventsByBadgeType('special')
  }

  getEventsCta() {
    return this.events.cta
  }

  getEventsData(): EventsData {
    return this.events
  }
}

// Export singleton instance
export const associationService = new AssociationService()

// Export default for convenience
export default associationService
