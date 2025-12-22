// Data types for the application

export interface Hero {
  title: string
  subtitle: string
}

export interface Feature {
  title: string
  description: string
}

export interface Format {
  name: string
  description: string
}

export interface Event {
  id: string
  title: string
  date: string
  format: string
  registration: string
}

export interface UnityLeague {
  title: string
  icon: string
  logo: string
  highlight: string
  description: string
  links: {
    leagueUrl: string
    infoUrl: string
    mainUrl: string
  }
  buttons: {
    viewRanking: string
    howToRegister: string
  }
}

export interface CTA {
  title: string
  description: string
}

export interface Location {
  name: string
  fullAddress: string
  address?: string
  postalCode?: string
  city?: string
}

export interface CRDetails {
  format: string
  dates: string
  price: string
  location: Location
}

export interface OpenQualifierDetails {
  format: string
  date: string
  price: string
  location: Location
}

export interface SideEvent {
  title: string
  description: string
}

export interface Sponsor {
  name: string
  description: string
  logo?: string
  url?: string
}

export interface Prize {
  position: string
  amount: string
}

export interface PrizePool {
  playerCount: number
  prizes: Prize[]
}

export interface History {
  title: string
  paragraphs: string[]
}

export interface Mission {
  title: string
  intro: string
}

export interface Formats {
  title: string
  intro: string
}

export interface InfoItem {
  title: string
  description: string
}

export interface Info {
  title: string
  items: {
    membership: InfoItem
    level: InfoItem
    atmosphere: InfoItem
  }
}

export interface General {
  name: string
  fullName: string
  description: string
  url: string
  image: string
  keywords: string
}

export interface Contact {
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
}
