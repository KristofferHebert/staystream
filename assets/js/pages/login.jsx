
var Login = require('../components/login.jsx')
var Auth = require('../utils/auth.jsx')

//
var currentUser = new getCurrentUser()

var HomePage = React.createClass({
    getDefaultProps: function() {
        render: function(){
        return (
            <div>
                <h3>Login</h3>
                <Login />
            </div>
        )
    }
})


module.exports = HomePage
