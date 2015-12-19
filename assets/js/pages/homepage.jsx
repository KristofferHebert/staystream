// Fetch dependencies

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link

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
