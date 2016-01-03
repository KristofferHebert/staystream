import Input from './input.jsx'
import Checkbox from './checkbox.jsx'
import Form from './form.jsx'
import Submit from './submit.jsx'
import ResourceProvider from './resourceprovider.jsx'
import Auth from '../utils/auth.jsx'

var UserReset = React.createClass({
    getInitialState: function() {
        return {
            user: {
                id: "",
                newPassword: ""
            },
            userNotFound: false,
            message: ""
        }
    },
    componentDidMount() {
        var user = this.state.user
        user.id = this.getUserId()
        this.setState({user: user})
        this.getCurrentUser(this.state.user.id)
    },
    getUserId(){
        return window.location.hash.split('/')[2].split('?')[0]
    },
    handleChange(event){
        event.preventDefault()
        var newState = this.state.user
        newState[event.target.name] = event.target.value
        console.log(newState)
        this.setState(newState)
    },
    getCurrentUser(ID){
        var self = this
        var settings = {
            method: 'get',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            }
        }

        function handleSuccess(response){
            if(response.status === 404) {
                self.setState({message: 'User not found', userNotFound: true})
                return
            }

            response.json().then(function(data){
                return console.log('user found', data.email)
            })
        }

        function handleFailure(error){
            console.log(error)
        }

        if(ID){
            fetch('/api/v1/user/' + ID, settings)
            .then(handleSuccess, handleFailure)
        }

    },
    makeRequest(user){
            var ID = user.id
            user.password = user.newPassword
            delete user.newPassword
            var self = this
            var settings = {
                method: 'POST',
                headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
               'body': JSON.stringify(user)
            }

            function handleSuccess(response){
                response.json().then(function(data){
                    console.log('user',data)
                    self.setState({
                        message: "Password Updated"
                    })
                })
            }

            function handleFailure(error){
                self.setState({
                    message: "Something went wrong"
                })
            }

            if(ID && token){
                fetch('/api/v1/user/resetPassword', settings)
                .then(handleSuccess, handleFailure)
            }

    },
    handleSubmit(event){
        event.preventDefault()
        this.makeRequest(this.state.user)
    },
    render(){
        console.log(this.history)

        return (
            <div>
                <div className={this.state.userNotFound ? 'hidden' : ''}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row mb">
                            <div className="half last">
                                <label htmlFor="name" className="mb db">Change Password</label>
                                <Input type="text" name="newPassword" placeholder="New Password" className="input input-email" value={this.state.user.email} onChange={this.handleChange} />
                            </div>
                        </div>
                    <Submit value="Update Password" className="input input-submit"/>
                    </Form>
                </div>
                <br />
                {this.state.message}
            </div>
        )
    }
})


export default UserReset
