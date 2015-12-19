'use strict'

var Input = React.createClass({
    render: function(){
        return (
            <input
                type={this.props.type}
                name={this.props.name}
                value={this.props.value}
                placeholder={this.props.placeholder}
                className={this.props.className}
                onChange={this.props.onChange}
                minLength={this.props.minLength}
            />
        )
    }
})

module.exports = Input
