import type { Event } from '@/types/data'

const FRENCH_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

const FRENCH_MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

export const getFrenchDayName = (date: Date) => FRENCH_DAYS[date.getDay()]

export const getFrenchMonthName = (monthIndex: number) => FRENCH_MONTHS[monthIndex]

export const parseEventDate = (event: Event) => {
  const [year = '2026', month = '01', day = '01'] = event.date.split('-')
  const [hours = '0', minutes = '0'] = (event.start_time || '00:00:00').split(':')
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
  )
}

export const formatEventDate = (event: Event) => {
  const date = parseEventDate(event)
  const dayName = getFrenchDayName(date)
  const day = date.getDate()
  const monthName = getFrenchMonthName(date.getMonth())
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${dayName} ${day} ${monthName} ${year} - ${hours}:${minutes}`
}

export const formatEventDateShort = (event: Event) => {
  const date = parseEventDate(event)
  const day = date.getDate()
  const monthName = getFrenchMonthName(date.getMonth())
  const year = date.getFullYear()

  return `${day} ${monthName} ${year}`
}
