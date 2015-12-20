// Fetch dependencies
import Signup from '../components/signup.jsx'
import Login from '../components/login.jsx'
import {Link} from 'react-router'
var HomePage = React.createClass({
    render: function(){
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
