import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'

import 'aos/dist/aos.css';
import Aos from 'aos'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

Aos.init({
  duration: 800, // animation duration in ms
  once: true,    // whether animation should happen only once
})
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className=''>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </div>
    </QueryClientProvider>
  </StrictMode>,
)
