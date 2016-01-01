var Login = require('../components/login.jsx')

var LoginPage = React.createClass({
    render: function(){
        return (
            <div className="tc">
                <h2>Login</h2>
                <Login />
            </div>
        )
    }
})


export default LoginPage
