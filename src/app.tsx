import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './router'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createRouter()} />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}
