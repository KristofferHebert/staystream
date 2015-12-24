import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'

var History = createHistory()

import requireAuth from './utils/auth.jsx'
import Auth from './utils/auth.jsx'
import HomePage from './pages/homepage.jsx'
import StreamHomepage from './pages/streamhomepage.jsx'
import StreamPage from './pages/stream.jsx'
import LoginPage from './pages/login.jsx'
import LogoutPage from './pages/logout.jsx'
import UserHomepage from './pages/userhomepage.jsx'
import SearchPage from './pages/search.jsx'
import IdeaPage from './pages/idea.jsx'

var Wrapper = React.createClass({
    render: function(){
        return (
            <div>
                <header>
                <nav className="wrapper">
                    <h1><Link to="/u/">Staystream</Link></h1>
                    <ul>
                      <li><Link to="/u/stream">Your Streams</Link></li>
                      <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </nav>
                </header>
                <main className="wrapper">
                    {this.props.children}
                </main>
                <footer>
                    <section className="wrapper">
                        2015 Staystream.com
                    </section>
                </footer>
            </div>
        )
    }
})   

var NotFoundPage = React.createClass({
    render: function(){
        return (
            <div>
                <h2>Not Found</h2>
            </div>
        )
    }
})

// Todo fix history={history}
// Todo onEnter={requireAuth}

var Routes = (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="u" component={Wrapper}>
          <IndexRoute component={UserHomepage}/>
        <Route path="stream">
                <IndexRoute component={StreamHomepage}/>
                <Route path=":id" component={StreamPage}/>
        </Route>
        <Route path="idea">
                <Route path=":id" component={IdeaPage}/>
        </Route>
        <Route path="search/:q" component={SearchPage} />
      </Route>
      <Route path="logout" component={LogoutPage}></Route>
      <Route path="login" component={LoginPage}></Route>
      <Route path="*" component={NotFoundPage} />
    </Route>
)

var App = React.createClass({
    getInitialState: function(){
        return {
            isLoggedIn: Auth.isLoggedIn()
        }
    },
    render: function(){
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/u">About</Link></li>
                    <li><Link to="/logout">Log Out</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})

ReactDOM.render(<Router routes={Routes} />, document.getElementById('app'))
