'use strict'

var Form = React.createClass({
    getDefaultProps: function() {
        return {
          method: 'POST',
          action: '#'
        }
    },
    handleChange(event){
        let newState = this.state
        newState.user[event.target.name] = event.target.value
        this.setState(newState)
        console.log(this.state)
    },
    getInitialState: function(){
        return this.state = {
            user: {}
        }
    },
    render: function(){
        return (
            <form method={this.props.method} action={this.props.action} onSubmit={this.props.handleSubmit} className={this.props.className}>
                {this.props.children}
            </form>
        )
    }
})

module.exports = Form
