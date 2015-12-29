import Auth from './auth.jsx'

function requireAuth() {
  if (!Auth.isLoggedIn())
    replaceState(null, 'login')
}

exports default requireAuth
