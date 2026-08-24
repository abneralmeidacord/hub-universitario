import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, vi } from 'vitest'
import { RegistrationForm } from './RegistrationForm'
import { api } from '../services/api'

describe('RegistrationForm', () => {
  afterEach(() => vi.restoreAllMocks())

  it('displays success feedback after registration', async () => {
    vi.spyOn(api, 'post').mockResolvedValue({
      data: { id: 10, activityId: 1, studentName: 'Maria Souza', studentEmail: 'maria@email.com' },
    })
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
    const user = userEvent.setup()

    render(
      <QueryClientProvider client={client}>
        <RegistrationForm
          activityId={1}
          remainingSpots={10}
          setRemainingSpots={vi.fn()}
          setRegisteredCount={vi.fn()}
          setStatus={vi.fn()}
        />
      </QueryClientProvider>,
    )

    await user.type(screen.getByLabelText('Nome'), 'Maria Souza')
    await user.type(screen.getByLabelText('E-mail'), 'maria@email.com')
    await user.click(screen.getByRole('button', { name: 'Confirmar inscrição' }))

    expect(await screen.findByRole('status')).toHaveTextContent('Inscrição realizada com sucesso!')
  })
})
