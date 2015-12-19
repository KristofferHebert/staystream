'use strict'

var Input = require('./input.jsx')
var Form = require('./form.jsx')
var Submit = require('./submit.jsx')
var Auth = require('../utils/auth.jsx')

var endpoint = '/api/v1/user'

var Signup = React.createClass({
    setInitialState: function(){
        return {
            user: ''
        }
    },
    handleSubmit: function(event){
        event.preventDefault()

        // get new user and modify for json
        var newUser = this.state.user

        var settings = {
            method: 'POST',
            body: JSON.stringify(newUser),
            mode: 'cors'
        }

        console.log(newUser);
        // post user object to create new user
        fetch(endpoint, settings)
        .then(function(response){
            if(response.ok){
                Auth.loginUser(newUser, function(err, response){
                    if(err) throw err
                    console.log(response.statusText)
                })
            }

        }).catch(function(err){
            console.log(err)
            throw err
        })
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
                <Input type="email" name="email" placeholder="Email" className="input input-email" onChange={this.handleChange} />
                <Input type="password" name="password" placeholder="Password" className="input input-password" onChange={this.handleChange} minLength="5" required="true"/>
                <Submit value="Sign up" className="input input-submit"/>
            </Form>
        )
    }
})

module.exports = Signup
