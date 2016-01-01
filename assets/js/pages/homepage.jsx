'use strict'

// Fetch dependencies
import { Link, History } from 'react-router'
import Signup from '../components/signup.jsx'
import Login from '../components/login.jsx'
import Auth from '../utils/auth.jsx'


var HomePage = React.createClass({
    mixins: [History],
    componentDidMount(){
        if(Auth.isLoggedIn()){
            this.history.pushState(null, '/u')
        }
    },
    render(){
        return (
            <div>
                <h2>Addictive Idea journal</h2>
                <p>Organize your ideas</p>
                <h3>Signup</h3>
                <Signup />
                <h3>Login</h3>
                <Link to={'/login'}>Click here to login</Link>
            </div>
        )
    }
})


module.exports = HomePage
