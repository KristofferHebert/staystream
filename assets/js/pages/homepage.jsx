// Fetch dependencies
var Signup = require('../components/signup.jsx')
var Login = require('../components/login.jsx')
var Auth = require('../utils/auth.jsx')

var HomePage = React.createClass({
    render: function(){
        return (
            <div>
                <h2>Addictive Idea journal</h2>
                <p>Organize your ideas</p>
                <h3>Signup</h3>
                <Signup />
            </div>
        )
    }
})


module.exports = HomePage
