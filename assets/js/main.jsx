// import React from 'react'
// import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'

var history = createHistory()

var Auth = require('./utils/auth.jsx')
var HomePage = require('./pages/homepage.jsx')

var UserHomepage = React.createClass({
    render: function(){
        return (
            <div>
                <h2>User Homepage</h2>
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

var routes = (
    <Route path="/" component={App}>
          <IndexRoute component={HomePage} />
          <Route path="u" component={UserHomepage}>
          </Route>
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
                  <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})



ReactDOM.render(<Router>{routes}</Router>, document.getElementById('app'))
