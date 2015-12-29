'use strict'

import Auth from '../utils/auth.jsx'
import { History } from 'react-router'

var LogoutPage = React.createClass({
    mixins: [History],
    componentWillUpdate(){
            Auth.logoutUser()
    },
    render: function(){
        return (
            <div>
                <h3>Log out</h3>
                <p>You have been logged out</p>
            </div>
        )
    }
})


module.exports = LogoutPage
