import Input from './input.jsx'
import Checkbox from './checkbox.jsx'
import Form from './form.jsx'
import Submit from './submit.jsx'
import ResourceProvider from './resourceprovider.jsx'
import Auth from '../utils/auth.jsx'
import {Link} from 'react-router'

var UserDashBoard = React.createClass({
    getInitialState: function() {
        return {
            user: {
                id: '',
                email: '',
                sendNotifications: true
            },
            message: ""
        }
    },
    componentDidMount(){
        var userID = Auth.getId()
        this.getCurrentUser(userID)
    },
    handleChange(event){
        event.preventDefault()
        var newState = this.state.user
        newState[event.target.name] = event.target.value
        console.log(newState)
        this.setState(newState)
    },
    handleCheckboxChange(event){
        event.preventDefault()

        var user = this.state.user
        user.sendNotifications = !this.state.user.sendNotifications

        this.setState({
            user: user
        })
    },
    getStreams(userID){
        var token = Auth.getToken()
        var self = this
        var settings = {
            method: 'get',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer: ' + token
            }
        }

        if(token && userID){
            fetch('/api/v1/stream?owner=' + userID, settings)
            .then(function(response){
                if(response.status === 200){
                    return response.json()
                }
            })
            .then(function(streams){
                if(streams){
                    self.setState({streams: streams })
                } else {
                    console.log('Save failed', data)
                }
            })
        }
    },
    getCurrentUser(ID){
        var token = Auth.getToken()
        var self = this
        var settings = {
            method: 'get',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer: ' + token
            }
        }

        function handleSuccess(response){
            response.json().then(function(data){
                self.setState({
                    user: {
                        id: data.id,
                        email: data.email,
                        sendNotifications: data.sendNotifications
                    }
                })
            })
        }

        function handleFailure(error){
            console.log(error)
        }

        if(ID && token){
            fetch('/api/v1/user/' + ID, settings)
            .then(handleSuccess, handleFailure)
        }

    },
    handleClick: function(e) {
        var user = this.state.user
        user.sendNotifications = e.target.checked
        this.setState({ user: user })
    },
    makeRequest(data){
            console.log(data)
            delete data.id
            var token = Auth.getToken()
            var ID = Auth.getId()
            var self = this
            var settings = {
                method: 'POST',
                headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization' : 'Bearer: ' + token,
                },
               'body': JSON.stringify(data)
            }

            function handleSuccess(response){
                response.json().then(function(data){

                    self.setState({
                        user: {
                            email: data.email,
                            sendNotifications: data.sendNotifications
                        },
                        message: "Settings Updated"
                    })
                })
            }

            function handleFailure(error){
                console.log(error)
                self.setState({
                    message: "Something went wrong"
                })
            }

            if(ID && token){
                fetch('/api/v1/user/' + ID, settings)
                .then(handleSuccess, handleFailure)
            }

    },
    handleSubmit(event){
        event.preventDefault()
        console.log(this.state.user)
        this.makeRequest(this.state.user)
    },
    render(){

        var resetLink ='/reset/' + this.state.user.id

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className={this.props.className}>
                    <div className="row mb">
                        <div className="half last">
                            <label htmlFor="name" className="mb db">Change Email</label>
                            <Input type="email" name="email" placeholder="Email" className="input input-email" value={this.state.user.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row mb">
                        <Checkbox name="sendNotifications" isChecked={this.state.user.sendNotifications} onChange={this.handleClick} label="Send daily email reminders?" className="inline-block ml"/>
                    </div>
                <Submit value="Update Settings" className="input input-submit"/>
                <br />
                {this.state.message}
                </Form>
                <h3>Update User Password</h3>
                <Link to={resetLink}>Change Password</Link>

            </div>
        )
    }
})


export default UserDashBoard
