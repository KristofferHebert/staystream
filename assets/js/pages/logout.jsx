'use strict'

import Auth from '../utils/auth.jsx'
import { History } from 'react-router'

var LogoutPage = React.createClass({
    mixins: [History],
    componentDidMount(){
            Auth.logoutUser()
            this.history.pushState(null, '/')
    },
    render(){
        return (
            <div>
                <h3>Log out</h3>
                <p>You have been logged out</p>
            </div>
        )
    }
})


export default LogoutPage
