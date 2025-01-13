import TextForm from '@components/forms/TextForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_wrapper/_authenticated/text')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TextForm />
}
