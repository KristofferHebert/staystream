import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { createHashHistory, useBasename } from 'history'

var History = createHashHistory()

import requireAuth from './utils/auth.jsx'
import Auth from './utils/auth.jsx'
import Wrapper from './components/wrapper.jsx'
import NotFoundPage from './pages/notFound.jsx'
import HomePage from './pages/homepage.jsx'
import StreamHomepage from './pages/streamhomepage.jsx'
import StreamPage from './pages/stream.jsx'
import LoginPage from './pages/login.jsx'
import LogoutPage from './pages/logout.jsx'
import UserHomepage from './pages/userhomepage.jsx'
import SearchPage from './pages/search.jsx'
import IdeaPage from './pages/idea.jsx'
import SettingsPage from './pages/settings.jsx'


// Todo fix history={history}
// Todo onEnter={requireAuth}

var Routes = (
    <Route path="/" component={Wrapper}>
      <IndexRoute component={HomePage} />
      <Route path="u">
          <IndexRoute component={UserHomepage}/>
        <Route path="stream">
                <IndexRoute component={StreamHomepage}/>
                <Route path=":id" component={StreamPage}/>
        </Route>
        <Route path="idea">
                <Route path=":id" component={IdeaPage}/>
        </Route>
        <Route path="search/:q" component={SearchPage} />
        <Route path="settings" component={SettingsPage} />

      </Route>
      <Route path="logout" component={LogoutPage}></Route>
      <Route path="login" component={LoginPage}></Route>
      <Route path="*" component={NotFoundPage} />
    </Route>
)

ReactDOM.render(<Router routes={Routes} history={History}/>, document.getElementById('app'))
