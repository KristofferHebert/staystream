'use strict'

// Fetch dependencies
import { Link } from 'react-router'
import Signup from '../components/signup.jsx'
import Login from '../components/login.jsx'

var HomePage = React.createClass({
    handleClick(event){
        event.preventDefault()
        console.log(this.context, this.props.router)
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
