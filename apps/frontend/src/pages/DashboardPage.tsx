import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useActivities } from '../hooks/useActivities'
import { categoryLabels, formatActivityDate, statusLabels } from '../utils/activity'
import type { ActivityCategory, ActivityStatus } from '../types/activity'

function donutPath(startAngle: number, endAngle: number, radius = 44) {
  const start = (startAngle - 90) * Math.PI / 180
  const end = (endAngle - 90) * Math.PI / 180
  const startPoint = `${50 + radius * Math.cos(start)} ${50 + radius * Math.sin(start)}`
  const endPoint = `${50 + radius * Math.cos(end)} ${50 + radius * Math.sin(end)}`
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M 50 50 L ${startPoint} A ${radius} ${radius} 0 ${largeArc} 1 ${endPoint} Z`
}

function donutOffset(startAngle: number, endAngle: number, distance = 2.5) {
  const middle = (startAngle + endAngle) / 2
  const angle = (middle - 90) * Math.PI / 180
  return `translate(${Math.cos(angle) * distance} ${Math.sin(angle) * distance})`
}

export function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | null>(null)
  const activitiesQuery = useActivities('')
  const activities = activitiesQuery.data ?? []
  const totalCapacity = activities.reduce((sum, activity) => sum + activity.capacity, 0)
  const registeredCount = activities.reduce((sum, activity) => sum + activity.registeredCount, 0)
  const occupiedPercentage = totalCapacity ? Math.round((registeredCount / totalCapacity) * 100) : 0
  const statusTotals = {
    OPEN: activities.filter((activity) => activity.status === 'OPEN').length,
    FULL: activities.filter((activity) => activity.status === 'FULL').length,
    CLOSED: activities.filter((activity) => activity.status === 'CLOSED').length,
  }
  const filteredActivities = activities.filter((activity) => (
    (!selectedCategory || activity.category === selectedCategory) &&
    (!selectedStatus || activity.status === selectedStatus)
  ))
  const selectedCategoryActivities = selectedCategory
    ? activities.filter((activity) => activity.category === selectedCategory)
    : []
  const upcomingActivities = [...filteredActivities]
    .sort((first, second) => new Date(first.date).getTime() - new Date(second.date).getTime())
    .slice(0, 4)
  const categorySegments = Object.entries(categoryLabels).map(([category, label]) => ({
    category: category as ActivityCategory,
    label,
    total: activities.filter((activity) => activity.category === category).length,
  })).filter((segment) => segment.total > 0)
  const statusSegments = (['OPEN', 'FULL', 'CLOSED'] as const).map((status) => ({
    status,
    total: statusTotals[status],
  })).filter((segment) => segment.total > 0)

  return (
    <main className="page-shell dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">Visão geral</p>
            <h1>Dashboard</h1>
            <p>Acompanhe as atividades, inscrições e a participação da comunidade acadêmica.</p>
          </div>
        </div>
      </section>

      {activitiesQuery.isLoading && <div className="state-card">Carregando indicadores...</div>}
      {activitiesQuery.isError && <div className="state-card error-state">Não foi possível carregar os indicadores.</div>}
      {activitiesQuery.isSuccess && (
        <>
          <section className="dashboard-metrics" aria-label="Indicadores gerais">
            <article className="metric-card metric-blue"><Icon name="calendar" /><span>Atividades cadastradas</span><strong>{activities.length}</strong></article>
            <article className="metric-card metric-cyan"><Icon name="briefcase" /><span>Vagas disponíveis</span><strong>{totalCapacity}</strong></article>
            <article className="metric-card metric-blue"><Icon name="users" /><span>Inscrições realizadas</span><strong>{registeredCount}</strong></article>
            <article className="metric-card metric-deep"><Icon name="check" /><span>Ocupação geral</span><strong>{occupiedPercentage}%</strong></article>
          </section>

          <section className="dashboard-activity-layout" aria-label="Análises e agenda">
            <div className="dashboard-chart-stack">
            <section className="dashboard-charts" aria-label="Gráficos de atividades">
            <div className="dashboard-panel chart-panel">
              <div className="panel-heading"><div><p className="eyebrow">Análise</p><h2>Atividades por categoria</h2></div></div>
              <div className="category-donut-area">
                <div className="category-donut" role="img" aria-label="Distribuição de atividades por categoria">
                  <svg viewBox="0 0 100 100">
                    {categorySegments.map((segment, index) => {
                      const start = categorySegments.slice(0, index).reduce((sum, item) => sum + item.total, 0) / activities.length * 360
                      const end = start + segment.total / activities.length * 360
                      const isSelected = selectedCategory === segment.category
                      return <path className={`donut-segment donut-${segment.category.toLowerCase()}${isSelected ? ' chart-selected' : ''}`} d={donutPath(start, end)} transform={isSelected ? donutOffset(start, end) : undefined} key={segment.category} role="button" tabIndex={0} aria-label={`${segment.label}: ${segment.total} atividade(s)`} aria-pressed={isSelected} onClick={() => setSelectedCategory(isSelected ? null : segment.category)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedCategory(isSelected ? null : segment.category) }} />
                    })}
                    <circle cx="50" cy="50" r="27" fill="white" />
                  </svg>
                  <strong>{selectedCategory ? activities.filter((activity) => activity.category === selectedCategory).length : activities.length}</strong>
                  <small>{selectedCategory ? 'selecionadas' : 'total'}</small>
                </div>
                {selectedCategory ? (
                  <div className="category-activity-list" aria-label={`Atividades de ${categoryLabels[selectedCategory]}`}>
                    <div className="category-list-heading">
                      <strong className="category-list-title">{categoryLabels[selectedCategory]}</strong>
                      <button className="chart-reset-button" type="button" onClick={() => setSelectedCategory(null)}>
                        <Icon name="arrow-left" />
                        Voltar ao gráfico original
                      </button>
                    </div>
                    {selectedCategoryActivities.map((activity) => <Link className="category-activity-item" to={`/activities/${activity.id}`} key={activity.id}><span>{activity.title}</span><small>{activity.registeredCount} inscritos</small></Link>)}
                  </div>
                ) : (
                  <div className="chart-legend category-legend">
                    {categorySegments.map((segment) => <button className={`chart-legend-item${selectedCategory === segment.category ? ' chart-selected' : ''}`} key={segment.category} type="button" aria-pressed={selectedCategory === segment.category} onClick={() => setSelectedCategory(selectedCategory === segment.category ? null : segment.category)}><span className={`legend-dot donut-${segment.category.toLowerCase()}`} /><span>{segment.label}</span><strong>{segment.total}</strong></button>)}
                  </div>
                )}
              </div>
              <p className="chart-selection">{selectedCategory ? `${categoryLabels[selectedCategory]} selecionada. A agenda ao lado foi filtrada.` : 'Clique em uma fatia para filtrar por categoria.'}</p>
            </div>

            <div className="dashboard-panel chart-panel status-chart-panel">
              <div className="panel-heading"><div><p className="eyebrow">Panorama</p><h2>Status das atividades</h2></div>{selectedStatus && <button className="chart-reset-button" type="button" onClick={() => setSelectedStatus(null)}><Icon name="arrow-left" />Voltar ao gráfico original</button>}</div>
              <div className="status-chart-content">
                <div className="donut-chart" role="img" aria-label="Distribuição das atividades por status">
                  <svg viewBox="0 0 100 100">
                    {statusSegments.map((segment, index) => {
                      const start = statusSegments.slice(0, index).reduce((sum, item) => sum + item.total, 0) / activities.length * 360
                      const end = start + segment.total / activities.length * 360
                      const isSelected = selectedStatus === segment.status
                      return <path className={`status-segment status-segment-${segment.status.toLowerCase()}${isSelected ? ' chart-selected' : ''}`} d={donutPath(start, end)} transform={isSelected ? donutOffset(start, end) : undefined} key={segment.status} role="button" tabIndex={0} aria-label={`${statusLabels[segment.status]}: ${segment.total} atividade(s)`} aria-pressed={isSelected} onClick={() => setSelectedStatus(isSelected ? null : segment.status)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedStatus(isSelected ? null : segment.status) }} />
                    })}
                    <circle cx="50" cy="50" r="32" fill="white" />
                  </svg>
                  <strong>{selectedStatus ? statusTotals[selectedStatus] : activities.length}</strong><small>{selectedStatus ? 'selecionadas' : 'total'}</small>
                </div>
                <div className="chart-legend">
                  {statusSegments.map((segment) => <button className={`chart-legend-item${selectedStatus === segment.status ? ' chart-selected' : ''}`} key={segment.status} type="button" aria-pressed={selectedStatus === segment.status} onClick={() => setSelectedStatus(selectedStatus === segment.status ? null : segment.status)}><span className={`legend-dot legend-${segment.status.toLowerCase()}`} /><span>{statusLabels[segment.status]}</span><strong>{segment.total}</strong></button>)}
                </div>
              </div>
              <p className="chart-selection">{selectedStatus ? `${statusLabels[selectedStatus]} selecionada. A agenda ao lado foi filtrada.` : 'Clique em uma fatia ou legenda para filtrar a agenda.'}</p>
            </div>
            </section>
            </div>
            <aside className="dashboard-sidebar">
            <div className="dashboard-panel">
              <div className="panel-heading"><div><p className="eyebrow">Agenda</p><h2>Próximas atividades</h2></div><Link to="/activities">Ver todas</Link></div>
              <div className="upcoming-list">
                {upcomingActivities.map((activity) => (
                  <Link className="upcoming-item" to={`/activities/${activity.id}`} key={activity.id}>
                    <span className={`activity-dot dot-${activity.category.toLowerCase()}`}><Icon name="calendar" /></span>
                    <span className="upcoming-copy"><strong>{activity.title}</strong><small>{formatActivityDate(activity.date)} · {activity.location}</small></span>
                    <span className={`badge status status-${activity.status.toLowerCase()}`}>{statusLabels[activity.status]}</span>
                  </Link>
                ))}
              </div>
            </div>
            </aside>
          </section>

          <section className="dashboard-occupancy-section" aria-label="Capacidade">
            <div className="dashboard-panel occupancy-panel"><div className="panel-heading"><div><p className="eyebrow">Capacidade</p><h2>Ocupação por atividade</h2></div></div><div className="occupancy-list">{activities.map((activity) => { const percentage = Math.min(100, Math.round(activity.registeredCount / activity.capacity * 100)); const tone = percentage >= 90 ? 'occupancy-danger' : percentage >= 65 ? 'occupancy-warning' : 'occupancy-good'; return <Link className="occupancy-item" to={`/activities/${activity.id}`} key={activity.id}><span><strong>{activity.title}</strong><small>{activity.registeredCount} de {activity.capacity} inscritos</small></span><span className="occupancy-track"><span className={tone} style={{ width: `${percentage}%` }} /></span><b>{percentage}%</b></Link> })}</div></div>
          </section>
        </>
      )}
    </main>
  )
}
