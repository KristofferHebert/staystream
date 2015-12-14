'use strict'

var Input = React.createClass({
    render: function(){
        return (
            <input
                type={this.props.type}
                name={this.props.name}
                placeholder={this.props.placeholder}
                className={this.props.className}
                onChange={this.props.handleChange}
            />
        )
    }
})

module.exports = Input
