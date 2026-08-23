import { useEffect, useState, type FormEvent } from 'react'
import axios from 'axios'
import { useCreateRegistration } from '../hooks/useActivities'
import type { ApiError } from '../types/activity'


interface RegistrationFormProps {
  activityId: number
  disabled?: boolean
  remainingSpots: number
  registeredCount: number
  maxSpots: number
  setRemainingSpots: Function
  setRegisteredCount: Function
  setStatus: Function
}


export function RegistrationForm({  
    maxSpots,
    setStatus ,
    registeredCount ,
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
        },
      },
    )
  }


  useEffect(() => {
    if (registration.isSuccess) {
      setRemainingSpots(remainingSpots - 1);
      setRegisteredCount(registeredCount + 1);

      if(registeredCount +1 >= maxSpots) {
        setStatus('FULL');
      }
    }
  }, [registration.isSuccess]);


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
              maxLength={159}
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
