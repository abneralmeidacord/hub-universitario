import { Link } from 'react-router-dom'
import type { Activity } from '../types/activity'
import { categoryLabels, formatActivityDate, statusLabels } from '../utils/activity'
import { getActivityImage } from '../utils/activityImages'

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const occupancy = Math.min((activity.registeredCount / activity.capacity) * 100, 100)
  const bannerImage = getActivityImage(activity.title, activity.category)

  return (
    <article className="activity-card">
      <div className="activity-banner" style={{ backgroundImage: `url(${bannerImage})` }} role="img" aria-label={`Imagem da atividade ${activity.title}`} />
      <div className="card-topline">
        <span className={`badge category category-${activity.category.toLowerCase()}`}>
          {categoryLabels[activity.category]}
        </span>
        <span className={`badge status status-${activity.status.toLowerCase()}`}>
          {statusLabels[activity.status]}
        </span>
      </div>
      <div className="card-content">
        <p className="activity-date">{formatActivityDate(activity.date)}</p>
        <h2>{activity.title}</h2>
        <p className="description">{activity.description}</p>
        <dl className="card-meta">
          <div><dt>Responsável</dt><dd>{activity.organizer}</dd></div>
          <div><dt>Local</dt><dd>{activity.location}</dd></div>
        </dl>
      </div>
      <div className="capacity-block">
        <div className="capacity-label">
          <span>{activity.registeredCount} / {activity.capacity} inscritos</span>
          <strong>{activity.remainingSpots} vagas</strong>
        </div>
        <div className="progress" aria-label={`${occupancy}% das vagas ocupadas`}>
          <span style={{ width: `${occupancy}%` }} />
        </div>
      </div>
      <Link className="card-link" to={`/activities/${activity.id}`}>
        Ver detalhes <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
