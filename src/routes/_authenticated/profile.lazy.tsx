import Container from '@components/Container'
import usePrivateServer from '@hooks/usePrivateServer'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const privateServer = usePrivateServer()
  const { data } = useQuery({
    queryFn: async ({ signal }) => {
      const URL = '/api/user/profile'
      const result = await privateServer.get(URL, { signal })

      return result.data
    },
    queryKey: ['profile'],
  })
  console.log({ profile: data })
  return <Container>{JSON.stringify(data?.user)}</Container>
}
