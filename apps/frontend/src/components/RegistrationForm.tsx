import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import axios from 'axios'
import { useCreateRegistration } from '../hooks/useActivities'
import type { ApiError } from '../types/activity'


interface RegistrationFormProps {
  activityId: number
  disabled?: boolean
  remainingSpots: number
  setRemainingSpots: Dispatch<SetStateAction<number>>
  setRegisteredCount: Dispatch<SetStateAction<number>>
  setStatus: Dispatch<SetStateAction<'OPEN' | 'FULL' | 'CLOSED'>>
}


export function RegistrationForm({  
    setStatus ,
    remainingSpots ,
    setRemainingSpots ,
    setRegisteredCount ,
    activityId,
    disabled = false }: RegistrationFormProps) {
 
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const registration = useCreateRegistration(activityId)


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    registration.mutate(
      { studentName, studentEmail },
      {
        onSuccess: () => {
          setStudentName('')
          setStudentEmail('')
          setRemainingSpots((current) => Math.max(0, current - 1))
          setRegisteredCount((current) => current + 1)
          if (remainingSpots <= 1) {
            setStatus('FULL')
          }
        },
      },
    )
  }


  const apiError = axios.isAxiosError<ApiError>(registration.error)
    ? registration.error.response?.data.message
    : undefined


  return (
    <section className="registration-panel" aria-labelledby="registration-title">
      <div>
        <p className="eyebrow">Participe</p>
        <h2 id="registration-title">Inscreva-se nesta atividade</h2>
      </div>
      {disabled ? (
        <p className="notice warning">As inscrições para esta atividade não estão disponíveis.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              name="studentName"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              minLength={3}
              maxLength={100}
              required
              placeholder="Seu nome completo"
            />
          </label>
          <label>
            E-mail
            <input
              name="studentEmail"
              value={studentEmail}
              onChange={(event) => setStudentEmail(event.target.value)}
              type="email"
              maxLength={160}
              required
              placeholder="voce@email.com"
            />
          </label>
          <button className="primary-button" type="submit" disabled={registration.isPending}>
            {registration.isPending ? 'Enviando...' : 'Confirmar inscrição'}
          </button>
        </form>
      )}
      {registration.isSuccess && (
        <p className="notice success" role="status">Inscrição realizada com sucesso!</p>  
      )}
      {registration.isError && (
        <p className="notice error" role="alert">{apiError ?? 'Não foi possível realizar a inscrição.'}</p>
      )}
    </section>
  )
}
