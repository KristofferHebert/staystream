import Auth from '../utils/auth.jsx'

var LogoutPage = React.createClass({
    componentDidMount(){
            Auth.logoutUser()
    },
    render: function(){
        return (
            <div>
                <h3>Log out</h3>
                <p>You are now logged out</p>
            </div>
        )
    }
})


module.exports = LogoutPage
