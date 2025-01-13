import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_wrapper/_authenticated')({
  beforeLoad: async ({ context: { apis } }) => {
    console.log('Loading 2')
    const response = await apis.identity()
    if (!response.isLoggedIn) {
      throw redirect({ to: '/login' })
    }
  },
  pendingComponent: () => {
    return <div>Loading...</div>
  },
})
