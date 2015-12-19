'use strict'

var Form = React.createClass({
    getDefaultProps: function() {
        return {
          method: 'POST',
          action: '#'
        }
    },
    render: function(){
        return (
            <form method={this.props.method} action={this.props.action} onSubmit={this.props.onSubmit} className={this.props.className}>
                {this.props.children}
            </form>
        )
    }
})

module.exports = Form
