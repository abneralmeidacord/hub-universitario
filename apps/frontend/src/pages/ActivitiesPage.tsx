import { useState, type FormEvent } from 'react'
import { ActivityCard } from '../components/ActivityCard'
import { ActivityFilters, type CategoryFilter } from '../components/ActivityFilters'
import { useActivities } from '../hooks/useActivities'
import { filterActivities, filterActivitiesBySearch } from '../utils/activity'

export function ActivitiesPage() {
  const [category, setCategory] = useState<CategoryFilter>('ALL')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const activitiesQuery = useActivities(search)

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearch(searchInput.trim())
  }

  const filteredActivities = filterActivitiesBySearch(filterActivities(activitiesQuery.data ?? [], category), search)

  return (
    <main>
      <section className="hero">
        <div className="page-shell hero-content">
          <p className="eyebrow">Descubra. Participe. Transforme.</p>
          <h1>Viva tudo o que a universidade oferece.</h1>
          <p>Encontre oficinas, cursos, projetos e eventos para ampliar sua experiência acadêmica.</p>
          <form className="search-form" onSubmit={handleSearch} role="search">
            <label className="sr-only" htmlFor="activity-search">Buscar atividades</label>
            <input
              id="activity-search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Buscar atividades..."
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </section>

      <section className="page-shell activities-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Agenda acadêmica</p>
            <h2>Próximas atividades</h2>
          </div>
          {!activitiesQuery.isLoading && <span>{filteredActivities.length} oportunidades</span>}
        </div>
        <ActivityFilters selected={category} onChange={setCategory} />

        {activitiesQuery.isLoading && <div className="state-card">Carregando atividades...</div>}
        {activitiesQuery.isError && (
          <div className="state-card error-state">
            <h3>Não foi possível carregar as atividades</h3>
            <p>Verifique se a API está em execução e tente novamente.</p>
            <button type="button" onClick={() => activitiesQuery.refetch()}>Tentar novamente</button>
          </div>
        )}
        {activitiesQuery.isSuccess && filteredActivities.length === 0 && (
          <div className="state-card">Nenhuma atividade encontrada para os filtros selecionados.</div>
        )}
        <div className="activity-grid">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
    </main>
  )
}
