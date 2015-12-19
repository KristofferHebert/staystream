// Fetch dependencies
import Signup from '../components/signup.jsx'
import Login from '../components/login.jsx'

var HomePage = React.createClass({
    render: function(){
        return (
            <div>
                <h2>Addictive Idea journal</h2>
                <p>Organize your ideas</p>
                <h3>Signup</h3>
                <Signup />
                <h3>Login</h3>
                <Login />
            </div>
        )
    }
})


module.exports = HomePage
