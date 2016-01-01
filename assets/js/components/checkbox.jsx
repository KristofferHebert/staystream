'use strict'

var Checkbox = React.createClass({
    render: function(){
        return (
            <input
                type="checkbox"
                name={this.props.name}
                checked={this.props.checked}
                className={this.props.className}
                onChange={this.props.onChange}
            />
        )
    }
})

export default Checkbox
