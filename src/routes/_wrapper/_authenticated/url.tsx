import FormContainer from '@components/FormContainer'
import URLForm from '@components/forms/URLForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_wrapper/_authenticated/url')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <FormContainer>
      <URLForm />
    </FormContainer>
  )
}
