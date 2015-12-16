'use strict'

var Input = require('./input.jsx')
var Form = require('./form.jsx')
var Submit = require('./submit.jsx')


var Signup = React.createClass({
    render: function(){
        return (
            <Form method={this.props.method} action={this.props.action} onSubmit={this.props.onSubmit} className={this.props.className}>
                <Input type="text" name="username" placeholder="Username" className="input input-text" />
                <Input type="password" name="password" placeholder="Password" className="input input-password" />
                <Input type="password" name="repeatPassword" placeholder="Repeat Password" className="input input-password" />
                <Submit value="Submit" className="input input-submit"/>
            </Form>
        )
    }
})

module.exports = Signup
