import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import '../index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './components/context/NotificationContext'
import { UserProvider } from './components/context/UserContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <NotificationProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <App />
                </Router>
            </QueryClientProvider>
        </NotificationProvider>
    </UserProvider>

)