import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'

// eslint-disable-next-line @typescript-eslint/require-await
export const load = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })
  return { queryClient }
}