'use strict'

var Input = require('./input.jsx')
var Form = require('./form.jsx')
var Submit = require('./submit.jsx')


var endpoint = '/api/v1/user'

var Signup = React.createClass({
    setInitialState: function(){
        return {
            user: ''
        }
    },
    handleSubmit: function(event){
        event.preventDefault()
        console.log(this.state)

    },
    handleChange: function(event){
        let newState = this.state
        newState.user[event.target.name] = event.target.value
        this.setState(newState)
    },
    getInitialState: function(){
        return this.state = {
            user: {}
        }
    },
    render: function(){
        return (
            <Form onSubmit={this.handleSubmit} className={this.props.className}>
                <Input type="text" name="email" placeholder="Email" className="input input-text" onChange={this.handlechange} />
                <Input type="password" name="password" placeholder="Password" className="input input-password" onChange={this.handleChange} minLength="5" required="true"/>
                <Submit value="Sign up" className="input input-submit"/>
            </Form>
        )
    }
})

module.exports = Signup
