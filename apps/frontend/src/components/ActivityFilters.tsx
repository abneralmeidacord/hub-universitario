import type { ActivityCategory } from '../types/activity'
import { categoryLabels } from '../utils/activity'
import { Icon } from './Icon'

export type CategoryFilter = ActivityCategory | 'ALL'

interface ActivityFiltersProps {
  selected: CategoryFilter
  onChange: (category: CategoryFilter) => void
}

const categories: CategoryFilter[] = [
  'ALL',
  'WORKSHOP',
  'LECTURE',
  'COURSE',
  'EXTENSION_PROJECT',
  'EVENT',
]

const categoryIcons = {
  ALL: 'check',
  WORKSHOP: 'code',
  LECTURE: 'speaker',
  COURSE: 'palette',
  EXTENSION_PROJECT: 'users',
  EVENT: 'calendar',
} as const

export function ActivityFilters({ selected, onChange }: ActivityFiltersProps) {
  return (
    <div className="filter-group" role="group" aria-label="Filtrar por categoria">
      {categories.map((category) => (
        <button
          className={selected === category ? 'filter-active' : ''}
          key={category}
          type="button"
          onClick={() => onChange(category)}
        >
          <Icon name={categoryIcons[category]} />
          {category === 'ALL' ? 'Todas' : categoryLabels[category]}
        </button>
      ))}
    </div>
  )
}
