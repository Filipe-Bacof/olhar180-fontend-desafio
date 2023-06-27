import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from './privateRoutes'

// Pages imports
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { ForgotPassword } from '../pages/ForgotPassword'
import { NewPassword } from '../pages/NewPassword'
import { Dashboard } from '../pages/Dashboard'
import { ListTasks } from '../pages/Dashboard/pages/ListTasks'
import { Profile } from '../pages/Dashboard/pages/Profile'

// Context
import { Page404 } from '../pages/Page404'
import { AccessDenied } from '../pages/AccessDenied'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/newpass" element={<NewPassword />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="tasks" element={<ListTasks />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
