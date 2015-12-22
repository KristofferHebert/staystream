'use strict'

var Input = require('./input.jsx')
var Form = require('./form.jsx')
var Submit = require('./submit.jsx')
var Auth = require('../utils/auth.jsx')

var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState(){
        return this.state = {
            user: {},
            message: ""
        }
    },
    handleSubmit(event){
        event.preventDefault()
        var self = this
        // get new user and modify for json
        var User = this.state.user

        var settings = {
            method: 'POST',
            body: JSON.stringify(User),
            mode: 'cors'
        }

        Auth.loginUser(User, function(err, response){
            if(err) throw err
            if(response.status == 401) {
                return self.setState({message: 'Please provide correct credentials'})
            }
            
            // Not sure how to improve this.
            self.context.router.transitionTo('/u')
            self.setState({message: ''})
        })
    },
    handleChange(event){
        let newState = this.state
        newState.user[event.target.name] = event.target.value
        this.setState(newState)
    },
    render(){
        return (
            <Form method={this.props.method} action={this.props.action} onSubmit={this.handleSubmit} className={this.props.className}>
                <Input type="text" name="email" placeholder="Email" className="input input-text" onChange={this.handleChange}/>
                <Input type="password" name="password" placeholder="Password" className="input input-password" onChange={this.handleChange}/>
                <Submit value="Login" className="input input-submit"/>
                {this.state.message}
            </Form>
        )
    }
})

module.exports = Login
