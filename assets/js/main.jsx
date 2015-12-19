// import React from 'react'
// import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router'
import { createHistory, useBasename } from 'history'

var history = createHistory()

import requireAuth from './utils/auth.jsx'
import Auth from './utils/auth.jsx'
import HomePage from './pages/homepage.jsx'
import StreamHomepage from './pages/streamhomepage.jsx'

var UserHomepage = React.createClass({
    render: function(){
        return (
            <div>
                <h1><Link to="/u/">Staystream</Link></h1>
                <ul>
                  <li><Link to="/u/stream">Stream</Link></li>
                </ul>
                {(Auth.isLoggedIn() ? 'is logged in': 'is not logged in')}
                {this.props.children}
            </div>
        )
    }
})

var Stream = React.createClass({
    getInitialState(){
        return {
            id: 'undefined'
        }
    },
    componentDidMount() {
        const id = this.props.params.id
        this.setState({id: id})
    },
    render(){
        return (
            <div>
                <h2>Stream {this.state.id}</h2>
            </div>
        )
    }
})

var Idea = React.createClass({
    getInitialState(){
        return {
            id: 'undefined'
        }
    },
    componentDidMount() {
        const id = this.props.params.id
        this.setState({id: id})
    },
    render(){
        return (
            <div>
                <h2>Idea {this.state.id}</h2>
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

var routes = (
    <Route path="/" component={App}>
          <IndexRoute component={HomePage} />
          <Route path="u" component={UserHomepage}>
            <Route path="stream">
                    <IndexRoute component={StreamHomepage}/>
                    <Route path=":id" component={Stream}/>
            </Route>
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
                </ul>
                {this.props.children}
            </div>
        )
    }
})



ReactDOM.render(<Router routes={routes} />, document.getElementById('app'))
