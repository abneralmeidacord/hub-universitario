import { Link, useParams } from 'react-router-dom'
import { RegistrationForm } from '../components/RegistrationForm'
import { useActivity, useRegistrations } from '../hooks/useActivities'
import { categoryLabels, formatActivityDate, statusLabels } from '../utils/activity'
import { getActivityImage } from '../utils/activityImages'
import {useState, useEffect} from 'react'


export function ActivityDetailsPage() {
  const { id } = useParams()
  const activityId = Number(id)
  const activityQuery = useActivity(activityId)
  const registrationsQuery = useRegistrations(activityId)


  const [remainingSpots, setRemainingSpots] = useState(0)
  const [registeredCount, setRegisteredCount] = useState(0)
  const [status, setStatus] = useState<'OPEN' | 'FULL' | 'CLOSED'>('OPEN')


  useEffect(() => {
    if(activityQuery.data){
      setRemainingSpots(activityQuery.data.remainingSpots ?? 0);
      setRegisteredCount(activityQuery.data.registeredCount ?? 0);
      setStatus(activityQuery.data.status ?? 'OPEN');
    }
  }, [activityQuery.data]);


  if (activityQuery.isLoading) {
    return <main className="page-shell detail-page"><div className="state-card">Carregando atividade...</div></main>
  }


  if (activityQuery.isError || !activityQuery.data) {
    return (
      <main className="page-shell detail-page">
        <div className="state-card error-state">
          <h1>Atividade não encontrada</h1>
          <p>Não foi possível carregar os detalhes solicitados.</p>
          <Link to="/activities">Voltar para atividades</Link>
        </div>
      </main>
    )
  }


  const activity = activityQuery.data
  const occupancy = Math.min((registeredCount / activity.capacity) * 100, 100)


  return (
    <main className="page-shell detail-page">
      <Link className="back-link" to="/activities">← Voltar para atividades</Link>
      <article className="detail-card">
        <div className="detail-banner" style={{ backgroundImage: `url(${getActivityImage(activity.title, activity.category)})` }} role="img" aria-label={`Imagem da atividade ${activity.title}`} />
        <div className="detail-main">
          <div className="card-topline">
            <span className={`badge category category-${activity.category.toLowerCase()}`}>
              {categoryLabels[activity.category]}
            </span>
            <span className={`badge status status-${status.toLowerCase()}`}>
              {statusLabels[status]}
            </span>
          </div>
          <h1>{activity.title}</h1>
          <p className="detail-description">{activity.description}</p>
          <dl className="detail-meta">
            <div><dt>Data e horário</dt><dd>{formatActivityDate(activity.date)}</dd></div>
            <div><dt>Local</dt><dd>{activity.location}</dd></div>
            <div><dt>Responsável</dt><dd>{activity.organizer}</dd></div>
            <div><dt>Inscrições carregadas</dt><dd>{registrationsQuery.data?.length ?? '...'}</dd></div>
          </dl>
        </div>
        <aside className="detail-capacity">
          <span>Disponibilidade</span>
          <strong>{remainingSpots}</strong>
          <p>vagas restantes</p>
          <div className="progress" aria-label={`${occupancy}% das vagas ocupadas`}>
            <span style={{ width: `${occupancy}%` }} />
          </div>
          <small>{registeredCount} de {activity.capacity} inscritos</small>
        </aside>
      </article>
      <RegistrationForm
            setStatus={setStatus}
            remainingSpots={remainingSpots}
            setRemainingSpots={setRemainingSpots}
            setRegisteredCount={setRegisteredCount}
            activityId={activity.id}
            disabled={status !== 'OPEN'}
      />
    </main>
  )
}
