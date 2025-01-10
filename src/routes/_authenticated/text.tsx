import { createFileRoute } from '@tanstack/react-router'
import Container from '@components/Container'
import TextForm from '@components/forms/TextForm'

export const Route = createFileRoute('/_authenticated/text')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container>
      <TextForm />
    </Container>
  )
}
