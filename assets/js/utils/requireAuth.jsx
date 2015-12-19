import Auth from './auth.jsx'

function requireAuth(nextState, replaceState) {
  if (!Auth.isLoggedIn())
    replaceState(null, 'login')
}

exports default requireAuth
