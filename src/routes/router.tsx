import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from './privateRoutes'

// Pages imports
import { LoginPage } from '../pages/LoginPage'
import { Dashboard } from '../pages/Dashboard'
import { ListTasks } from '../pages/Dashboard/pages/ListUsers'

// Context
import { Page404 } from '../pages/Page404'
import { AccessDenied } from '../pages/AccessDenied'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="tasks" element={<ListTasks />} />
          </Route>
        </Route>
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
