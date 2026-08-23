import type { Activity, ActivityCategory, ActivityStatus } from '../types/activity'
import type { CategoryFilter } from '../components/ActivityFilters'

export const categoryLabels: Record<ActivityCategory, string> = {
  WORKSHOP: 'Workshop',
  LECTURE: 'Palestra',
  COURSE: 'Curso',
  EXTENSION_PROJECT: 'Projeto de extensão',
  EVENT: 'Evento',
}

export const statusLabels: Record<ActivityStatus, string> = {
  OPEN: 'Aberta',
  FULL: 'Lotada',
  CLOSED: 'Encerrada',
}

export function formatActivityDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function filterActivities(activities: Activity[], category: CategoryFilter) {
  if (category === 'ALL') return activities
  return activities.filter(
    (activity) => activity.category === category,
  )
}

export function filterActivitiesBySearch(activities: Activity[], search: string) {
  if (!search) return activities
  const formattedSearch = search.toLowerCase().trim()
  return activities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(formattedSearch) ||
      activity.description.toLowerCase().includes(formattedSearch),
  )
}