import Input from './input.jsx'
import Checkbox from './checkbox.jsx'
import Form from './form.jsx'
import Submit from './submit.jsx'
import ResourceProvider from './resourceprovider.jsx'
import Auth from '../utils/auth.jsx'

var UserDashBoard = React.createClass({
    getInitialState: function() {
        return {
            user: {
                id: '',
                email: '',
                sendNotifications: true
            }
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
        user.sendNotifications = !this.user.state.sendNotifications

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
    makeRequest(data){

    },
    handleSubmit(event){
        event.preventDefault()
        console.log('submit happened')
    },
    render(){
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className={this.props.className}>
                    <div className="row mb">
                        <div className="half last">
                            <label for="name" className="mb db">Change Email</label>
                            <Input type="text" name="name" placeholder="Email" className="input input-email" value={this.state.user.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row mb">
                        <label for="sendNotifications">Send daily email reminders?
                            <Checkbox name="sendNotifications" checked={this.state.user.sendNotifications} onChange={this.handleCheckboxChange} className="fl" />
                        </label>
                    </div>
                <Submit value="Update Settings" className="input input-submit"/>
                </Form>
            </div>
        )
    }
})


export default UserDashBoard
