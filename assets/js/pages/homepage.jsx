
//
var Signup = require('../components/signup.jsx')
var Login = require('../components/login.jsx')
var getCurrentUser = require('../util/currentUser.jsx')

//
var currentUser = new getCurrentUser()

var HomePage = React.createClass({
    getDefaultProps: function() {
        return {
          signup: true,
        }
    },
    render: function(){
        return (
            <div>
                <h3>Addictive Idea journal</h3>
                <p>Organize your ideas</p>
                <Signup />
                <Login />
            </div>
        )
    }
})


module.exports = HomePage
