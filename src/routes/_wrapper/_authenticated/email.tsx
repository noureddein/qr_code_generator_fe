import EmailForm from '@components/forms/EmailForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_wrapper/_authenticated/email')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EmailForm />
}
